# Archive

Snapshot of the previous "ScrapyChain / 5-year mission" version of the site,
kept for reference after the 2026 rebrand to the **Rust Bytes + Corporate Log** format.

Nothing in this folder is imported by the live app.

## Contents

- `content-posts/`: all original markdown build-log entries (Rust deep-dives,
  blockchain explainers, personal logs). Reusable as source material for new
  Rust Bytes / Corporate Log entries.
- `components/`: dashboard-era components that no longer fit the simplified layout:
  - `ProjectHighlight.tsx`: ScrapyChain feature checklist
  - `SkillsMatrix.tsx`: skill % bars
  - `ProgressBar.tsx`: used by the mission/skills telemetry
  - `ManifestoCTA.tsx`: "Master Rust. Build Blockchain." banner
  - `LogList.tsx`: old category-filtered post list
  - `CategoryBadge.tsx`: rust/blockchain/personal badge
  - `SocialCard.tsx`: old social link cards

To restore any piece, move it back and re-wire its imports in `app/HomeClient.tsx`.
