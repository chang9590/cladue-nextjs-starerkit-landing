업종/목적을 입력받아 랜딩페이지 전체 코드를 생성합니다.

## 사용법
`/landing-page [업종/목적]`

예시: `/landing-page 학원 수강생 모집`

## 작업 순서

1. **입력 분석**: `$ARGUMENTS`를 읽고 업종·목적·타겟 고객을 파악한다.

2. **섹션 variant 조합 추천**: 아래 컴포넌트와 variant 중 업종에 가장 어울리는 것을 선택하고, 선택 이유를 간략히 설명한다.
   - `HeroSection` — `centered` | `split` | `background`
   - `CardSection` — `grid3` | `grid2` | `list`
   - `ProcessSection` — `horizontal` | `vertical` | `cards`
   - `StatsSection` — `row` | `grid`
   - `ReviewSection` — `cards` | `featured`
   - `FAQSection` — (variant 없음, sectionTitle + items만)
   - `ContactFormSection` — (variant 없음, sectionTitle + sectionSubtitle + onSubmit)
   - `FloatingButtons` + `FloatingContactForm`

3. **콘텐츠 생성**: 업종에 맞는 실제 문구(제목, 부제목, 카드 항목, 단계, 수치, 후기, FAQ 등)를 한국어로 작성한다. 플레이스홀더 텍스트(`Lorem ipsum`, `제목`, `내용` 등)는 절대 사용하지 않는다.

4. **page.tsx 코드 출력**: 아래 구조와 하단의 **Props 레퍼런스**를 참조하여 모든 prop을 실제 값으로 채운 완성형 코드를 출력한다.

```tsx
'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { CardSection } from '@/components/sections/CardSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ReviewSection } from '@/components/sections/ReviewSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import type { ContactFormData } from '@/components/sections/ContactFormSection'
import { FloatingButtons } from '@/components/floating/FloatingButtons'
import { FloatingContactForm } from '@/components/floating/FloatingContactForm'

export default function LandingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  function handleSubmit(data: ContactFormData) {
    console.log('상담 신청:', data)
  }

  return (
    <>
      <HeroSection
        variant="centered"
        title="실제 제목을 여기에"
        subtitle="실제 부제목을 여기에"
        ctaText="무료 상담 신청"
        ctaSecondaryText="더 알아보기"
      />
      <StatsSection
        variant="row"
        items={[
          { value: '1,200+', label: '누적 수강생' },
          { value: '98%', label: '수강생 만족도' },
          { value: '5년', label: '운영 경력' },
          { value: '24시간', label: '온라인 지원' },
        ]}
      />
      <CardSection
        variant="grid3"
        sectionTitle="주요 특징"
        sectionSubtitle="왜 선택해야 하는지 설명"
        items={[
          { icon: '🎯', title: '특징 1', description: '특징 1 설명' },
          { icon: '💡', title: '특징 2', description: '특징 2 설명' },
          { icon: '🚀', title: '특징 3', description: '특징 3 설명' },
        ]}
      />
      <ProcessSection
        variant="horizontal"
        sectionTitle="진행 과정"
        steps={[
          { stepNumber: 1, icon: '📞', title: '상담 신청', description: '단계 설명' },
          { stepNumber: 2, icon: '📋', title: '맞춤 설계', description: '단계 설명' },
          { stepNumber: 3, icon: '✅', title: '시작', description: '단계 설명' },
        ]}
      />
      <ReviewSection
        variant="cards"
        sectionTitle="수강생 후기"
        items={[
          { name: '홍길동', role: '직장인', content: '실제 후기 내용', rating: 5 },
          { name: '김영희', role: '대학생', content: '실제 후기 내용', rating: 5 },
          { name: '이철수', role: '주부', content: '실제 후기 내용', rating: 4 },
        ]}
      />
      <FAQSection
        sectionTitle="자주 묻는 질문"
        items={[
          { question: '실제 질문 1?', answer: '실제 답변 1' },
          { question: '실제 질문 2?', answer: '실제 답변 2' },
          { question: '실제 질문 3?', answer: '실제 답변 3' },
        ]}
      />
      <ContactFormSection
        sectionTitle="무료 상담 신청"
        sectionSubtitle="지금 바로 신청하시면 24시간 내에 연락드립니다"
        onSubmit={handleSubmit}
      />
      <FloatingButtons
        phoneNumber="010-0000-0000"
        onConsultClick={() => setIsFormOpen(true)}
        showScrollTop
      />
      <FloatingContactForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}
```

## 출력 형식

1. **추천 variant 조합** — 각 섹션별 선택한 variant와 한 줄 이유
2. **완성형 `page.tsx` 코드 블록** — 실제로 복사해서 바로 쓸 수 있는 수준으로 작성

---

## Props 레퍼런스

코드 생성 시 아래 prop 정보를 참조하여 `...` 없이 모든 prop을 실제 값으로 채운다.

### HeroSection
```ts
variant?: 'centered' | 'split' | 'background'  // 기본값: 'centered'
title: string           // 필수. 메인 헤드라인
subtitle?: string       // 부제목
ctaText?: string        // 주 CTA 버튼 텍스트
ctaSecondaryText?: string  // 보조 CTA 버튼 텍스트
onCtaClick?: () => void
imageSrc?: string       // split variant 전용 우측 이미지
backgroundSrc?: string  // background variant 전용 배경 이미지
```

### CardSection
```ts
variant?: 'grid3' | 'grid2' | 'list'  // 기본값: 'grid3'
sectionTitle?: string
sectionSubtitle?: string
items: Array<{
  icon?: string         // 이모지 또는 아이콘
  title: string
  description: string
}>
```

### ProcessSection
```ts
variant?: 'horizontal' | 'vertical' | 'cards'  // 기본값: 'horizontal'
sectionTitle?: string
steps: Array<{
  stepNumber: number
  icon?: string
  title: string
  description: string
}>
```

### StatsSection
```ts
variant?: 'row' | 'grid'  // 기본값: 'row'
items: Array<{
  icon?: string
  value: string           // 예: '1,200+', '98%'
  label: string
}>
```

### ReviewSection
```ts
variant?: 'cards' | 'featured'  // 기본값: 'cards'
sectionTitle?: string
items: Array<{
  name: string
  role?: string
  content: string
  rating?: number         // 1–5
}>
```

### FAQSection
> ⚠️ variant prop 없음
```ts
sectionTitle?: string
items: Array<{
  question: string
  answer: string
}>
```

### ContactFormSection
> ⚠️ variant prop 없음
```ts
sectionTitle?: string
sectionSubtitle?: string
onSubmit?: (data: ContactFormData) => void
// ContactFormData: { name: string; phone: string; message?: string }
```

### FloatingButtons
```ts
phoneNumber?: string
kakaoLink?: string
onConsultClick?: () => void
showScrollTop?: boolean
```

### FloatingContactForm
```ts
isOpen: boolean         // 필수
onClose: () => void     // 필수
onSubmit?: (data: ContactFormData) => void
```
