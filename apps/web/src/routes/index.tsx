import { CertificateCard } from '@/components/certificate-card'
import { ExperienceCard } from '@/components/experience-card'
import { FadeIn } from '@/components/fade-in'
import { HomeSkeleton } from '@/components/loader'
import { MainHeader } from '@/components/main-header'
import { ProjectCard } from '@/components/project-card'
import { TechStackList } from '@/components/tech-stack-list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { trpc } from '@/utils/trpc'
import { AVAILABILITY_STATUS_LABELS, SOCIAL_ICON_MAP } from '@portofolio/constants'
import {
  IconArrowRight,
  IconBriefcase,
  IconCertificate,
  IconFolder,
  IconMail,
  IconStack2,
} from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  pendingComponent: HomeSkeleton,
  loader: async ({ context }) => {
    const profile = await context.queryClient.ensureQueryData(
      context.trpc.profile.get.queryOptions(),
    )

    const projects = await context.queryClient.ensureQueryData(
      context.trpc.project.getForLandingPage.queryOptions(),
    )

    const experiences = await context.queryClient.ensureQueryData(
      context.trpc.experience.getAll.queryOptions(),
    )

    const stack = await context.queryClient.ensureQueryData(
      context.trpc.techStack.getAll.queryOptions(),
    )

    const certifications = await context.queryClient.ensureQueryData(
      context.trpc.certification.getForLandingPage.queryOptions(),
    )

    const socialLinks = await context.queryClient.ensureQueryData(
      context.trpc.socialLink.getAll.queryOptions(),
    )

    return {
      profile,
      projects,
      experiences,
      stack,
      certifications,
      socialLinks,
    }
  },
  head: ({ loaderData }) => {
    const profile = loaderData?.profile
    const title = profile ? `${profile.name} — ${profile.title}` : 'Portfolio'
    const description = profile?.bio ?? ''

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
    }
  },
  component: HomeComponent,
})

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-subtle font-mono text-sm tracking-[0.15em]">{children}</h2>
}

function HomeComponent() {
  const navigate = Route.useNavigate()

  const {
    profile,
    projects: { data: featured, isMore },
    experiences,
    stack,
    certifications: { data: certificates, isMore: isMoreCerts },
    socialLinks,
  } = Route.useLoaderData()

  const socialByIcon: Partial<Record<string, (typeof socialLinks)[number]>> = Object.fromEntries(
    socialLinks.map((l) => [l.icon, l]),
  )

  const incrementSocialLinkClickCount = useMutation(
    trpc.socialLink.incrementClickCount.mutationOptions(),
  )

  return (
    <div className="bg-background text-foreground flex flex-col">
      <MainHeader />

      {/* Hero */}
      <section
        id="about"
        className="dot-grid flex w-full scroll-mt-14 flex-col items-center justify-center gap-6 pt-24"
      >
        <FadeIn className="border-border mx-auto flex w-full flex-col gap-6 self-stretch border-b px-4 pb-24 md:max-w-175 md:px-0">
          {profile.availabilityStatus !== 'unavailable' && (
            <Badge
              variant="outline"
              className="bg-available text-available-foreground border-available-foreground/20 w-fit border px-3.5 py-3 text-xs font-medium"
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
              {AVAILABILITY_STATUS_LABELS[profile.availabilityStatus]}
            </Badge>
          )}
          <h1 className="text-foreground text-[32px] leading-[1.05] font-extrabold sm:text-[44px] md:text-[54px]">
            {profile.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-start text-[18px]">{profile.title}</p>
          <p className="text-muted-foreground max-w-2xl text-start text-[15px] leading-[1.75]">
            {profile.bio}
          </p>
          {/* Social */}
          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = SOCIAL_ICON_MAP[link.icon].icon
              return (
                <Button
                  key={link.id}
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    incrementSocialLinkClickCount.mutate({ id: link.id })
                    window.open(link.url, '_blank')
                  }}
                  title={link.title}
                >
                  <span className="text-subtle flex items-center gap-1 text-sm font-medium">
                    {<Icon className="size-4" />}
                    {link.title}
                  </span>
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.assign(`mailto:${profile.email}`)}
            >
              <span className="text-subtle flex items-center gap-1 text-sm font-medium">
                <IconMail className="size-4" />
                Email
              </span>
            </Button>
          </div>
          <div className="flex gap-3">
            <Button
              size="lg"
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group"
            >
              View Projects
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-subtle"
            >
              Contact
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="flex w-full scroll-mt-14 flex-col items-center justify-center gap-6 py-24"
      >
        <FadeIn className="mx-auto flex w-full flex-col justify-center gap-8 px-4 md:max-w-175 md:px-0">
          <SectionHeading>WORK EXPERIENCE</SectionHeading>
          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} experience={exp} />
            ))}
          </div>
          {experiences.length === 0 && (
            <EmptyState
              icon={IconBriefcase}
              title="No experience yet"
              description="It seems there are no experiences to show at the moment."
            />
          )}
        </FadeIn>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="bg-section-alt flex w-full scroll-mt-14 flex-col items-center justify-center gap-6 border-y py-24"
      >
        <FadeIn className="mx-auto flex w-full flex-col justify-center gap-8 px-4 md:max-w-175 md:px-0">
          <SectionHeading>PROJECTS</SectionHeading>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {featured.length === 0 && (
            <EmptyState
              icon={IconFolder}
              title="No projects yet"
              description="It seems there are no projects to show at the moment."
            />
          )}
          {isMore && (
            <Button
              onClick={() => navigate({ to: '/projects' })}
              variant="link"
              size="lg"
              className="text-subtle group"
            >
              View all projects
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </FadeIn>
      </section>

      <div className="flex flex-col items-center justify-center gap-24 py-12">
        {/* Tech Stack */}
        <section
          id="stack"
          className="mx-auto flex w-full scroll-mt-26 flex-col gap-8 px-4 md:max-w-175 md:px-0"
        >
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading>TECH STACK</SectionHeading>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
              {stack.map((group) => (
                <TechStackList key={group.id} stack={group} />
              ))}
            </div>
            {stack.length === 0 && (
              <EmptyState
                icon={IconStack2}
                title="No tech stack yet"
                description="It seems there are no tech stacks to show at the moment."
              />
            )}
          </FadeIn>
        </section>

        {/* Certificates */}
        <section
          id="certs"
          className="bg-section-alt flex w-full scroll-mt-14 flex-col items-center justify-center gap-6 border-y py-24"
        >
          <FadeIn className="mx-auto flex w-full flex-col justify-center gap-8 px-4 md:max-w-175 md:px-0">
            <SectionHeading>CERTIFICATES</SectionHeading>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
            {certificates.length === 0 && (
              <EmptyState
                icon={IconCertificate}
                title="No certificates yet"
                description="It seems there are no certificates to show at the moment."
              />
            )}
            {isMoreCerts && (
              <Button
                onClick={() => navigate({ to: '/certificates' })}
                variant="link"
                size="lg"
                className="text-subtle group"
              >
                View all certificates
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </FadeIn>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="mx-auto flex w-full scroll-mt-14 flex-col gap-8 px-4 md:max-w-175 md:px-0"
        >
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading>CONTACT</SectionHeading>
            <div className="border-border flex flex-col gap-8 rounded-lg border p-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-4">
                <p className="text-foreground text-lg font-semibold">Let&apos;s work together.</p>
                <p className="text-subtle max-w-sm leading-relaxed">
                  I&apos;m open to freelance work, full-time roles, and interesting side projects.
                  If you have something in mind, reach out.
                </p>
                <Button
                  size="lg"
                  className="w-fit"
                  onClick={() => window.location.assign(`mailto:${profile.email}`)}
                >
                  <IconMail className="size-4" />
                  Send me an email
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => {
                  const Icon = SOCIAL_ICON_MAP[link.icon].icon
                  return (
                    <Button
                      key={link.id}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        incrementSocialLinkClickCount.mutate({ id: link.id })
                        window.open(link.url, '_blank')
                      }}
                    >
                      <Icon className="size-4" />
                      {link.title}
                    </Button>
                  )
                })}
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      <footer className="border-border mx-auto flex w-full flex-col justify-between gap-2 border-t px-4 py-6 sm:flex-row md:max-w-175 md:px-0">
        <span className="text-subtle text-center font-mono text-xs">
          © {new Date().getFullYear()} Noor Rizki Ramadhan
        </span>

        <div className="mb-2 flex items-center justify-center gap-2">
          {socialByIcon.github && (
            <a
              href={socialByIcon.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-foreground cursor-pointer text-center text-xs transition-colors"
            >
              Github
            </a>
          )}
          {socialByIcon.linkedin && (
            <a
              href={socialByIcon.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-foreground cursor-pointer text-center text-xs transition-colors"
            >
              LinkedIn
            </a>
          )}
          <a
            href={`mailto:${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-subtle hover:text-foreground cursor-pointer text-center text-xs transition-colors"
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  )
}
