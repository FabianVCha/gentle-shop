import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Pulse animation
    tl.to(iconRef.current, {
      scale: 1.1,
      duration: 0.5,
      ease: 'power1.inOut',
      repeat: 2,
      yoyo: true,
    })

    // Fade out
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        onComplete()
      },
    })
  }, [onComplete])

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] bg-primary-600 flex items-center justify-center"
    >
      <div ref={iconRef} className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
        <p className="text-white font-medium text-sm tracking-wide">Cargando...</p>
      </div>
    </div>
  )
}
