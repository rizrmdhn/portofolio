import { MainHeader } from "@/components/main-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const experiences = [
  {
    role: "Fullstack Developer",
    company: "Company Name",
    period: "2023 – Present",
    description:
      "Built and maintained web applications using React, Node.js, and PostgreSQL. Led migrations to modern tooling and improved CI/CD pipelines.",
  },
  {
    role: "Frontend Developer",
    company: "Another Company",
    period: "2022 – 2023",
    description:
      "Developed responsive UIs and collaborated closely with design and backend teams to ship product features on time.",
  },
];

const projects = [
  {
    name: "Portfolio",
    description:
      "Personal portfolio and blog built with TanStack Start, tRPC, and Tailwind CSS.",
    stack: ["TypeScript", "React", "tRPC", "PostgreSQL"],
    url: "#",
  },
  {
    name: "Project Two",
    description:
      "A full-stack SaaS application with authentication, billing, and real-time updates.",
    stack: ["Next.js", "Prisma", "Stripe", "Redis"],
    url: "#",
  },
  {
    name: "Project Three",
    description:
      "Open-source CLI tool for managing environment variables across projects.",
    stack: ["Node.js", "TypeScript"],
    url: "#",
  },
];

const stack = [
  { category: "Languages", items: ["TypeScript", "Go", "SQL"] },
  { category: "Frontend", items: ["React", "Tailwind CSS", "TanStack Router"] },
  { category: "Backend", items: ["Node.js", "tRPC", "Hono"] },
  { category: "Database", items: ["PostgreSQL", "Redis", "Drizzle ORM"] },
  { category: "DevOps", items: ["Docker", "GitHub Actions", "Fly.io"] },
];

const certificates = [
  {
    name: "Certificate Name",
    issuer: "Issuing Organization",
    year: "2024",
    url: "#",
  },
  {
    name: "Another Certificate",
    issuer: "Issuing Organization",
    year: "2023",
    url: "#",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
  );
}

function HomeComponent() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      <MainHeader />

      {/* Hero */}
      <section
        id="about"
        className="flex flex-col items-center justify-center gap-6 w-full py-24 dot-grid"
      >
        <div className="max-w-175 flex flex-col gap-6">
          <Badge
            variant="outline"
            className="w-fit py-3 bg-available text-available-foreground"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            <span className="text-sm">Available for opportunities</span>
          </Badge>
          <h1 className="text-5xl font-bold">Noor Rizki Ramadhan</h1>
          <p className="text-2xl text-start max-w-2xl text-subtle">
            Fullstack Developer
          </p>
          <p className="text-lg text-start max-w-2xl text-subtle">
            I build fast, scalable web applications with clean architecture.
            Focused on developer experience, performance, and shipping things
            that actually work.
          </p>
          <div className="flex gap-3">
            <Button size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-24 pb-24">
        {/* Experience */}
        <section id="experience" className="w-full max-w-175 flex flex-col gap-8">
          <SectionHeading>Experience</SectionHeading>
          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg border border-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{exp.role}</p>
                    <p className="text-sm text-subtle">{exp.company}</p>
                  </div>
                  <span className="text-sm text-subtle shrink-0 font-mono">{exp.period}</span>
                </div>
                <Separator />
                <p className="text-sm text-subtle leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="w-full max-w-175 flex flex-col gap-8">
          <SectionHeading>Projects</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 rounded-lg border border-border p-5 hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{project.name}</p>
                  <span className="text-subtle text-sm">↗</span>
                </div>
                <p className="text-sm text-subtle leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs font-mono">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section id="stack" className="w-full max-w-175 flex flex-col gap-8">
          <SectionHeading>Tech Stack</SectionHeading>
          <div className="flex flex-col gap-4">
            {stack.map((group) => (
              <div key={group.category} className="flex gap-4 items-start">
                <span className="text-sm text-subtle w-24 shrink-0 pt-0.5 font-mono">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline" className="font-mono">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section id="certs" className="w-full max-w-175 flex flex-col gap-8">
          <SectionHeading>Certificates</SectionHeading>
          <div className="flex flex-col gap-3">
            {certificates.map((cert) => (
              <a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-subtle">{cert.issuer}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-subtle font-mono">{cert.year}</span>
                  <span className="text-subtle text-sm">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="w-full max-w-175 flex flex-col gap-8">
          <SectionHeading>Contact</SectionHeading>
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
        </section>
      </div>

      <footer className="border-t border-border py-6 text-center text-sm text-subtle font-mono">
        © {new Date().getFullYear()} Noor Rizki Ramadhan
      </footer>
    </div>
  );
}
