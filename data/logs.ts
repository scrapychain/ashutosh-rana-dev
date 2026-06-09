// ---------------------------------------------------------------------------
// CORPORATE LOG
// Short, pragmatic notes from 4 years of corporate software engineering.
// Blank slate: empty this array to start fresh.
// ---------------------------------------------------------------------------

export interface CorporateLog {
  id: string
  title: string
  /** ISO date, e.g. "2026-06-08". */
  date: string
  /** Body paragraphs, rendered one block per entry. */
  body: string[]
  /** Optional ordered checklist / playbook, rendered as a numbered list. */
  steps?: string[]
  /** The blunt, reusable lesson. */
  lesson: string
  tags: string[]
}

export const logs: CorporateLog[] = [
  {
    id: 'feature-delivery-playbook',
    title: 'How I ship a feature without surprises',
    date: '2026-06-09',
    body: [
      'The workflow I run for every non-trivial feature. It looks like a lot, but most of it is cheap up front and saves you from expensive rework, broken builds, and "what was this dev even thinking" later.',
    ],
    steps: [
      'Gather all the requirements for the feature.',
      'Understand them properly, and ask the product owner the moment anything is ambiguous.',
      'Agree on a clear Definition of Done and acceptance criteria before you start.',
      'Break the feature into small user stories.',
      'Break each story into sub-tasks small enough to work on independently.',
      'Design a solution for each story and task before writing code.',
      'Document your proposed design so the next developer can follow your thinking.',
      'Write down every test scenario, including the edge cases you are tempted to skip.',
      'Create a git branch per user story. Never push straight to main.',
      'Now code: keep it modular so you can reuse it later.',
      'Follow the team coding standards and run a linter.',
      'Write useful comments that explain the why, not the what.',
      'Test continuously, and add automated tests, not just manual checks.',
      'Make sure you do not break existing behavior as you go.',
      'Commit small (under ~100 lines) with clear, descriptive messages.',
      'Open a pull request and get it reviewed before merging.',
      'Let CI run the build, lint, and tests on every push.',
      'Periodically re-check your work against the original requirements.',
      'Keep the PO, PM, and your teammates in the loop, and flag blockers early.',
      'Reflect at the end and carry the lessons into the next feature.',
    ],
    lesson:
      'Process is not bureaucracy. It is how you ship complex work predictably and hand it off cleanly when someone else takes over.',
    tags: ['process', 'workflow', 'teamwork'],
  },
]
