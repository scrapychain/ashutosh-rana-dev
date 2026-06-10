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
    id: 'code-is-the-easy-part',
    title: 'The thing nobody tells you when you become a software engineer',
    date: '2026-06-09',
    body: [
      'When I graduated, I thought software engineering was mostly about writing clean code, knowing algorithms, and understanding frameworks.',
      'Then I started working on real projects, especially cross-domain integrations. That is when I realized: code is often the easiest part.',
    ],
    steps: [
      'Understand the business domain before you write a single line of code.',
      'Learn what problem the system is actually solving.',
      'Understand who uses the system and what happens when it fails.',
      'Identify all the teams, services, databases, and APIs involved.',
      'Never assume two systems represent the same information in the same way.',
      'Question every field, every state, and every business rule.',
      'Learn the historical reasons behind strange design decisions.',
      'Talk to senior engineers because they carry years of production context.',
      'Read old tickets, incident reports, and architecture documents.',
      'Map out the happy path before you think about edge cases.',
      'Then spend twice as much time thinking about the edge cases.',
      'Ask yourself: "What happens if this service is down?"',
      'Ask yourself: "What happens if this data is missing, delayed, or incorrect?"',
      'Understand deployment cycles, dependencies, and operational constraints.',
      'Write code that respects the complexity of the environment around it.',
      'Communicate often because assumptions between teams are where many failures begin.',
      'Document your decisions so the next engineer understands the why.',
      'Remember that production systems are built by many teams over many years.',
      'Accept that becoming effective takes time because you are learning a domain, not just a codebase.',
    ],
    lesson:
      'Senior engineers usually are not faster because they know more programming tricks. They are faster because they understand the domain: which assumptions are dangerous, where the systems are fragile, and the business impact of a small technical decision. Software engineering is not just teaching computers what to do; it is understanding the complex human systems behind them.',
    tags: ['career', 'domain', 'integration'],
  },
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
