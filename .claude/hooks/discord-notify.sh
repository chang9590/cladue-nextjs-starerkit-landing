#!/usr/bin/env bash
# Claude Code Stop 이벤트 → Discord 웹훅 알림 스크립트

set -euo pipefail

# 웹훅 URL 검증 — 미설정 시 조용히 종료
WEBHOOK_URL="${DISCORD_WEBHOOK_URL:-}"
if [[ -z "$WEBHOOK_URL" ]]; then
  exit 0
fi

# stdin을 임시 파일에 저장 (bash 변수 경유 시 인코딩 손상 방지)
TMPDIR_USED=$(mktemp -d)
INPUT_FILE="$TMPDIR_USED/input.json"
PAYLOAD_FILE="$TMPDIR_USED/payload.json"
cat > "$INPUT_FILE"

# Python으로 파싱 + Discord payload 생성 (UTF-8 명시)
python -c "
import sys, json
from datetime import datetime, timezone

# 입력 파일을 UTF-8로 읽기
with open(sys.argv[1], encoding='utf-8', errors='replace') as f:
    raw = f.read()

try:
    data = json.loads(raw)
except Exception:
    sys.exit(0)

# 무한루프 방지 — stop_hook_active가 true이면 즉시 종료
stop_hook_active = data.get('stop_hook_active', False)
if str(stop_hook_active).lower() == 'true':
    sys.exit(0)

session_id = str(data.get('session_id', ''))[:8]
cwd = data.get('cwd') or '알 수 없음'
last_msg = data.get('last_assistant_message') or ''
preview = last_msg[:300] + ('...' if len(last_msg) > 300 else '')
timestamp = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

payload = {
    'embeds': [{
        'title': '✅ Claude Code 작업 완료',
        'color': 5763719,
        'description': preview if preview else '(메시지 없음)',
        'fields': [
            {'name': '📁 작업 디렉토리', 'value': cwd, 'inline': False},
            {'name': '🔖 세션 ID', 'value': session_id + '...', 'inline': True}
        ],
        'footer': {'text': 'Claude Code Hook'},
        'timestamp': timestamp
    }]
}

# payload 파일을 UTF-8로 저장
with open(sys.argv[2], 'w', encoding='utf-8') as f:
    json.dump(payload, f, ensure_ascii=False)
" "$INPUT_FILE" "$PAYLOAD_FILE" 2>/dev/null || true

# payload 파일이 존재하면 curl로 전송
if [[ -s "$PAYLOAD_FILE" ]]; then
  curl \
    --silent \
    --output /dev/null \
    --max-time 10 \
    -X POST \
    -H "Content-Type: application/json; charset=utf-8" \
    --data-binary "@$PAYLOAD_FILE" \
    "$WEBHOOK_URL" || true
fi

rm -rf "$TMPDIR_USED"
exit 0
