import { CertificateCard } from "@/components/certificate-card";
import { ExperienceCard } from "@/components/experience-card";
import { FadeIn } from "@/components/fade-in";
import { MainHeader } from "@/components/main-header";
import { ProjectCard } from "@/components/project-card";
import { TechStackList } from "@/components/tech-stack-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechStack } from "@portofolio/types/tech-stack.types";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const projects = await context.queryClient.ensureQueryData(
      context.trpc.project.getForLandingPage.queryOptions(),
    );

    const experiences = await context.queryClient.ensureQueryData(
      context.trpc.experience.getAll.queryOptions(),
    );

    const certifications = await context.queryClient.ensureQueryData(
      context.trpc.certification.getForLandingPage.queryOptions(),
    );

    return { projects, experiences, certifications };
  },
  component: HomeComponent,
});

const stack: TechStack[] = [
  {
    id: "01900000-0000-7000-8000-000000000021",
    name: "Languages",
    list: ["TypeScript", "Go", "SQL"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
  {
    id: "01900000-0000-7000-8000-000000000022",
    name: "Frontend",
    list: ["React", "Tailwind CSS", "TanStack Router"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
  {
    id: "01900000-0000-7000-8000-000000000023",
    name: "Backend",
    list: ["Node.js", "tRPC", "Hono"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
  {
    id: "01900000-0000-7000-8000-000000000024",
    name: "Database",
    list: ["PostgreSQL", "Redis", "Drizzle ORM"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
  {
    id: "01900000-0000-7000-8000-000000000025",
    name: "DevOps",
    list: ["Docker", "GitHub Actions", "Fly.io"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm text-subtle tracking-[0.15em] font-mono">
      {children}
    </h2>
  );
}

function HomeComponent() {
  const navigate = Route.useNavigate();

  const {
    projects: { data: featured, isMore },
    experiences,
    certifications: { data: certificates, isMore: isMoreCerts },
  } = Route.useLoaderData();

  return (
    <div className="flex flex-col bg-background text-foreground">
      <MainHeader />

      {/* Hero */}
      <section
        id="about"
        className="flex flex-col items-center justify-center gap-6 w-full pt-24 dot-grid scroll-mt-14"
      >
        <FadeIn className="w-full md:max-w-175 flex flex-col gap-6 border-b border-border self-stretch pb-24 mx-auto px-4 md:px-0">
          <Badge
            variant="outline"
            className="w-fit py-3 px-3.5 bg-available text-available-foreground border border-available-foreground/20 text-xs font-medium"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            Available for opportunities
          </Badge>
          <h1 className="text-[32px] sm:text-[44px] md:text-[54px] font-extrabold leading-[1.05] text-foreground">
            Noor Rizki Ramadhan
          </h1>
          <p className="text-[18px] text-start max-w-2xl text-muted-foreground">
            Fullstack Developer
          </p>
          <p className="text-[15px] text-start max-w-2xl text-muted-foreground leading-[1.75]">
            I build fast, scalable web applications with clean architecture.
            Focused on developer experience, performance, and shipping things
            that actually work.
          </p>
          {/* Social */}
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" size="lg" onClick={() => {}}>
              <span className="flex items-center gap-1 text-sm text-subtle font-medium">
                <IconBrandGithub className="size-4" />
                GitHub
              </span>
            </Button>
            <Button variant="outline" size="lg" onClick={() => {}}>
              <span className="flex items-center gap-1 text-sm text-subtle font-medium">
                <IconBrandLinkedin className="size-4" />
                LinkedIn
              </span>
            </Button>
            <Button variant="outline" size="lg" onClick={() => {}}>
              <span className="flex items-center gap-1 text-sm text-subtle font-medium">
                <IconMail className="size-4" />
                Email
              </span>
            </Button>
          </div>
          <div className="flex gap-3">
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
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
        className="flex flex-col items-center justify-center gap-6 w-full pt-24 scroll-mt-14"
      >
        <FadeIn className="w-full md:max-w-175 flex flex-col gap-8 justify-center mx-auto px-4 md:px-0">
          <SectionHeading>WORK EXPERIENCE</SectionHeading>
          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} experience={exp} />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="flex flex-col items-center justify-center gap-6 w-full py-24 bg-section-alt border-y scroll-mt-14"
      >
        <FadeIn className="w-full md:max-w-175 flex flex-col gap-8 justify-center mx-auto px-4 md:px-0">
          <SectionHeading>PROJECTS</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {isMore && (
            <Button
              onClick={() => navigate({ to: "/projects" })}
              variant="outline"
              size="lg"
            >
              View all projects
            </Button>
          )}
        </FadeIn>
      </section>

      <div className="flex flex-col items-center justify-center gap-24 py-12">
        {/* Tech Stack */}
        <section
          id="stack"
          className="w-full md:max-w-175 flex flex-col gap-8 mx-auto px-4 md:px-0 scroll-mt-26"
        >
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading>TECH STACK</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {stack.map((group) => (
                <TechStackList key={group.id} stack={group} />
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Certificates */}
        <section
          id="certs"
          className="flex flex-col items-center justify-center gap-6 w-full py-24 bg-section-alt border-y scroll-mt-14"
        >
          <FadeIn className="w-full md:max-w-175 flex flex-col gap-8 justify-center mx-auto px-4 md:px-0">
            <SectionHeading>CERTIFICATES</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
            {isMoreCerts && (
              <Button
                onClick={() => navigate({ to: "/certificates" })}
                variant="outline"
                size="lg"
              >
                View all certificates
              </Button>
            )}
          </FadeIn>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="w-full md:max-w-175 flex flex-col gap-8 mx-auto px-4 md:px-0 scroll-mt-14"
        >
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading>CONTACT</SectionHeading>
            <div className="rounded-lg border border-border p-8 flex flex-col gap-6 items-start">
              <p className="text-subtle leading-relaxed max-w-lg">
                I'm open to freelance work, full-time roles, and interesting
                side projects. If you have something in mind, reach out.
              </p>
              <div className="flex flex-col gap-3 font-mono text-sm">
                <a
                  href="mailto:rizrmdhn.unity@gmail.com"
                  className="text-subtle hover:text-foreground transition-colors"
                >
                  rizrmdhn.unity@gmail.com ↗
                </a>
                <a
                  href="https://github.com/rizrmdhn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-subtle hover:text-foreground transition-colors"
                >
                  github.com/rizrmdhn ↗
                </a>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      <footer className="border-t border-border py-6 w-full md:max-w-175 mx-auto flex flex-col sm:flex-row justify-between gap-2 px-4 md:px-0">
        <span className="text-center text-xs text-subtle font-mono">
          © {new Date().getFullYear()} Noor Rizki Ramadhan
        </span>

        <div className="flex items-center justify-center gap-2 mb-2">
          <a className="text-center text-xs text-subtle cursor-pointer hover:text-foreground transition-colors">
            Github
          </a>
          <a className="text-center text-xs text-subtle cursor-pointer hover:text-foreground transition-colors">
            LinkedIn
          </a>
          <a className="text-center text-xs text-subtle cursor-pointer hover:text-foreground transition-colors">
            Email
          </a>
        </div>
      </footer>
    </div>
  );
}
