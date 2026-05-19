import { useEffect, useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('fade-in-up--visible')
          observer.disconnect()
        }
      },
      { rootMargin: '-80px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`fade-in-up ${className ?? ''}`}
      style={delay ? { '--fade-delay': `${delay}s` } as React.CSSProperties : undefined}
    >
      {children}
    </div>
  )
}
