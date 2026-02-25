import { redirect } from 'next/navigation'

// /docs 접속 시 첫 번째 컴포넌트 문서로 리다이렉트
export default function DocsPage() {
  redirect('/docs/hero')
}
