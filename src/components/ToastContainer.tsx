import { useState, useCallback } from 'react'
import Toast, { type ToastMessage } from './Toast'

export interface ToastContainerHandle {
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Expose via a global helper for simplicity
  if (typeof window !== 'undefined') {
    (window as any).__toastContainer = { addToast }
  }

  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

export function showToast(toast: Omit<ToastMessage, 'id'>) {
  if (typeof window !== 'undefined' && (window as any).__toastContainer) {
    ;(window as any).__toastContainer.addToast(toast)
  }
}
