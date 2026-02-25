// 신뢰지표 섹션 변형 타입
type StatsVariant = 'row' | 'grid'

interface StatItem {
  value: string   // "1,200명+", "98%"
  label: string   // "누적 고객", "만족도"
  icon?: string
}

interface StatsSectionProps {
  variant?: StatsVariant
  items: StatItem[]
  backgroundColor?: string  // 배경 색상 강조용
}

// 단일 통계 아이템
function StatCard({ item }: { item: StatItem }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 p-6">
      {item.icon && <span className="text-4xl mb-1">{item.icon}</span>}
      <span className="text-4xl md:text-5xl font-bold text-primary">{item.value}</span>
      <span className="text-base text-muted-foreground font-medium">{item.label}</span>
    </div>
  )
}

// 가로 한 줄 배치 (4개 추천)
function RowStats({ items, backgroundColor }: StatsSectionProps) {
  return (
    <section
      className="py-16 px-4"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div
        className={`max-w-5xl mx-auto ${!backgroundColor ? 'bg-primary/5 rounded-2xl' : ''}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
          {items.map((item, idx) => (
            <StatCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

// 2×2 그리드 배치
function GridStats({ items, backgroundColor }: StatsSectionProps) {
  return (
    <section
      className="py-16 px-4"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-card border rounded-2xl hover:shadow-md transition-shadow"
            >
              <StatCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StatsSection({ variant = 'row', ...props }: StatsSectionProps) {
  if (variant === 'grid') return <GridStats variant={variant} {...props} />
  return <RowStats variant={variant} {...props} />
}
