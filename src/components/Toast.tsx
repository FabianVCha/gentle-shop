import { useEffect, useRef } from 'react'
import { Check, X, ShoppingCart, AlertCircle } from 'lucide-react'
import gsap from 'gsap'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastProps {
  toast: ToastMessage
  onRemove: (id: string) => void
}

export default function Toast({ toast, onRemove }: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { x: 120, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }
      )
    }

    timerRef.current = setTimeout(() => {
      handleRemove()
    }, toast.duration ?? 3000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleRemove = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (toastRef.current) {
      gsap.to(toastRef.current, {
        x: 120,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => onRemove(toast.id),
      })
    } else {
      onRemove(toast.id)
    }
  }

  const icons = {
    success: <Check size={18} className="text-success" />,
    error: <AlertCircle size={18} className="text-danger" />,
    info: <ShoppingCart size={18} className="text-primary-600" />,
  }

  const bgColors = {
    success: 'bg-success-50 border-success-200',
    error: 'bg-danger-50 border-danger-200',
    info: 'bg-primary-50 border-primary-200',
  }

  return (
    <div
      ref={toastRef}
      className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[280px] max-w-[360px] ${bgColors[toast.type]}`}
    >
      <div className="mt-0.5 flex-shrink-0">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-default-900">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-default-600 mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={handleRemove}
        className="flex-shrink-0 text-default-400 hover:text-default-600 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  )
}
