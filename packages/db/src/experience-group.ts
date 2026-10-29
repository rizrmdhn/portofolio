/** Company identity is exact and case-sensitive after trimming outer whitespace.
 * Membership is always explicit; this never derives a group from a company name.
 */
export function experienceGroupIssue(
  groupId: string | null | undefined,
  company: string,
  group: { company: string } | undefined,
): 'missing' | 'company' | undefined {
  if (!groupId) return undefined
  if (!group) return 'missing'
  if (group.company.trim() !== company.trim()) return 'company'
  return undefined
}
