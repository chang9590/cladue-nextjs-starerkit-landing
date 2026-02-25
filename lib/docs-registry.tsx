import React from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { CardSection } from '@/components/sections/CardSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ReviewSection } from '@/components/sections/ReviewSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import { FloatingButtons } from '@/components/floating/FloatingButtons'
import { FloatingContactForm } from '@/components/floating/FloatingContactForm'

// 문서 variant 타입
export type DocVariant = {
  name: string           // 'centered'
  label: string          // 'Centered'
  preview: React.ReactNode  // 실제 컴포넌트 렌더링
  code: string           // 복사할 사용 예시 코드
}

// 문서 컴포넌트 타입
export type DocComponent = {
  slug: string
  name: string
  description: string
  category: 'sections' | 'floating'
  variants: DocVariant[]
}

// ─── 샘플 데이터 ───────────────────────────────────────────

const heroVariants: DocVariant[] = [
  {
    name: 'centered',
    label: 'Centered',
    preview: (
      <HeroSection
        variant="centered"
        title="성공하는 비즈니스를 위한 최고의 파트너"
        subtitle="복잡한 문제를 단순하게. 전문가 팀이 당신의 성장을 함께 만들어 드립니다."
        ctaText="무료 상담 신청"
        ctaSecondaryText="서비스 소개 보기"
      />
    ),
    code: `import { HeroSection } from '@/components/sections/HeroSection'

export default function Page() {
  return (
    <HeroSection
      variant="centered"
      title="성공하는 비즈니스를 위한 최고의 파트너"
      subtitle="복잡한 문제를 단순하게. 전문가 팀이 당신의 성장을 함께 만들어 드립니다."
      ctaText="무료 상담 신청"
      ctaSecondaryText="서비스 소개 보기"
      onCtaClick={() => console.log('CTA 클릭')}
    />
  )
}`,
  },
  {
    name: 'split',
    label: 'Split',
    preview: (
      <HeroSection
        variant="split"
        title="전문가와 함께하는 비즈니스 성장"
        subtitle="검증된 전략과 실행력으로 목표를 달성하세요."
        ctaText="시작하기"
        ctaSecondaryText="더 알아보기"
      />
    ),
    code: `import { HeroSection } from '@/components/sections/HeroSection'

export default function Page() {
  return (
    <HeroSection
      variant="split"
      title="전문가와 함께하는 비즈니스 성장"
      subtitle="검증된 전략과 실행력으로 목표를 달성하세요."
      ctaText="시작하기"
      ctaSecondaryText="더 알아보기"
      imageSrc="/hero-image.jpg"
    />
  )
}`,
  },
  {
    name: 'background',
    label: 'Background',
    preview: (
      <HeroSection
        variant="background"
        title="당신의 꿈을 현실로"
        subtitle="최고의 전문가 팀과 함께 불가능을 가능으로 만드세요."
        ctaText="무료 상담"
        ctaSecondaryText="사례 보기"
      />
    ),
    code: `import { HeroSection } from '@/components/sections/HeroSection'

export default function Page() {
  return (
    <HeroSection
      variant="background"
      title="당신의 꿈을 현실로"
      subtitle="최고의 전문가 팀과 함께 불가능을 가능으로 만드세요."
      ctaText="무료 상담"
      ctaSecondaryText="사례 보기"
      backgroundSrc="/bg-hero.jpg"
    />
  )
}`,
  },
]

const cardItems = [
  { icon: '💡', title: '전문가 팀', description: '각 분야 10년 이상의 전문가로 구성된 팀이 최적의 솔루션을 제공합니다.' },
  { icon: '⚡', title: '빠른 실행력', description: '체계적인 프로세스로 불필요한 시간 낭비 없이 빠르게 결과를 만듭니다.' },
  { icon: '🎯', title: '맞춤형 전략', description: '천편일률적인 방식이 아닌 고객의 상황에 맞는 전략을 설계합니다.' },
  { icon: '📊', title: '데이터 기반', description: '감이 아닌 데이터와 수치를 기반으로 의사결정을 내립니다.' },
  { icon: '🤝', title: '지속적 관리', description: '프로젝트 완료 후에도 지속적인 사후 관리와 피드백을 제공합니다.' },
  { icon: '🔒', title: '완전한 보안', description: '고객의 모든 정보는 철저한 보안 정책 하에 안전하게 관리됩니다.' },
]

const cardVariants: DocVariant[] = [
  {
    name: 'grid3',
    label: 'Grid 3',
    preview: (
      <CardSection
        variant="grid3"
        sectionTitle="왜 저희를 선택해야 할까요?"
        sectionSubtitle="차별화된 전문성과 검증된 노하우로 최상의 결과를 약속합니다."
        items={cardItems}
      />
    ),
    code: `import { CardSection } from '@/components/sections/CardSection'

export default function Page() {
  return (
    <CardSection
      variant="grid3"
      sectionTitle="왜 저희를 선택해야 할까요?"
      sectionSubtitle="차별화된 전문성과 검증된 노하우로 최상의 결과를 약속합니다."
      items={[
        { icon: '💡', title: '전문가 팀', description: '각 분야 10년 이상의 전문가로 구성된 팀이 최적의 솔루션을 제공합니다.' },
        { icon: '⚡', title: '빠른 실행력', description: '체계적인 프로세스로 빠르게 결과를 만듭니다.' },
        { icon: '🎯', title: '맞춤형 전략', description: '고객의 상황에 맞는 전략을 설계합니다.' },
      ]}
    />
  )
}`,
  },
  {
    name: 'grid2',
    label: 'Grid 2',
    preview: (
      <CardSection
        variant="grid2"
        sectionTitle="핵심 서비스"
        sectionSubtitle="두 가지 핵심 가치를 중심으로 제공합니다."
        items={cardItems.slice(0, 4)}
      />
    ),
    code: `import { CardSection } from '@/components/sections/CardSection'

export default function Page() {
  return (
    <CardSection
      variant="grid2"
      sectionTitle="핵심 서비스"
      items={[
        { icon: '💡', title: '전문가 팀', description: '각 분야 10년 이상의 전문가로 구성됩니다.' },
        { icon: '⚡', title: '빠른 실행력', description: '체계적인 프로세스로 빠르게 결과를 만듭니다.' },
        { icon: '🎯', title: '맞춤형 전략', description: '고객의 상황에 맞는 전략을 설계합니다.' },
        { icon: '📊', title: '데이터 기반', description: '데이터와 수치를 기반으로 의사결정합니다.' },
      ]}
    />
  )
}`,
  },
  {
    name: 'list',
    label: 'List',
    preview: (
      <CardSection
        variant="list"
        sectionTitle="서비스 목록"
        items={cardItems.slice(0, 3)}
      />
    ),
    code: `import { CardSection } from '@/components/sections/CardSection'

export default function Page() {
  return (
    <CardSection
      variant="list"
      sectionTitle="서비스 목록"
      items={[
        { icon: '💡', title: '전문가 팀', description: '각 분야 전문가로 구성된 팀이 솔루션을 제공합니다.' },
        { icon: '⚡', title: '빠른 실행력', description: '체계적인 프로세스로 빠르게 결과를 만듭니다.' },
        { icon: '🎯', title: '맞춤형 전략', description: '고객의 상황에 맞는 전략을 설계합니다.' },
      ]}
    />
  )
}`,
  },
]

const processSteps = [
  { stepNumber: 1, icon: '📞', title: '무료 상담', description: '전화 또는 온라인으로 현재 상황과 목표를 공유해 주세요.' },
  { stepNumber: 2, icon: '🔍', title: '현황 분석', description: '전문가가 상황을 정밀 분석하여 최적의 방향을 제시합니다.' },
  { stepNumber: 3, icon: '📋', title: '전략 수립', description: '맞춤형 실행 계획을 수립하고 세부 일정을 확정합니다.' },
  { stepNumber: 4, icon: '🎉', title: '결과 달성', description: '체계적인 실행으로 목표한 성과를 달성합니다.' },
]

const processVariants: DocVariant[] = [
  {
    name: 'horizontal',
    label: 'Horizontal',
    preview: (
      <ProcessSection
        variant="horizontal"
        sectionTitle="어떻게 진행되나요?"
        steps={processSteps}
      />
    ),
    code: `import { ProcessSection } from '@/components/sections/ProcessSection'

export default function Page() {
  return (
    <ProcessSection
      variant="horizontal"
      sectionTitle="어떻게 진행되나요?"
      steps={[
        { stepNumber: 1, icon: '📞', title: '무료 상담', description: '전화 또는 온라인으로 상황을 공유해 주세요.' },
        { stepNumber: 2, icon: '🔍', title: '현황 분석', description: '전문가가 최적의 방향을 제시합니다.' },
        { stepNumber: 3, icon: '📋', title: '전략 수립', description: '맞춤형 실행 계획을 수립합니다.' },
        { stepNumber: 4, icon: '🎉', title: '결과 달성', description: '목표한 성과를 달성합니다.' },
      ]}
    />
  )
}`,
  },
  {
    name: 'vertical',
    label: 'Vertical',
    preview: (
      <ProcessSection
        variant="vertical"
        sectionTitle="진행 과정"
        steps={processSteps}
      />
    ),
    code: `import { ProcessSection } from '@/components/sections/ProcessSection'

export default function Page() {
  return (
    <ProcessSection
      variant="vertical"
      sectionTitle="진행 과정"
      steps={[
        { stepNumber: 1, icon: '📞', title: '무료 상담', description: '전화 또는 온라인으로 상황을 공유해 주세요.' },
        { stepNumber: 2, icon: '🔍', title: '현황 분석', description: '전문가가 최적의 방향을 제시합니다.' },
        { stepNumber: 3, icon: '📋', title: '전략 수립', description: '맞춤형 실행 계획을 수립합니다.' },
        { stepNumber: 4, icon: '🎉', title: '결과 달성', description: '목표한 성과를 달성합니다.' },
      ]}
    />
  )
}`,
  },
  {
    name: 'cards',
    label: 'Cards',
    preview: (
      <ProcessSection
        variant="cards"
        sectionTitle="진행 단계"
        steps={processSteps}
      />
    ),
    code: `import { ProcessSection } from '@/components/sections/ProcessSection'

export default function Page() {
  return (
    <ProcessSection
      variant="cards"
      sectionTitle="진행 단계"
      steps={[
        { stepNumber: 1, icon: '📞', title: '무료 상담', description: '전화 또는 온라인으로 상황을 공유해 주세요.' },
        { stepNumber: 2, icon: '🔍', title: '현황 분석', description: '전문가가 최적의 방향을 제시합니다.' },
        { stepNumber: 3, icon: '📋', title: '전략 수립', description: '맞춤형 실행 계획을 수립합니다.' },
        { stepNumber: 4, icon: '🎉', title: '결과 달성', description: '목표한 성과를 달성합니다.' },
      ]}
    />
  )
}`,
  },
]

const statsItems = [
  { icon: '👥', value: '1,200명+', label: '누적 고객' },
  { icon: '⭐', value: '98%', label: '고객 만족도' },
  { icon: '🏆', value: '8년', label: '업계 경력' },
  { icon: '🚀', value: '450건+', label: '프로젝트 완료' },
]

const statsVariants: DocVariant[] = [
  {
    name: 'row',
    label: 'Row',
    preview: <StatsSection variant="row" items={statsItems} />,
    code: `import { StatsSection } from '@/components/sections/StatsSection'

export default function Page() {
  return (
    <StatsSection
      variant="row"
      items={[
        { icon: '👥', value: '1,200명+', label: '누적 고객' },
        { icon: '⭐', value: '98%', label: '고객 만족도' },
        { icon: '🏆', value: '8년', label: '업계 경력' },
        { icon: '🚀', value: '450건+', label: '프로젝트 완료' },
      ]}
    />
  )
}`,
  },
  {
    name: 'grid',
    label: 'Grid',
    preview: <StatsSection variant="grid" items={statsItems} />,
    code: `import { StatsSection } from '@/components/sections/StatsSection'

export default function Page() {
  return (
    <StatsSection
      variant="grid"
      items={[
        { icon: '👥', value: '1,200명+', label: '누적 고객' },
        { icon: '⭐', value: '98%', label: '고객 만족도' },
        { icon: '🏆', value: '8년', label: '업계 경력' },
        { icon: '🚀', value: '450건+', label: '프로젝트 완료' },
      ]}
    />
  )
}`,
  },
]

const reviewItems = [
  { name: '김민수', role: '스타트업 대표', content: '처음엔 반신반의했지만 3개월 만에 매출이 2배 성장했습니다. 전문적인 분석과 실행력에 놀랐어요.', rating: 5 },
  { name: '이지은', role: '자영업자 40대', content: '오랫동안 고민하던 문제를 단숨에 해결해 주셨어요. 비용 이상의 가치를 충분히 경험했습니다.', rating: 5 },
  { name: '박성호', role: '직장인 30대', content: '친절한 상담과 꼼꼼한 관리 덕분에 걱정 없이 진행할 수 있었습니다. 강력 추천합니다!', rating: 4 },
]

const reviewVariants: DocVariant[] = [
  {
    name: 'cards',
    label: 'Cards',
    preview: (
      <ReviewSection
        variant="cards"
        sectionTitle="고객들의 생생한 후기"
        items={reviewItems}
      />
    ),
    code: `import { ReviewSection } from '@/components/sections/ReviewSection'

export default function Page() {
  return (
    <ReviewSection
      variant="cards"
      sectionTitle="고객들의 생생한 후기"
      items={[
        { name: '김민수', role: '스타트업 대표', content: '3개월 만에 매출이 2배 성장했습니다.', rating: 5 },
        { name: '이지은', role: '자영업자 40대', content: '비용 이상의 가치를 경험했습니다.', rating: 5 },
        { name: '박성호', role: '직장인 30대', content: '친절한 상담 덕분에 걱정 없이 진행했습니다.', rating: 4 },
      ]}
    />
  )
}`,
  },
  {
    name: 'featured',
    label: 'Featured',
    preview: (
      <ReviewSection
        variant="featured"
        sectionTitle="고객 후기"
        items={reviewItems}
      />
    ),
    code: `import { ReviewSection } from '@/components/sections/ReviewSection'

export default function Page() {
  return (
    <ReviewSection
      variant="featured"
      sectionTitle="고객 후기"
      items={[
        { name: '김민수', role: '스타트업 대표', content: '3개월 만에 매출이 2배 성장했습니다.', rating: 5 },
        { name: '이지은', role: '자영업자 40대', content: '비용 이상의 가치를 경험했습니다.', rating: 5 },
        { name: '박성호', role: '직장인 30대', content: '친절한 상담 덕분에 걱정 없이 진행했습니다.', rating: 4 },
      ]}
    />
  )
}`,
  },
]

const faqItems = [
  { question: '상담은 정말 무료인가요?', answer: '네, 초기 상담은 완전히 무료입니다. 부담 없이 현재 상황을 말씀해 주시면 전문가가 최적의 방향을 안내해 드립니다.' },
  { question: '얼마나 빠르게 결과를 볼 수 있나요?', answer: '대부분의 경우 4~8주 이내에 의미 있는 변화를 경험하실 수 있습니다.' },
  { question: '계약 중간에 취소할 수 있나요?', answer: '언제든지 취소 가능합니다. 진행된 업무에 대한 비용은 정산 후 환불 처리됩니다.' },
]

const faqVariants: DocVariant[] = [
  {
    name: 'default',
    label: 'Default',
    preview: (
      <FAQSection
        sectionTitle="자주 묻는 질문"
        items={faqItems}
      />
    ),
    code: `import { FAQSection } from '@/components/sections/FAQSection'

export default function Page() {
  return (
    <FAQSection
      sectionTitle="자주 묻는 질문"
      items={[
        { question: '상담은 정말 무료인가요?', answer: '네, 초기 상담은 완전히 무료입니다.' },
        { question: '얼마나 빠르게 결과를 볼 수 있나요?', answer: '4~8주 이내에 의미 있는 변화를 경험하실 수 있습니다.' },
        { question: '계약 중간에 취소할 수 있나요?', answer: '언제든지 취소 가능합니다.' },
      ]}
    />
  )
}`,
  },
]

const contactFormVariants: DocVariant[] = [
  {
    name: 'default',
    label: 'Default',
    preview: (
      <ContactFormSection
        sectionTitle="지금 바로 무료 상담 받기"
        sectionSubtitle="연락처를 남겨주시면 24시간 내에 전문가가 직접 연락 드립니다."
      />
    ),
    code: `'use client'

import { ContactFormSection } from '@/components/sections/ContactFormSection'

export default function Page() {
  return (
    <ContactFormSection
      sectionTitle="지금 바로 무료 상담 받기"
      sectionSubtitle="연락처를 남겨주시면 24시간 내에 전문가가 직접 연락 드립니다."
      onSubmit={(data) => {
        console.log('제출 데이터:', data)
        // 서버 전송 로직
      }}
    />
  )
}`,
  },
]

const floatingButtonsVariants: DocVariant[] = [
  {
    name: 'default',
    label: 'Default',
    preview: (
      <div className="relative min-h-[200px] bg-muted/30 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground text-sm">우측 하단에 플로팅 버튼이 렌더링됩니다</p>
        <div className="absolute bottom-4 right-4 flex flex-col items-center gap-2 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg">📞</div>
          <div className="w-12 h-12 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center shadow-lg">💬</div>
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">✉️</div>
        </div>
      </div>
    ),
    code: `'use client'

import { useState } from 'react'
import { FloatingButtons } from '@/components/floating/FloatingButtons'

export default function Page() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      {/* 페이지 콘텐츠 */}
      <FloatingButtons
        phoneNumber="010-1234-5678"
        kakaoLink="https://open.kakao.com/..."
        onConsultClick={() => setIsFormOpen(true)}
        showScrollTop
      />
    </>
  )
}`,
  },
]

const floatingFormVariants: DocVariant[] = [
  {
    name: 'default',
    label: 'Default',
    preview: (
      <div className="relative min-h-[400px] bg-muted/30 rounded-lg overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 bg-card border border-border rounded-t-2xl shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold">무료 상담 신청</span>
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm">✕</div>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="h-9 bg-muted rounded-md" />
            <div className="h-9 bg-muted rounded-md" />
            <div className="h-20 bg-muted rounded-md" />
            <div className="h-9 bg-primary rounded-md" />
          </div>
        </div>
      </div>
    ),
    code: `'use client'

import { useState } from 'react'
import { FloatingContactForm } from '@/components/floating/FloatingContactForm'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        상담 신청
      </button>
      <FloatingContactForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => {
          console.log('제출 데이터:', data)
        }}
      />
    </>
  )
}`,
  },
]

// ─── 전체 레지스트리 ───────────────────────────────────────────

export const docsRegistry: DocComponent[] = [
  {
    slug: 'hero',
    name: 'HeroSection',
    description: '랜딩페이지 상단 히어로 섹션. Centered, Split, Background 3가지 변형을 제공합니다.',
    category: 'sections',
    variants: heroVariants,
  },
  {
    slug: 'card',
    name: 'CardSection',
    description: '특징이나 서비스를 카드 형태로 표시하는 섹션. 3열·2열 그리드와 리스트 변형을 제공합니다.',
    category: 'sections',
    variants: cardVariants,
  },
  {
    slug: 'process',
    name: 'ProcessSection',
    description: '진행 절차나 단계를 시각화하는 섹션. 가로·세로·카드 3가지 변형을 제공합니다.',
    category: 'sections',
    variants: processVariants,
  },
  {
    slug: 'stats',
    name: 'StatsSection',
    description: '수치 기반 신뢰 지표를 표시하는 섹션. 가로 행과 그리드 2가지 변형을 제공합니다.',
    category: 'sections',
    variants: statsVariants,
  },
  {
    slug: 'review',
    name: 'ReviewSection',
    description: '고객 후기를 표시하는 섹션. 카드 그리드와 피처드 2가지 변형을 제공합니다.',
    category: 'sections',
    variants: reviewVariants,
  },
  {
    slug: 'faq',
    name: 'FAQSection',
    description: '자주 묻는 질문을 아코디언 형태로 표시하는 섹션.',
    category: 'sections',
    variants: faqVariants,
  },
  {
    slug: 'contact-form',
    name: 'ContactFormSection',
    description: '페이지 내 인라인 상담 신청 폼 섹션.',
    category: 'sections',
    variants: contactFormVariants,
  },
  {
    slug: 'floating-buttons',
    name: 'FloatingButtons',
    description: '화면 우측 하단에 고정된 전화·카카오·상담 플로팅 버튼 묶음.',
    category: 'floating',
    variants: floatingButtonsVariants,
  },
  {
    slug: 'floating-form',
    name: 'FloatingContactForm',
    description: '화면 우측 하단에 슬라이드업으로 나타나는 플로팅 상담 신청 폼.',
    category: 'floating',
    variants: floatingFormVariants,
  },
]
