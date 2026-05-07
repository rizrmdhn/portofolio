import { CertificateCard } from "@/components/certificate-card";
import { ExperienceCard } from "@/components/experience-card";
import { MainHeader } from "@/components/main-header";
import { ProjectCard } from "@/components/project-card";
import { TechStackList } from "@/components/tech-stack-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Certification } from "@portofolio/types/certification.types";
import { Experience } from "@portofolio/types/experience.types";
import { ProjectWithView } from "@portofolio/types/project.types";
import { TechStack } from "@portofolio/types/tech-stack.types";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const experiences: Experience[] = [
  {
    id: "01900000-0000-7000-8000-000000000001",
    title: "Fullstack Developer",
    company: "Tech Corp",
    location: "Jakarta, Indonesia",
    type: "full-time",
    startDate: "2023-01-01",
    endDate: null,
    currentlyWorking: true,
    description:
      "Built and maintained web applications using React, Node.js, and PostgreSQL. Led migrations to modern tooling and improved CI/CD pipelines.",
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker"],
    status: "published",
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
  {
    id: "01900000-0000-7000-8000-000000000002",
    title: "Frontend Developer",
    company: "Startup Studio",
    location: "Bandung, Indonesia",
    type: "contract",
    startDate: "2022-03-01",
    endDate: "2022-12-31",
    currentlyWorking: false,
    description:
      "Developed responsive UIs and collaborated closely with design and backend teams to ship product features on time.",
    skills: ["React", "Tailwind CSS", "Next.js", "Figma"],
    status: "published",
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
  {
    id: "01900000-0000-7000-8000-000000000003",
    title: "Backend Developer Intern",
    company: "Digital Agency",
    location: "Remote",
    type: "internship",
    startDate: "2021-07-01",
    endDate: "2021-12-31",
    currentlyWorking: false,
    description:
      "Assisted in designing REST APIs, writing unit tests, and optimizing database queries for a high-traffic e-commerce platform.",
    skills: ["Node.js", "Express", "MySQL", "Jest"],
    status: "published",
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
];

const projects: ProjectWithView[] = [
  {
    id: "01900000-0000-7000-8000-000000000011",
    title: "Portfolio",
    slug: "portfolio",
    description:
      "Personal portfolio and blog built with TanStack Start, tRPC, and Tailwind CSS.",
    longDescription: null,
    tech: ["TypeScript", "React", "tRPC", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/rizrmdhn/portofolio",
    liveUrl: "#",
    playstoreUrl: null,
    appstoreUrl: null,
    imageUrl: null,
    coverColor: "#6366f1",
    status: "published",
    isVisible: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
    projectView: {
      id: "01900000-0000-7000-8000-000000000101",
      projectId: "01900000-0000-7000-8000-000000000011",
      count: 1234,
    },
  },
  {
    id: "01900000-0000-7000-8000-000000000012",
    title: "SaaS Starter",
    slug: "saas-starter",
    description:
      "A full-stack SaaS boilerplate with authentication, billing, and real-time updates.",
    longDescription: null,
    tech: ["Next.js", "Prisma", "Stripe", "Redis", "TypeScript"],
    githubUrl: "https://github.com/rizrmdhn/saas-starter",
    liveUrl: null,
    playstoreUrl: null,
    appstoreUrl: null,
    imageUrl: null,
    coverColor: "#3b82f6",
    status: "published",
    isVisible: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
    projectView: {
      id: "01900000-0000-7000-8000-000000000102",
      projectId: "01900000-0000-7000-8000-00000000<PASSWORD>",
      count: 567,
    },
  },
  {
    id: "01900000-0000-7000-8000-000000000013",
    title: "Envault",
    slug: "envault",
    description:
      "Open-source CLI tool for managing and syncing environment variables across projects.",
    longDescription: null,
    tech: ["Node.js", "TypeScript", "SQLite"],
    githubUrl: "https://github.com/rizrmdhn/envault",
    liveUrl: null,
    playstoreUrl: null,
    appstoreUrl: null,
    imageUrl: null,
    coverColor: "#22c55e",
    status: "published",
    isVisible: true,
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
    projectView: {
      id: "01900000-0000-7000-8000-000000000103",
      projectId: "01900000-0000-7000-8000-000000000013",
      count: 890,
    },
  },
];

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

const certificates: Certification[] = [
  {
    id: "01900000-0000-7000-8000-000000000031",
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    certificateUrl: "https://aws.amazon.com/certification/",
    certificateId: "AWS-DEV-2024-001",
    issueYear: 2024,
    expiryYear: 2027,
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
  {
    id: "01900000-0000-7000-8000-000000000032",
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
    certificateUrl: "https://scrum.org/certificates",
    certificateId: "PSM-I-2023-042",
    issueYear: 2023,
    expiryYear: null,
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: null,
  },
  {
    id: "01900000-0000-7000-8000-000000000033",
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    certificateUrl: null,
    certificateId: "DCA-2023-789",
    issueYear: 2023,
    expiryYear: 2025,
    status: "published",
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
  return (
    <div className="flex flex-col bg-background text-foreground">
      <MainHeader />

      {/* Hero */}
      <section
        id="about"
        className="flex flex-col items-center justify-center gap-6 w-full pt-24 dot-grid"
      >
        <div className="w-full md:max-w-175 flex flex-col gap-6 border-b border-border self-stretch pb-24 mx-auto px-4 md:px-0">
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
            >
              Contact
            </Button>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="flex flex-col items-center justify-center gap-6 w-full pt-24"
      >
        <div className="w-full md:max-w-175 flex flex-col gap-8 justify-center mx-auto px-4 md:px-0">
          <SectionHeading>WORK EXPERIENCE</SectionHeading>
          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} experience={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="flex flex-col items-center justify-center gap-6 w-full py-24 bg-section-alt border-y"
      >
        <div className="w-full md:max-w-175 flex flex-col gap-8 justify-center mx-auto px-4 md:px-0">
          <SectionHeading>PROJECTS</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center gap-24 py-12">
        {/* Tech Stack */}
        <section
          id="stack"
          className="w-full md:max-w-175 flex flex-col gap-8 mx-auto px-4 md:px-0"
        >
          <SectionHeading>TECH STACK</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {stack.map((group) => (
              <TechStackList key={group.id} stack={group} />
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section
          id="certs"
          className="flex flex-col items-center justify-center gap-6 w-full py-24 bg-section-alt border-y"
        >
          <div className="w-full md:max-w-175 flex flex-col gap-8 justify-center mx-auto px-4 md:px-0">
            <SectionHeading>CERTIFICATES</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="w-full md:max-w-175 flex flex-col gap-8 mx-auto px-4 md:px-0"
        >
          <SectionHeading>CONTACT</SectionHeading>
          <div className="rounded-lg border border-border p-8 flex flex-col gap-6 items-start">
            <p className="text-subtle leading-relaxed max-w-lg">
              I'm open to freelance work, full-time roles, and interesting side
              projects. If you have something in mind, reach out.
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
