import Image from 'next/image'
import { Button } from '@/components/ui/button'

// 히어로 섹션 변형 타입
type HeroVariant = 'centered' | 'split' | 'background'

interface HeroSectionProps {
  variant?: HeroVariant
  title: string
  subtitle?: string
  ctaText?: string
  ctaSecondaryText?: string
  onCtaClick?: () => void
  imageSrc?: string        // split 변형에 사용
  backgroundSrc?: string   // background 변형에 사용
}

// 중앙 정렬 변형
function CenteredHero({ title, subtitle, ctaText, ctaSecondaryText, onCtaClick }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 text-center bg-background">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        {ctaText && (
          <Button size="lg" onClick={onCtaClick} className="text-base px-8">
            {ctaText}
          </Button>
        )}
        {ctaSecondaryText && (
          <Button size="lg" variant="outline" className="text-base px-8">
            {ctaSecondaryText}
          </Button>
        )}
      </div>
    </section>
  )
}

// 좌우 분할 변형
function SplitHero({ title, subtitle, ctaText, ctaSecondaryText, onCtaClick, imageSrc }: HeroSectionProps) {
  return (
    <section className="min-h-[60vh] py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* 좌측 텍스트 영역 */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground mb-8">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            {ctaText && (
              <Button size="lg" onClick={onCtaClick} className="text-base px-8">
                {ctaText}
              </Button>
            )}
            {ctaSecondaryText && (
              <Button size="lg" variant="outline" className="text-base px-8">
                {ctaSecondaryText}
              </Button>
            )}
          </div>
        </div>
        {/* 우측 이미지 영역 */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="히어로 이미지"
              fill
              className="object-cover"
            />
          ) : (
            // 이미지 미제공 시 플레이스홀더
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <span className="text-6xl">🖼️</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// 배경 이미지 풀스크린 변형
function BackgroundHero({ title, subtitle, ctaText, ctaSecondaryText, onCtaClick, backgroundSrc }: HeroSectionProps) {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[70vh] py-20 px-4 text-center overflow-hidden"
      style={backgroundSrc ? { backgroundImage: `url(${backgroundSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {/* 배경 그라디언트 (이미지 미제공 시) */}
      {!backgroundSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700" />
      )}
      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />
      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {ctaText && (
            <Button size="lg" onClick={onCtaClick} className="text-base px-8 bg-white text-slate-900 hover:bg-white/90">
              {ctaText}
            </Button>
          )}
          {ctaSecondaryText && (
            <Button size="lg" variant="outline" className="text-base px-8 border-white text-white hover:bg-white/10">
              {ctaSecondaryText}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export function HeroSection({ variant = 'centered', ...props }: HeroSectionProps) {
  if (variant === 'split') return <SplitHero variant={variant} {...props} />
  if (variant === 'background') return <BackgroundHero variant={variant} {...props} />
  return <CenteredHero variant={variant} {...props} />
}
