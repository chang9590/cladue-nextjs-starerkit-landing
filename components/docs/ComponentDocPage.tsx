'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import type { DocComponent } from '@/lib/docs-registry'

interface ComponentDocPageProps {
  component: DocComponent
}

export function ComponentDocPage({ component }: ComponentDocPageProps) {
  const [activeVariant, setActiveVariant] = useState(component.variants[0].name)
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  const currentVariant = component.variants.find((v) => v.name === activeVariant)!

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentVariant.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 접근 실패 시 무시
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      {/* 컴포넌트 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{component.name}</h1>
          <Badge variant="secondary">{component.category}</Badge>
        </div>
        <p className="text-muted-foreground text-lg">{component.description}</p>
      </div>

      {/* Variant 탭 (2개 이상일 때만 표시) */}
      {component.variants.length > 1 && (
        <div className="mb-5">
          <Tabs value={activeVariant} onValueChange={setActiveVariant}>
            <TabsList>
              {component.variants.map((v) => (
                <TabsTrigger key={v.name} value={v.name}>
                  {v.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Preview / Code 토글 + 복사 버튼 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'preview'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            미리보기
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'code'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            코드
          </button>
        </div>

        {viewMode === 'code' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check size={14} />
                복사됨
              </>
            ) : (
              <>
                <Copy size={14} />
                코드 복사
              </>
            )}
          </Button>
        )}
      </div>

      {/* 미리보기 영역 */}
      {viewMode === 'preview' && (
        <div className="border rounded-xl overflow-auto bg-background">
          {currentVariant.preview}
        </div>
      )}

      {/* 코드 영역 */}
      {viewMode === 'code' && (
        <div className="relative">
          <pre className="border rounded-xl bg-muted/50 p-5 overflow-auto text-sm leading-relaxed">
            <code className="text-foreground font-mono">{currentVariant.code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
