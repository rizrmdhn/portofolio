import { Document, Link, Page, Text, View } from "@react-pdf/renderer";
import type { ResumeData } from "@portofolio/queries/resume-data.queries";
import type { ResumeFont } from "@portofolio/types/resume.types";
import { tw } from "../utils/tw";

interface CreativeTemplateProps {
  data: ResumeData;
  accentColor: string;
  font: ResumeFont;
  summary?: string;
}

export function CreativeTemplate({ data, accentColor, font, summary }: CreativeTemplateProps) {
  const {
    profile,
    experiences,
    certifications,
    featuredProjects,
    techStack,
    socialLinks,
  } = data;

  const sidebarText = "#ffffff";
  const sidebarMuted = "rgba(255,255,255,0.70)";

  return (
    <Document>
      <Page size="A4" style={[tw("flex-row font-sans text-[9.5px] bg-white"), { fontFamily: font }]}>
        {/* ── Left Sidebar ──────────────────────────────────── */}
        <View
          style={{
            ...tw("w-44 px-5 py-8 flex flex-col gap-4"),
            backgroundColor: accentColor,
          }}
        >
          {/* Name + title */}
          <View>
            <Text
              style={{
                ...tw("text-base font-bold leading-tight"),
                color: sidebarText,
              }}
            >
              {profile.name}
            </Text>
            <Text
              style={{
                ...tw("text-[8.5px] mt-1"),
                color: sidebarMuted,
              }}
            >
              {profile.title}
            </Text>
          </View>

          {/* Contact */}
          <View>
            <Text
              style={{
                ...tw("text-[7.5px] font-bold uppercase tracking-widest mb-1.5"),
                color: sidebarMuted,
              }}
            >
              Contact
            </Text>
            <Text style={{ ...tw("text-[8.5px] mb-0.5"), color: sidebarText }}>
              {profile.email}
            </Text>
            {socialLinks.map((link) => (
              <Link
                key={link.id}
                src={link.url}
                style={{ ...tw("text-[8px] mb-0.5"), color: sidebarText }}
              >
                {link.title}
              </Link>
            ))}
          </View>

          {/* Skills */}
          {techStack.length > 0 && (
            <View>
              <Text
                style={{
                  ...tw("text-[7.5px] font-bold uppercase tracking-widest mb-1.5"),
                  color: sidebarMuted,
                }}
              >
                Skills
              </Text>
              {techStack.map((cat) => (
                <View key={cat.id} style={tw("mb-2")}>
                  <Text
                    style={{ ...tw("font-bold text-[8.5px] mb-0.5"), color: sidebarText }}
                  >
                    {cat.name}
                  </Text>
                  <Text style={{ ...tw("text-[8px] leading-relaxed"), color: sidebarMuted }}>
                    {cat.items.map((i) => i.name).join(" · ")}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <View>
              <Text
                style={{
                  ...tw("text-[7.5px] font-bold uppercase tracking-widest mb-1.5"),
                  color: sidebarMuted,
                }}
              >
                Certifications
              </Text>
              {certifications.map((cert) => (
                <View key={cert.id} style={tw("mb-2")}>
                  <Text
                    style={{ ...tw("font-bold text-[8.5px]"), color: sidebarText }}
                  >
                    {cert.title}
                  </Text>
                  <Text style={{ ...tw("text-[8px]"), color: sidebarMuted }}>
                    {cert.issuer} · {new Date(cert.issueYear).getFullYear()}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ── Main Content ──────────────────────────────────── */}
        <View style={tw("flex-1 px-6 py-8 flex flex-col gap-4")}>
          {/* Summary */}
          {(summary ?? profile.bio) && (
            <View>
              <Text
                style={{
                  ...tw("text-[8px] font-bold uppercase tracking-widest mb-1.5"),
                  color: accentColor,
                }}
              >
                Profile
              </Text>
              <View
                style={{ height: 1, backgroundColor: accentColor, opacity: 0.3, marginBottom: 6 }}
              />
              <Text style={tw("text-[9px] text-gray-700 leading-relaxed")}>
                {summary ?? profile.bio}
              </Text>
            </View>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <View>
              <Text
                style={{
                  ...tw("text-[8px] font-bold uppercase tracking-widest mb-1.5"),
                  color: accentColor,
                }}
              >
                Experience
              </Text>
              <View
                style={{ height: 1, backgroundColor: accentColor, opacity: 0.3, marginBottom: 6 }}
              />
              {experiences.map((exp) => (
                <View key={exp.id} style={tw("mb-3")}>
                  <View style={tw("flex flex-row justify-between items-baseline")}>
                    <Text style={tw("font-bold text-[9.5px]")}>{exp.title}</Text>
                    <Text style={tw("text-[8px] text-gray-400")}>
                      {exp.startDate} –{" "}
                      {exp.currentlyWorking ? "Present" : (exp.endDate ?? "")}
                    </Text>
                  </View>
                  <Text style={{ ...tw("text-[8.5px] mb-1"), color: accentColor }}>
                    {exp.company} · {exp.location}
                  </Text>
                  <Text style={tw("text-[9px] text-gray-700 leading-relaxed")}>
                    {exp.description}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {featuredProjects.length > 0 && (
            <View>
              <Text
                style={{
                  ...tw("text-[8px] font-bold uppercase tracking-widest mb-1.5"),
                  color: accentColor,
                }}
              >
                Projects
              </Text>
              <View
                style={{ height: 1, backgroundColor: accentColor, opacity: 0.3, marginBottom: 6 }}
              />
              {featuredProjects.map((proj) => (
                <View key={proj.id} style={tw("mb-2")}>
                  <View style={tw("flex flex-row justify-between items-baseline")}>
                    <Text style={tw("font-bold text-[9.5px]")}>{proj.title}</Text>
                    {proj.liveUrl && (
                      <Link
                        src={proj.liveUrl}
                        style={{ ...tw("text-[8px]"), color: accentColor }}
                      >
                        View
                      </Link>
                    )}
                    {proj.githubUrl && !proj.liveUrl && (
                      <Link
                        src={proj.githubUrl}
                        style={{ ...tw("text-[8px]"), color: accentColor }}
                      >
                        GitHub
                      </Link>
                    )}
                  </View>
                  <Text style={tw("text-[9px] text-gray-700")}>{proj.description}</Text>
                  <Text style={tw("text-[8.5px] text-gray-500 mt-0.5")}>
                    {proj.tech.join(" · ")}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
