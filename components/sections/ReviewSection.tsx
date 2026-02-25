import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

// 후기 섹션 변형 타입
type ReviewVariant = 'cards' | 'featured'

interface ReviewItem {
  name: string
  role?: string      // "직장인 30대", "자영업자" 등
  content: string
  rating?: number    // 1~5 (별점)
  avatarSrc?: string
}

interface ReviewSectionProps {
  variant?: ReviewVariant
  sectionTitle?: string
  items: ReviewItem[]
}

// 별점 렌더링
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating}점`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-muted'}>★</span>
      ))}
    </div>
  )
}

// 아바타 컴포넌트
function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    )
  }
  // 이니셜 아바타
  return (
    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold flex-shrink-0">
      {name.charAt(0)}
    </div>
  )
}

// 3열 카드 변형
function CardsReview({ sectionTitle, items }: ReviewSectionProps) {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {sectionTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{sectionTitle}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                {item.rating && (
                  <div className="mb-3">
                    <StarRating rating={item.rating} />
                  </div>
                )}
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar name={item.name} src={item.avatarSrc} />
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    {item.role && (
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// 피처드 변형 (큰 인용구 1개 + 하단 소형 카드)
function FeaturedReview({ sectionTitle, items }: ReviewSectionProps) {
  const [featured, ...rest] = items

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        {sectionTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{sectionTitle}</h2>
          </div>
        )}
        {/* 메인 인용구 */}
        {featured && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 mb-8 text-center">
            {featured.rating && (
              <div className="flex justify-center mb-4">
                <StarRating rating={featured.rating} />
              </div>
            )}
            <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
              &ldquo;{featured.content}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <Avatar name={featured.name} src={featured.avatarSrc} />
              <div className="text-left">
                <p className="font-semibold">{featured.name}</p>
                {featured.role && (
                  <p className="text-sm text-muted-foreground">{featured.role}</p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* 소형 카드 배열 */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {rest.map((item, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  {item.rating && (
                    <div className="mb-2">
                      <StarRating rating={item.rating} />
                    </div>
                  )}
                  <p className="text-sm text-foreground mb-4 leading-relaxed">
                    &ldquo;{item.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <Avatar name={item.name} src={item.avatarSrc} />
                    <div>
                      <p className="font-semibold text-xs">{item.name}</p>
                      {item.role && (
                        <p className="text-xs text-muted-foreground">{item.role}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function ReviewSection({ variant = 'cards', ...props }: ReviewSectionProps) {
  if (variant === 'featured') return <FeaturedReview variant={variant} {...props} />
  return <CardsReview variant={variant} {...props} />
}
