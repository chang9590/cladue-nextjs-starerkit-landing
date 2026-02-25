'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

export interface ContactFormData {
  name: string
  phone: string
  message?: string
  privacyAgreed: boolean
}

interface ContactFormSectionProps {
  sectionTitle?: string
  sectionSubtitle?: string
  onSubmit?: (data: ContactFormData) => void
}

export function ContactFormSection({
  sectionTitle = '상담 문의',
  sectionSubtitle = '궁금한 점을 남겨주시면 빠르게 답변 드리겠습니다.',
  onSubmit,
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    message: '',
    privacyAgreed: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.privacyAgreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.')
      return
    }
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log('[ContactFormSection] 제출 데이터:', formData)
    }
    setSubmitted(true)
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="text-muted-foreground">{sectionSubtitle}</p>
          )}
        </div>

        {submitted ? (
          <div className="text-center p-10 bg-card rounded-2xl border">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">문의가 접수되었습니다</h3>
            <p className="text-muted-foreground">빠른 시일 내에 연락 드리겠습니다.</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setSubmitted(false)}
            >
              다시 작성하기
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border p-8 flex flex-col gap-5">
            {/* 이름 */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="cf-name">이름 <span className="text-destructive">*</span></Label>
              <Input
                id="cf-name"
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* 연락처 */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="cf-phone">연락처 <span className="text-destructive">*</span></Label>
              <Input
                id="cf-phone"
                type="tel"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            {/* 문의 내용 */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="cf-message">문의 내용 (선택)</Label>
              <Textarea
                id="cf-message"
                placeholder="궁금하신 내용을 자유롭게 적어주세요."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* 개인정보 동의 */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="cf-privacy"
                checked={formData.privacyAgreed}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, privacyAgreed: !!checked })
                }
              />
              <Label htmlFor="cf-privacy" className="text-sm leading-relaxed cursor-pointer">
                <span className="text-destructive font-medium">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                (수집 항목: 이름, 연락처 / 목적: 상담 안내 / 보유기간: 상담 완료 후 즉시 파기)
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full mt-2">
              상담 신청하기
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
