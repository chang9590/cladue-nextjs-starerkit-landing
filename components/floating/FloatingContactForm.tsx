'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import type { ContactFormData } from '@/components/sections/ContactFormSection'

interface FloatingContactFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: ContactFormData) => void
}

export function FloatingContactForm({ isOpen, onClose, onSubmit }: FloatingContactFormProps) {
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
      console.log('[FloatingContactForm] 제출 데이터:', formData)
    }
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    // 닫힐 때 상태 초기화 (애니메이션 후)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', phone: '', message: '', privacyAgreed: false })
    }, 300)
  }

  return (
    <>
      {/* 배경 오버레이 (모바일) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={handleClose}
        />
      )}

      {/* 플로팅 패널 */}
      <div
        className={`fixed bottom-0 right-0 md:bottom-6 md:right-20 z-50 w-full md:w-96 bg-card border border-border rounded-t-2xl md:rounded-2xl shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-[110%]'
        }`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">무료 상담 신청</h3>
          <button
            onClick={handleClose}
            aria-label="닫기"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* 폼 내용 */}
        <div className="p-5">
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <h4 className="text-lg font-semibold mb-2">접수 완료!</h4>
              <p className="text-sm text-muted-foreground mb-4">
                빠른 시일 내에 연락 드리겠습니다.
              </p>
              <Button variant="outline" size="sm" onClick={handleClose}>
                닫기
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* 이름 */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fcf-name" className="text-sm">
                  이름 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fcf-name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* 연락처 */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fcf-phone" className="text-sm">
                  연락처 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fcf-phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              {/* 선택 문의내용 */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fcf-message" className="text-sm">
                  문의 내용 (선택)
                </Label>
                <Textarea
                  id="fcf-message"
                  placeholder="궁금한 점을 적어주세요."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* 개인정보 동의 */}
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="fcf-privacy"
                  checked={formData.privacyAgreed}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, privacyAgreed: !!checked })
                  }
                />
                <Label htmlFor="fcf-privacy" className="text-xs leading-relaxed cursor-pointer text-muted-foreground">
                  <span className="text-destructive font-medium">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                </Label>
              </div>

              <Button type="submit" className="w-full mt-1">
                상담 신청하기
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
