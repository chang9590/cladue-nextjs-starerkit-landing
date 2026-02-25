'use client'

import { useEffect, useState } from 'react'
import { Phone, ChevronUp, MessageCircle } from 'lucide-react'

interface FloatingButtonsProps {
  phoneNumber?: string         // "010-1234-5678"
  kakaoLink?: string           // 카카오 오픈채팅 URL
  onConsultClick?: () => void  // 상담 폼 열기
  showScrollTop?: boolean
}

export function FloatingButtons({
  phoneNumber,
  kakaoLink,
  onConsultClick,
  showScrollTop = true,
}: FloatingButtonsProps) {
  const [showTop, setShowTop] = useState(false)

  // 스크롤 이벤트로 스크롤탑 버튼 visibility 제어
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-3">
      {/* 전화 버튼 */}
      {phoneNumber && (
        <a
          href={`tel:${phoneNumber.replace(/-/g, '')}`}
          aria-label="전화 상담"
          className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <Phone size={22} />
        </a>
      )}

      {/* 카카오 버튼 */}
      {kakaoLink && (
        <a
          href={kakaoLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오 채팅"
          className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          {/* 카카오 로고 이모지 대체 */}
          <span className="text-2xl leading-none">💬</span>
        </a>
      )}

      {/* 상담신청 버튼 */}
      {onConsultClick && (
        <button
          onClick={onConsultClick}
          aria-label="상담 신청"
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle size={22} />
        </button>
      )}

      {/* 스크롤 탑 버튼 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="맨 위로"
          className={`w-14 h-14 rounded-full bg-white border border-border text-foreground flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 ${
            showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <ChevronUp size={22} />
        </button>
      )}
    </div>
  )
}
