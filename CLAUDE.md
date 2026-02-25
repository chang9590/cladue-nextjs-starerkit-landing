# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행

# shadcn 컴포넌트 추가
npx shadcn@latest add <component-name>
```

## 프로젝트 개요

랜딩페이지 섹션 컴포넌트 모음과, 해당 컴포넌트들을 탐색·복사할 수 있는 문서 사이트.

## 아키텍처

### 라우팅
- `/` → `/docs` 리다이렉트
- `/docs` → `/docs/hero` 리다이렉트
- `/docs/[slug]` → 각 컴포넌트 문서 페이지

### 핵심 파일
- `lib/docs-registry.tsx` — **모든 컴포넌트의 메타데이터 + 미리보기 JSX + 사용 예시 코드를 한 곳에서 관리**하는 레지스트리. 새 컴포넌트를 추가하면 이 파일에 `DocComponent` 항목을 추가해야 함.
- `components/docs/ComponentDocPage.tsx` — variant 탭, 미리보기/코드 토글, 코드 복사 버튼 (`use client`)
- `components/docs/DocsSidebar.tsx` — 사이드바 탐색, `usePathname()`으로 활성 링크 하이라이트 (`use client`)

### 컴포넌트 구조
```
components/
  sections/   # 페이지 인라인 섹션 컴포넌트
    HeroSection.tsx         # variant: centered | split | background
    CardSection.tsx         # variant: grid3 | grid2 | list
    ProcessSection.tsx      # variant: horizontal | vertical | cards
    StatsSection.tsx        # variant: row | grid
    ReviewSection.tsx       # variant: cards | featured
    FAQSection.tsx          # 아코디언 (Radix accordion 사용)
    ContactFormSection.tsx  # 인라인 상담 폼
  floating/   # 화면 고정 플로팅 컴포넌트
    FloatingButtons.tsx     # 전화·카카오·상담 버튼
    FloatingContactForm.tsx # 슬라이드업 상담 폼
  ui/         # shadcn/ui 컴포넌트 (자동 생성, 직접 수정 지양)
  docs/       # 문서 사이트 전용 컴포넌트
```

### 서버 vs 클라이언트 컴포넌트
- `components/sections/*`, `components/floating/*` — 서버 컴포넌트 (상태 없음)
- `components/docs/*` — 클라이언트 컴포넌트 (`'use client'`)
- `app/docs/layout.tsx`, `app/docs/[slug]/page.tsx` — 서버 컴포넌트
- Next.js 16의 `params`는 `Promise<{ slug: string }>` 타입 (async로 await 필요)

### 새 섹션 컴포넌트 추가 흐름
1. `components/sections/NewSection.tsx` 작성 (variant prop 패턴 준수)
2. `lib/docs-registry.tsx`에 `DocComponent` 항목 추가 (slug, preview JSX, code 문자열)
3. 사이드바와 라우팅은 레지스트리에서 자동으로 생성됨

## 스택
- Next.js 16.1.6 (App Router, Turbopack)
- React 19.2.3
- TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"` 방식)
- shadcn/ui (style: new-york, color: neutral, `radix-ui` 패키지)
- CSS 변수: oklch 색상 공간
