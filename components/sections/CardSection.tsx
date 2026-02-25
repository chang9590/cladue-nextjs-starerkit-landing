import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// 카드 섹션 변형 타입
type CardVariant = 'grid3' | 'grid2' | 'list'

interface CardItem {
  icon?: string   // 이모지 또는 lucide 아이콘 이름
  title: string
  description: string
}

interface CardSectionProps {
  variant?: CardVariant
  sectionTitle?: string
  sectionSubtitle?: string
  items: CardItem[]
}

// 섹션 헤더 공통 컴포넌트
function SectionHeader({ title, subtitle }: { title?: string; subtitle?: string }) {
  if (!title && !subtitle) return null
  return (
    <div className="text-center mb-12">
      {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

// 3열 그리드 변형
function Grid3Cards({ sectionTitle, sectionSubtitle, items }: CardSectionProps) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                {item.icon && (
                  <div className="text-4xl mb-3 flex justify-center">{item.icon}</div>
                )}
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// 2열 가로형 카드 변형
function Grid2Cards({ sectionTitle, sectionSubtitle, items }: CardSectionProps) {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                {item.icon && (
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                )}
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// 1열 수평 리스트 변형
function ListCards({ sectionTitle, sectionSubtitle, items }: CardSectionProps) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />
        <div className="flex flex-col gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-5 p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              {item.icon && (
                <span className="text-3xl flex-shrink-0 mt-1">{item.icon}</span>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CardSection({ variant = 'grid3', ...props }: CardSectionProps) {
  if (variant === 'grid2') return <Grid2Cards variant={variant} {...props} />
  if (variant === 'list') return <ListCards variant={variant} {...props} />
  return <Grid3Cards variant={variant} {...props} />
}
