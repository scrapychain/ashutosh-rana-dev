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
]
