// ---------------------------------------------------------------------------
// RUST BYTES
// Bite-sized snippets + one concept each, straight from the Rust handbook.
// Blank slate: empty this array to start fresh. Samples below show the shape.
// ---------------------------------------------------------------------------

export interface RustByte {
  id: string
  /** Short, scannable title. */
  title: string
  /** Where it comes from / the concept tag, e.g. "Ownership · Book 4.1". */
  concept: string
  /** Pseudo-filename shown in the terminal chrome. */
  file: string
  /** The snippet. Keep it short and self-contained. */
  code: string
  /** One line: the thing to actually remember. */
  takeaway: string
  tags: string[]
}

export const bytes: RustByte[] = [
  {
    id: 'what-is-rust',
    title: 'What is Rust?',
    concept: 'Getting Started · Book 1',
    file: 'what_is_rust.rs',
    code: `fn main() {
    // Rust is a systems language.
    // Fast like C, memory-safe by default.
    let language = "Rust";

    // No garbage collector.
    // Safety is checked at compile time, not runtime.
    println!("Hello from {language}");
}`,
    takeaway:
      'Rust gives you C-level performance with compile-time guarantees against whole classes of memory and concurrency bugs.',
    tags: ['intro', 'overview', 'beginner'],
  },
  {
    id: 'where-rust-is-used',
    title: 'Where is Rust used in industry?',
    concept: 'Ecosystem · Industry Use',
    file: 'where_rust_runs.rs',
    code: `// Production Rust, grouped by where it ships:
const RUST_IN_PROD: &[(&str, &str)] = &[
    ("Systems", "Linux, Android, Windows"),
    ("Cloud", "AWS Firecracker, Cloudflare"),
    ("Databases", "TiKV, Materialize"),
    ("Web backend", "Discord, Dropbox, npm"),
    ("Blockchain", "Solana, Polkadot"),
    ("CLI tools", "ripgrep, fd, bat"),
];

fn main() {
    for (domain, who) in RUST_IN_PROD {
        println!("{domain}: {who}");
    }
}`,
    takeaway:
      'From kernels to cloud to CLIs, Rust shows up wherever speed and reliability both matter without a garbage collector.',
    tags: ['industry', 'ecosystem', 'overview'],
  },
]
