import { IconPointFilled } from '@tabler/icons-react'

export default function Loader() {
  return (
    <div className="flex h-svh items-center justify-center">
      <div className="flex">
        {[0, 1, 2].map((i) => (
          <IconPointFilled
            key={i}
            className="text-subtle animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`bg-muted animate-pulse rounded ${className ?? ''}`} />
}

function SkeletonHeader() {
  return (
    <div className="bg-nav border-border sticky top-0 z-50 flex h-14 items-center justify-between border-b px-6 backdrop-blur-sm">
      <SkeletonBlock className="h-3.5 w-28" />
      <div className="hidden gap-6 md:flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-3 w-12" />
        ))}
      </div>
      <SkeletonBlock className="h-8 w-20" />
    </div>
  )
}

function SectionSkeleton({ label, children }: { label?: boolean; children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 md:max-w-175 md:px-0">
      {label && <SkeletonBlock className="h-2.5 w-24" />}
      {children}
    </div>
  )
}

export function ResumeSkeleton() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <SkeletonHeader />

      <main className="mx-auto flex w-full flex-col gap-6 px-4 py-12 md:max-w-175 md:px-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <SkeletonBlock className="h-2.5 w-16" />
            <SkeletonBlock className="h-3 w-32" />
          </div>
          <SkeletonBlock className="h-9 w-32 rounded-md" />
        </div>
        <SkeletonBlock className="h-[80vh] w-full rounded-lg" />
      </main>
    </div>
  )
}

export function HomeSkeleton() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <SkeletonHeader />

      {/* Hero */}
      <section className="dot-grid flex w-full flex-col items-center justify-center pt-24">
        <div className="border-border mx-auto flex w-full flex-col gap-6 border-b px-4 pb-24 md:max-w-175 md:px-0">
          <SkeletonBlock className="h-6 w-36 rounded-full" />
          <SkeletonBlock className="h-14 w-4/5 sm:h-16 md:h-20" />
          <SkeletonBlock className="h-5 w-1/2" />
          <div className="flex flex-col gap-2.5">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-11/12" />
            <SkeletonBlock className="h-4 w-3/4" />
          </div>
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-10 w-28" />
            ))}
          </div>
          <div className="flex gap-3">
            <SkeletonBlock className="h-10 w-36" />
            <SkeletonBlock className="h-10 w-28" />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="flex w-full flex-col items-center justify-center py-24">
        <SectionSkeleton label>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        </SectionSkeleton>
      </section>

      {/* Projects */}
      <section className="border-border flex w-full flex-col items-center justify-center border-y py-24">
        <SectionSkeleton label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        </SectionSkeleton>
      </section>
    </div>
  )
}
