import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useFadeInUp<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power3.out' }
    )
  }, [delay])

  return ref
}

export function useStaggerFadeIn<T extends HTMLElement>(itemSelector: string, stagger: number = 0.1) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll(itemSelector)
    if (items.length === 0) return

    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, stagger, ease: 'power3.out' }
    )
  }, [itemSelector, stagger])

  return containerRef
}

export function useSlideInLeft<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power3.out' }
    )
  }, [delay])

  return ref
}

export function useSlideInRight<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power3.out' }
    )
  }, [delay])

  return ref
}

export function useScaleIn<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, delay, ease: 'back.out(1.7)' }
    )
  }, [delay])

  return ref
}
