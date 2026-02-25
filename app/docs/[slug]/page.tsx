import { notFound } from 'next/navigation'
import { docsRegistry } from '@/lib/docs-registry'
import { ComponentDocPage } from '@/components/docs/ComponentDocPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DocsSlugPage({ params }: PageProps) {
  const { slug } = await params
  const component = docsRegistry.find((c) => c.slug === slug)

  if (!component) {
    notFound()
  }

  return <ComponentDocPage component={component} />
}

// 정적 경로 사전 생성
export function generateStaticParams() {
  return docsRegistry.map((c) => ({ slug: c.slug }))
}
