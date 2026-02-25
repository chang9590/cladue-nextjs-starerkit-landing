import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { DocsSidebar } from '@/components/docs/DocsSidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="h-14 border-b flex items-center px-6 shrink-0">
        <Link href="/docs" className="font-bold text-lg hover:opacity-80 transition-opacity">
          랜딩 섹션 스타터킷
        </Link>
        <span className="ml-3 text-sm text-muted-foreground">컴포넌트 문서</span>
      </header>

      {/* 본문: 사이드바 + 콘텐츠 */}
      <div className="flex flex-1">
        {/* 좌측 사이드바 */}
        <div className="border-r">
          <DocsSidebar />
        </div>

        <Separator orientation="vertical" />

        {/* 우측 콘텐츠 영역 */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
