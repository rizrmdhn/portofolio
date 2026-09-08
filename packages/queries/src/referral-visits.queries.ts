import type { ReferralSource } from '@portofolio/constants'
import { db } from '@portofolio/db/client'
import { referralVisits } from '@portofolio/db/schema/index'

export async function recordReferralVisit(referral: ReferralSource): Promise<void> {
  await db.insert(referralVisits).values({ referral })
}
