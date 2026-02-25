import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// 절차 섹션 변형 타입
type ProcessVariant = 'horizontal' | 'vertical' | 'cards'

interface ProcessStep {
  stepNumber: number
  title: string
  description: string
  icon?: string
}

interface ProcessSectionProps {
  variant?: ProcessVariant
  sectionTitle?: string
  steps: ProcessStep[]
}

// 섹션 헤더
function SectionHeader({ title }: { title?: string }) {
  if (!title) return null
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
    </div>
  )
}

// 가로 단계 변형 (번호 원 → 화살표)
function HorizontalProcess({ sectionTitle, steps }: ProcessSectionProps) {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={sectionTitle} />
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-row md:flex-col items-center md:flex-1 gap-4 md:gap-0">
              {/* 단계 원형 번호 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {step.icon || step.stepNumber}
                </div>
              </div>
              {/* 텍스트 */}
              <div className="md:text-center md:mt-4 md:px-4">
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {/* 화살표 (마지막 아이템 제외) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex md:flex-1 justify-center items-start pt-7">
                  <span className="text-2xl text-muted-foreground">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 세로 타임라인 변형
function VerticalProcess({ sectionTitle, steps }: ProcessSectionProps) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title={sectionTitle} />
        <div className="relative">
          {/* 세로 라인 */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />
          <div className="flex flex-col gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                {/* 원형 번호 */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {step.icon || step.stepNumber}
                </div>
                {/* 내용 */}
                <div className="pt-2 pb-4">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// 카드 배열 변형
function CardsProcess({ sectionTitle, steps }: ProcessSectionProps) {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={sectionTitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <Card key={idx} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {/* 번호 배지 */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                {step.stepNumber}
              </div>
              <CardHeader>
                {step.icon && <div className="text-3xl mb-2">{step.icon}</div>}
                <CardTitle className="text-lg pr-10">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProcessSection({ variant = 'horizontal', ...props }: ProcessSectionProps) {
  if (variant === 'vertical') return <VerticalProcess variant={variant} {...props} />
  if (variant === 'cards') return <CardsProcess variant={variant} {...props} />
  return <HorizontalProcess variant={variant} {...props} />
}
