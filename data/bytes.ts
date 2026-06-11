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
    id: 'key-features',
    title: 'Key features of Rust',
    concept: 'Rust Handbook · Ch 1',
    file: 'key_features.rs',
    code: `// The handbook names four things that make Rust stand out.
// So let's pattern-match on them, the book's own example of expressiveness.
enum Feature {
    Expressiveness,
    MemorySafety,
    Concurrency,
    Performance,
}

fn describe(f: Feature) -> &'static str {
    match f {
        Feature::Expressiveness => "clear code, strong types, pattern matching",
        Feature::MemorySafety => "compile-time checks, no null, no GC",
        Feature::Concurrency => "fearless threads, async/await, no data races",
        Feature::Performance => "C and C++ speed, zero-cost abstractions",
    }
}

fn main() {
    for f in [
        Feature::Expressiveness,
        Feature::MemorySafety,
        Feature::Concurrency,
        Feature::Performance,
    ] {
        println!("{}", describe(f));
    }
}`,
    takeaway:
      'The four pillars the handbook highlights: expressive syntax and types, compile-time memory safety, fearless concurrency, and C-level performance, with no garbage collector and no runtime overhead.',
    tags: ['features', 'overview', 'beginner'],
  },
  {
    id: 'static-data-types',
    title: 'Static data types',
    concept: 'Static Typing · Scalars',
    file: 'data_types.rs',
    code: `fn main() {
    // Rust is statically typed: every type is known at compile time.
    let count: i32 = 42;     // signed 32-bit integer (the default)
    let ratio: f64 = 3.14;   // 64-bit floating point
    let active: bool = true; // boolean
    let grade: char = 'A';   // Unicode scalar value, 4 bytes

    // Annotations are usually optional; the compiler infers the type:
    let inferred = 7u8;      // u8, taken from the suffix

    println!("{count} {ratio} {active} {grade} {inferred}");

    // A type mismatch is caught before the program ever runs:
    // let wrong: i32 = "nope"; // error[E0308]: mismatched types
}`,
    takeaway:
      'Rust fixes the type of every value at compile time. The scalar types are integers, floats, bool, and char, with inference filling in the obvious cases and mismatches rejected before runtime.',
    tags: ['types', 'static-typing', 'beginner'],
  },
  {
    id: 'str-type',
    title: 'The &str type',
    concept: 'Strings · &str',
    file: 'str_type.rs',
    code: `fn main() {
    // A string literal is a &str: a borrowed, immutable view into UTF-8 bytes.
    let greeting: &str = "hello, rust";

    // Borrow a &str slice out of an owned String:
    let owned = String::from("hello, world");
    let hello: &str = &owned[0..5]; // "hello"

    // first_word takes &str, so it accepts a literal and a &String alike:
    println!("{hello}");
    println!("{}", first_word(greeting));
    println!("{}", first_word(&owned));
}

// Borrow in, borrow out: no allocation, no ownership taken.
fn first_word(s: &str) -> &str {
    match s.find(' ') {
        Some(i) => &s[..i],
        None => s,
    }
}`,
    takeaway:
      'A &str is a borrowed, immutable view into UTF-8 text: a pointer plus a length. String literals are &str, you can slice one out of a String, and taking &str in function signatures lets them accept both.',
    tags: ['strings', 'slices', 'borrowing'],
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
