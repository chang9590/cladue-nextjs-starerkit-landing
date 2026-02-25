'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { docsRegistry } from '@/lib/docs-registry'

// 카테고리별로 컴포넌트 분류
const sections = docsRegistry.filter((c) => c.category === 'sections')
const floating = docsRegistry.filter((c) => c.category === 'floating')

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 py-6 px-3">
      {/* Sections 카테고리 */}
      <div className="mb-4">
        <p className="px-3 mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Sections
        </p>
        <nav className="flex flex-col gap-0.5">
          {sections.map((comp) => {
            const isActive = pathname === `/docs/${comp.slug}`
            return (
              <Link
                key={comp.slug}
                href={`/docs/${comp.slug}`}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {comp.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <Separator className="my-3" />

      {/* Floating 카테고리 */}
      <div>
        <p className="px-3 mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Floating
        </p>
        <nav className="flex flex-col gap-0.5">
          {floating.map((comp) => {
            const isActive = pathname === `/docs/${comp.slug}`
            return (
              <Link
                key={comp.slug}
                href={`/docs/${comp.slug}`}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {comp.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
