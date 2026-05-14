import { DEGREE_TYPE_LABELS } from '@portofolio/constants'
import type { ResumeData } from '@portofolio/queries/resume-data.queries'
import type { ResumeFont } from '@portofolio/types/resume.types'
import { Document, Link, Page, Text, View } from '@react-pdf/renderer'
import type React from 'react'
import { PAGE_MARGINS } from '../utils/page-styles'
import { tw } from '../utils/tw'

interface ATSTemplateProps {
  data: ResumeData
  accentColor: string
  font: ResumeFont
  summary?: string
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: string }) {
  const spaced = children.split('').join(' ')
  return (
    <View style={tw('mb-0.5 mt-1.5')}>
      <Text style={tw('text-[8.5px] font-bold tracking-[0.18em] uppercase mb-0.5')}>{spaced}</Text>
      <View style={{ height: 0.75, backgroundColor: '#000000' }} />
    </View>
  )
}

function Row({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <View style={tw('flex flex-row justify-between items-baseline')}>
      <View style={tw('flex-1')}>{left}</View>
      {right && <View style={tw('ml-2 shrink-0')}>{right}</View>}
    </View>
  )
}

function DateText({ children }: { children: React.ReactNode }) {
  return <Text style={tw('text-[8px] text-gray-600')}>{children}</Text>
}

function BulletItem({ children }: { children: string }) {
  return (
    <View style={tw('flex flex-row')}>
      <Text style={tw('text-[8.5px] mr-1.5 leading-snug')}>–</Text>
      <Text style={tw('text-[8.5px] leading-snug flex-1 text-gray-800')}>{children}</Text>
    </View>
  )
}

// ─── Template ─────────────────────────────────────────────────────────────────

export function ATSTemplate({ data, accentColor: _accentColor, font, summary }: ATSTemplateProps) {
  const {
    profile,
    experiences,
    certifications,
    education,
    achievements,
    featuredProjects,
    techStack,
    socialLinks,
  } = data

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  const formatYear = (dateStr: string) => new Date(dateStr).getFullYear().toString()

  return (
    <Document>
      <Page
        size="A4"
        style={[PAGE_MARGINS.atsCompact, tw('font-sans text-[9px] bg-white text-gray-900'), { fontFamily: font }]}
      >
        {/* ── Header ───────────────────────────────────────── */}
        <View style={tw('items-center mb-0.5')}>
          <Text style={tw('text-[18px] font-bold tracking-wide')}>{profile.name}</Text>
          <Text style={tw('text-[8px] tracking-[0.28em] text-gray-600 uppercase')}>
            {profile.title.split('').join(' ')}
          </Text>
          <Text style={tw('text-[8px] text-gray-600 mt-0.5')}>
            {profile.location ? `${profile.location} · ${profile.email}` : profile.email}
          </Text>
          {socialLinks.length > 0 && (
            <View style={tw('flex flex-row flex-wrap justify-center')}>
              {socialLinks.map((l, i) => (
                <View key={l.id} style={tw('flex flex-row')}>
                  {i > 0 && <Text style={tw('text-[8px] text-gray-600')}>{' · '}</Text>}
                  <Link src={l.url} style={tw('text-[8px] text-gray-600')}>
                    {l.url.replace(/^https?:\/\//, '')}
                  </Link>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ── Profile / Summary ────────────────────────────────── */}
        {(summary ?? profile.bio) && (
          <View>
            <SectionHeader>Profile</SectionHeader>
            <Text style={tw('text-[8.5px] leading-normal text-gray-800')}>{summary ?? profile.bio}</Text>
          </View>
        )}

        {/* ── Experience ────────────────────────────────────── */}
        {experiences.length > 0 && (
          <View>
            <SectionHeader>Experience</SectionHeader>
            {experiences.map((exp) => (
              <View key={exp.id} style={tw('mb-1')}>
                <Row
                  left={
                    <Text style={tw('text-[9px]')}>
                      <Text style={tw('font-bold')}>{exp.title}</Text>
                      <Text style={tw('text-gray-600 font-normal')}>
                        {', '}
                        {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                        {' · '}
                        {exp.company}
                      </Text>
                    </Text>
                  }
                  right={
                    <DateText>
                      {formatDate(exp.startDate)} —{' '}
                      {exp.currentlyWorking ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                    </DateText>
                  }
                />
                {exp.description
                  .split('\n')
                  .filter(Boolean)
                  .map((line, i) => (
                    <BulletItem key={i}>{line.replace(/^[-–]\s*/, '')}</BulletItem>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* ── Projects ──────────────────────────────────────── */}
        {featuredProjects.length > 0 && (
          <View>
            <SectionHeader>Projects</SectionHeader>
            <Text style={tw('text-[8px] italic text-gray-500 mb-0.5')}>
              Live demos &amp; source code at{' '}
              {socialLinks
                .find((l) => l.url.includes('portofolio'))
                ?.url.replace(/^https?:\/\//, '') ?? 'portfolio'}
            </Text>
            {featuredProjects.map((proj) => (
              <View key={proj.id} style={tw('mb-1')}>
                <Text style={tw('text-[9px]')}>
                  <Text style={tw('font-bold')}>{proj.title}</Text>
                  <Text style={tw('text-gray-500 italic')}>{' · '}{proj.tech.join(' · ')}</Text>
                </Text>
                {proj.description
                  .split('\n')
                  .filter(Boolean)
                  .map((line, i) => (
                    <BulletItem key={i}>{line.replace(/^[-–]\s*/, '')}</BulletItem>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* ── Education ─────────────────────────────────────── */}
        {education.length > 0 && (
          <View>
            <SectionHeader>Education</SectionHeader>
            {education.map((edu) => (
              <View key={edu.id} style={tw('mb-1')}>
                <Row
                  left={<Text style={tw('font-bold text-[9px]')}>{edu.institution}</Text>}
                  right={
                    <DateText>
                      {formatYear(edu.startYear)}
                      {edu.endYear ? ` — ${formatYear(edu.endYear)}` : ' — Present'}
                    </DateText>
                  }
                />
                <Text style={tw('text-[8.5px] text-gray-600')}>
                  {DEGREE_TYPE_LABELS[edu.degreeLevel]}
                  {', '}
                  {edu.major}
                  {edu.gpa ? ` · GPA ${edu.gpa}` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Achievements ──────────────────────────────────── */}
        {achievements.length > 0 && (
          <View>
            <SectionHeader>Achievements</SectionHeader>
            {achievements.map((ach) => (
              <View key={ach.id} style={tw('mb-1')}>
                <Row
                  left={
                    <Text style={tw('text-[9px]')}>
                      <Text style={tw('font-bold')}>{ach.title}</Text>
                      <Text style={tw('text-gray-600 font-normal')}>{' · '}{ach.issuer}</Text>
                    </Text>
                  }
                  right={<DateText>{formatDate(ach.date)}</DateText>}
                />
                {ach.description && (
                  <Text style={tw('text-[8.5px] text-gray-600')}>{ach.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* ── Certifications ────────────────────────────────── */}
        {certifications.length > 0 && (
          <View>
            <SectionHeader>Certifications</SectionHeader>
            {certifications.map((cert) => (
              <View key={cert.id} style={tw('mb-1')}>
                <Row
                  left={<Text style={tw('font-bold text-[9px]')}>{cert.title}</Text>}
                  right={
                    <DateText>
                      {formatYear(cert.issueYear)}
                      {cert.expiryYear ? ` — ${formatYear(cert.expiryYear)}` : ''}
                    </DateText>
                  }
                />
                <Text style={tw('text-[8.5px] text-gray-600')}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Skills ────────────────────────────────────────── */}
        {techStack.length > 0 && (
          <View>
            <SectionHeader>Skills</SectionHeader>
            {techStack.map((cat) => (
              <View key={cat.id} style={tw('flex flex-row mb-0.5')}>
                <Text style={tw('font-bold text-[8.5px] w-24 uppercase tracking-wide')}>
                  {cat.name}
                </Text>
                <Text style={tw('text-[8.5px] flex-1 text-gray-800')}>
                  {cat.items.map((i) => i.name).join(', ')}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
