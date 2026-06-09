// ---------------------------------------------------------------------------
// CORPORATE LOG
// Short, pragmatic notes from 4 years of corporate software engineering.
// Blank slate: this array is empty. Add a CorporateLog object to publish one.
// ---------------------------------------------------------------------------

export interface CorporateLog {
  id: string
  title: string
  /** ISO date, e.g. "2026-06-08". */
  date: string
  /** Body paragraphs, rendered one block per entry. */
  body: string[]
  /** The blunt, reusable lesson. */
  lesson: string
  tags: string[]
}

export const logs: CorporateLog[] = []
