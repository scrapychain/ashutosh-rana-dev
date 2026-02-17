---
slug: day-17-rust-hash-function
title: "Day 17: Implementing a Hash Function in Rust"
date: 2026-02-10
readTime: 10 min
category: rust
tags:
  - rust
  - blockchain
  - hashing
  - cryptography
  - testing
  - sha256
excerpt: "Build a SHA-256 hash function with tests. Learn why we use the sha2 crate, how to integrate external dependencies, and the Rust concepts that make it work."
---

# Implementing a Hash Function in Rust

Hashing is fundamental to blockchain. Every block is secured by its hash. Every transaction is identified by its hash.

Today, we're implementing a real hash function and testing it. This is where ScrapyChain starts to feel like actual blockchain code.

## Why We Need Hashing

A hash function takes any input and produces a fixed-size output (the hash). Key properties:

1. **Deterministic** - Same input always produces same output
2. **One-way** - Can't reverse a hash to get the input
3. **Avalanche effect** - Tiny input change = completely different hash
4. **Fast** - Computing the hash is quick
5. **Unique** - Different inputs almost never produce the same hash (collision resistance)

SHA-256 (Secure Hash Algorithm 256-bit) is the gold standard. Bitcoin uses it. Ethereum uses it. We use it.

## The Code

```rust
use sha2::{Digest, Sha256};

pub fn hash(data: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(data);
    format!("{:x}", hasher.finalize())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hash_hello() {
        let result = hash("hello");
        assert_eq!(
            result,
            "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
        );
    }

    #[test]
    fn test_empty() {
        let result = hash("");
        assert_eq!(
            result,
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        );
    }
}
```

## Breaking Down the Code

### The Function Signature

```rust
pub fn hash(data: &str) -> String {
```

**Rust Concepts Demonstrated:**

- **`pub`** - Makes the function public (accessible from other modules)
- **`&str`** - Reference to a string slice (borrowed, not owned)
- **`-> String`** - Returns an owned String (the hex hash)

Why `&str` and not `String`? Because we don't need to own the data. We just need to read it. Borrowing is more efficient.

### Creating the Hasher

```rust
let mut hasher = Sha256::new();
```

**Rust Concepts Demonstrated:**

- **`mut`** - The hasher is mutable (we'll modify it)
- **`Sha256::new()`** - Associated function (called with `::`). Creates a new hasher.

Sha256 is a type from the `sha2` crate. We create an instance using `new()`.

### Updating the Hasher

```rust
hasher.update(data);
```

**Rust Concepts Demonstrated:**

- **Method call** - `.update()` is a method on the hasher
- **Passing reference** - We pass `data` (which is already `&str`), no dereferencing needed
- **Mutation** - This mutates `hasher` internally

The `update()` method feeds data into the hasher. You can call it multiple times to hash multiple pieces of data.

### Finalizing and Formatting

```rust
format!("{:x}", hasher.finalize())
```

**Rust Concepts Demonstrated:**

- **`finalize()`** - Method that consumes the hasher and returns the hash
- **`{:x}`** - Format specifier for lowercase hexadecimal
- **`format!()`** - Macro that creates a formatted String

`finalize()` returns a byte array. `{:x}` converts it to hex string (which is what we want).

### Test Attribute

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hash_hello() {
        // ...
    }
}
```

**Rust Concepts Demonstrated:**

- **`#[cfg(test)]`** - Attribute: compile this module only during testing
- **`mod tests`** - A module inside our file
- **`use super::*`** - Import everything from parent module (the `hash` function)
- **`#[test]`** - Marks this function as a test (runs with `cargo test`)

Tests are compiled separately. They don't ship with your binary.

### Test Assertions

```rust
#[test]
fn test_hash_hello() {
    let result = hash("hello");
    assert_eq!(
        result,
        "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
}
```

**Rust Concepts Demonstrated:**

- **`assert_eq!(left, right)`** - Macro that panics if they're not equal
- **String literals** - The expected hash is hardcoded

When you run `cargo test`, this verifies that hashing "hello" produces the expected output.

## Why the sha2 Crate?

We have choices for SHA-256:

| Crate      | Pros                                                | Cons                                        |
| ---------- | --------------------------------------------------- | ------------------------------------------- |
| **sha2**   | Standard library. Well-maintained. Used everywhere. | Slightly slower than optimized alternatives |
| **sha256** | Simpler API                                         | Less popular, fewer audits                  |
| **blake3** | Faster, modern                                      | Overkill for our needs                      |
| **ring**   | Very fast                                           | Heavier dependencies                        |

**We chose sha2 because:**

1. **Standardized** - Used in Bitcoin, Ethereum, everywhere
2. **Audited** - Security has been reviewed extensively
3. **Maintained** - Part of RustCrypto (trusted organization)
4. **Compatible** - When we share hashes with other blockchain nodes, they understand SHA-256
5. **Simple API** - Easy to use without much boilerplate

For blockchain, compatibility matters more than marginal performance gains.

## Running Tests

To test this code:

```bash
cargo test
```

Output:

```
running 2 tests
test tests::test_empty ... ok
test tests::test_hash_hello ... ok

test result: ok. 2 passed
```

To test with output:

```bash
cargo test -- --nocapture
```

To run a specific test:

```bash
cargo test test_hash_hello
```

## Understanding the Hash Output

Let's verify manually:

```rust
fn main() {
    let hash = hash("hello");
    println!("Hash of 'hello': {}", hash);
}
```

Output:

```
Hash of 'hello': 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

This is 64 characters (256 bits = 32 bytes = 64 hex digits).

Try changing the input:

```rust
hash("Hello");  // Different (capital H)
hash("hello ");  // Different (trailing space)
hash("hello" + "world");  // Different
```

Each produces a completely different hash. That's the avalanche effect.

## Integration with ScrapyChain

Now we can hash blocks:

```rust
use sha2::{Digest, Sha256};

struct Block {
    index: u64,
    data: String,
}

impl Block {
    fn hash(&self) -> String {
        let content = format!("{}{}", self.index, self.data);
        hash(&content)  // Use our hash function
    }
}

fn main() {
    let block = Block {
        index: 1,
        data: String::from("genesis"),
    };

    println!("Block hash: {}", block.hash());
}
```

Every block can now compute its own hash. Immutable, deterministic, verifiable.

## Rust Concepts Demonstrated in This Code

### 1. Borrowing (`&str`)

We don't take ownership of the input data. We borrow it. This is safe and efficient.

### 2. Mutability (`mut`)

The hasher needs to be mutable as we feed it data.

### 3. Methods vs Functions (`hasher.update()` vs `Sha256::new()`)

Associated functions use `::`
Methods use `.`

### 4. Macros (`format!`, `assert_eq!`)

Both are macros (note the `!`). They're compile-time code generators.

### 5. Modules (`#[cfg(test)]`)

Test code is organized separately. Doesn't ship with binary.

### 6. Traits (implicit)

`Sha256` implements the `Digest` trait. That's why it has `.update()` and `.finalize()`.

### 7. Error Handling (not shown here)

This function can't fail. Hashing is infallible. But in real code, I/O operations would use `Result`.

### 8. Testing (`#[test]`)

Tests are first-class. The language has them built in.

## Why This Matters

You now have:

1. A working SHA-256 hash function
2. Tests that verify it works
3. Understanding of why this crate
4. Code you can drop into ScrapyChain

This is the security layer of blockchain. Get hashing right, and your ledger is immutable. Get it wrong, and everything breaks.

## Next Steps

1. Add this to ScrapyChain's lib.rs
2. Use it to hash block data
3. Verify that the same block always produces the same hash
4. Test that changing block data changes the hash
5. Build a chain where each block references the previous block's hash

That's the foundation of blockchain.

## Key Takeaway

Hashing is simple: take input, produce fixed-size output. But it's fundamental to security. The `sha2` crate makes it trivial to use correctly.

This code demonstrates core Rust: borrowing, mutability, testing, and working with external crates.

You now have the second pillar of your blockchain. Day 15 gave you blocks. Day 17 gives you security.
