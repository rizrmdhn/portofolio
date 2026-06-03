import { db } from '@portofolio/db/client'
import { viewEvents } from '@portofolio/db/schema/index'
import { UAParser } from 'ua-parser-js'
import { getProjectById } from './project.queries'

/**
 * Parse a request User-Agent into the dimensions the dashboard charts.
 * `deviceType` is normalised to mobile/tablet/desktop — ua-parser leaves
 * `device.type` undefined for desktops, so we treat the absence as desktop.
 */
function parseUserAgent(userAgent: string | null) {
  if (!userAgent) {
    return { deviceType: null, browser: null, os: null }
  }

  const ua = new UAParser(userAgent)

  return {
    deviceType: ua.getDevice().type ?? 'desktop',
    browser: ua.getBrowser().name ?? null,
    os: ua.getOS().name ?? null,
  }
}

export async function incrementViews(
  projectId: string,
  userAgent: string | null = null,
): Promise<void> {
  await getProjectById(projectId)

  await db.insert(viewEvents).values({ projectId, ...parseUserAgent(userAgent) })
}
