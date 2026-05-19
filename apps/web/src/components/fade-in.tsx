interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <div className={`fade-in-up ${className ?? ''}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  )
}
