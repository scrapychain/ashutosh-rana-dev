---
slug: day-16-rust-macros
title: "Day 16: Understanding Macros in Rust"
date: 2026-02-09
readTime: 11 min
category: rust
tags:
  - rust
  - beginner
  - macros
  - metaprogramming
  - practical
excerpt: "Macros are code that generates code. They're powerful, sometimes mysterious, but essential to writing clean Rust. Learn what they do and when to use them."
---

# Understanding Macros in Rust

You've been using macros without realizing it. `println!()`, `vec![]`, `match` - these all involve macro magic.

A macro is basically "code that generates code." It's executed at compile time to create code that your program runs.

Think of it as templating or metaprogramming.

## What Are Macros?

Macros let you write less code by generating repetitive patterns automatically.

Compare:

```rust
// Without macro
let v = Vec::new();
v.push(1);
v.push(2);
v.push(3);

// With macro
let v = vec![1, 2, 3];
```

Both create the same thing. The macro version is cleaner.

Macros are identified by `!`: `println!()`, `vec![]`, `assert!()`.

## Why Macros Matter

Rust would be painful without macros. Imagine printing without `println!`:

```rust
// Without macro
use std::io::Write;
let mut stdout = std::io::stdout();
writeln!(stdout, "Hello").unwrap();

// With macro
println!("Hello");
```

Macros hide boilerplate. They make code readable.

## Common Rust Macros You Already Use

### println! and eprintln!

Print to stdout and stderr.

```rust
println!("Hello, {}", name);
eprintln!("Error: {}", error);
```

### vec!

Create vectors with initial values.

```rust
let numbers = vec![1, 2, 3];
let strings = vec!["a", "b", "c"];
```

### panic!

Crash with a message.

```rust
if amount == 0 {
    panic!("Amount cannot be zero");
}
```

### assert! and assert_eq!

Test conditions. Panic if false.

```rust
assert!(result.is_ok());
assert_eq!(2 + 2, 4);
```

### dbg!

Print debug info and return the value.

```rust
let x = 5;
let y = dbg!(x + 1);  // Prints: [src/main.rs:3] x + 1 = 6
println!("{}", y);     // 6
```

Useful for debugging without refactoring code.

### unwrap_or!

Wait, this isn't a macro. But `unwrap_or_else!` is sometimes used.

```rust
let value = some_result.unwrap_or_else(|| default_value);
```

### format!

Create a formatted string (like printf).

```rust
let message = format!("Hello, {}!", name);
```

### todo! and unimplemented!

Placeholder macros.

```rust
fn do_something() {
    todo!("Implement this later");
}
```

Compiles but panics at runtime if reached.

## Macros vs Functions

| Feature             | Function | Macro            |
| ------------------- | -------- | ---------------- |
| **Syntax**          | `name()` | `name!()`        |
| **Execution**       | Runtime  | Compile time     |
| **Type checking**   | Strict   | Flexible         |
| **Code generation** | Manual   | Automatic        |
| **Readability**     | High     | Can be confusing |
| **Performance**     | Normal   | Usually faster   |

Macros are compile-time. Functions are runtime. Macros can do things functions can't.

## Creating Simple Macros

You can create your own macros with `macro_rules!`.

```rust
macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
}

fn main() {
    say_hello!();  // Hello!
}
```

The pattern `() => { ... }` matches when called with no arguments.

### Macros with Arguments

```rust
macro_rules! add_one {
    ($x:expr) => {
        $x + 1
    };
}

fn main() {
    let result = add_one!(5);
    println!("{}", result);  // 6
}
```

`$x:expr` means "capture an expression and call it x."

### Multiple Patterns

```rust
macro_rules! say {
    ("hello") => {
        println!("Hello!");
    };
    ("goodbye") => {
        println!("Goodbye!");
    };
}

fn main() {
    say!("hello");    // Hello!
    say!("goodbye");  // Goodbye!
}
```

Match on different inputs, do different things.

## Useful Macros for Blockchain/ScrapyChain

Here are macros you'd actually use in your blockchain project:

### 1. Log Transaction Macro

```rust
macro_rules! log_tx {
    ($tx:expr) => {
        println!(
            "[TX] From: {}, To: {}, Amount: {}",
            $tx.from, $tx.to, $tx.amount
        );
    };
}

fn main() {
    let tx = Transaction {
        from: "alice".to_string(),
        to: "bob".to_string(),
        amount: 100,
    };

    log_tx!(tx);  // [TX] From: alice, To: bob, Amount: 100
}
```

### 2. Assert Valid Macro

```rust
macro_rules! assert_valid {
    ($result:expr) => {
        match $result {
            Ok(val) => val,
            Err(e) => panic!("Validation failed: {}", e),
        }
    };
}

fn main() {
    let result: Result<i32, String> = Ok(42);
    let value = assert_valid!(result);
    println!("{}", value);  // 42
}
```

### 3. Block Creation Macro

```rust
macro_rules! create_block {
    ($index:expr, $data:expr) => {
        Block {
            index: $index,
            timestamp: 0,
            data: $data.to_string(),
            hash: String::new(),
            previous_hash: String::new(),
        }
    };
}

fn main() {
    let block = create_block!(1, "genesis");
    println!("{:?}", block);
}
```

### 4. Error Handling Macro

```rust
macro_rules! tx_error {
    ($msg:expr) => {
        Err(format!("Transaction error: {}", $msg))
    };
}

fn validate_tx(amount: u64) -> Result<(), String> {
    if amount == 0 {
        return tx_error!("Amount is zero");
    }
    Ok(())
}

fn main() {
    match validate_tx(0) {
        Ok(()) => println!("Valid"),
        Err(e) => println!("{}", e),  // Transaction error: Amount is zero
    }
}
```

### 5. Debug Blockchain Macro

```rust
macro_rules! debug_block {
    ($block:expr) => {
        eprintln!(
            "[DEBUG] Block #{}: hash={}, prev={}",
            $block.index, $block.hash, $block.previous_hash
        );
    };
}

fn main() {
    let block = Block {
        index: 1,
        timestamp: 0,
        data: "test".to_string(),
        hash: "abc123".to_string(),
        previous_hash: "0".to_string(),
    };

    debug_block!(block);
}
```

### 6. Validation Chain Macro

```rust
macro_rules! validate_all {
    ($($check:expr),+) => {
        {
            let mut all_valid = true;
            $(
                if !$check {
                    all_valid = false;
                    break;
                }
            )+
            all_valid
        }
    };
}

fn main() {
    let tx_valid = true;
    let balance_sufficient = true;
    let fee_valid = true;

    if validate_all!(tx_valid, balance_sufficient, fee_valid) {
        println!("All validations passed");
    }
}
```

### 7. Hex Display Macro

```rust
macro_rules! hex {
    ($bytes:expr) => {
        format!("{}", hex::encode(&$bytes))
    };
}

// Note: This requires the `hex` crate
// But shows how you'd structure it for displaying hashes
```

## Derive Macros (The Ones with #[derive])

You've already used these:

```rust
#[derive(Debug, Clone, PartialEq)]
struct Block {
    index: u64,
    data: String,
}
```

`#[derive(...)]` is a procedural macro that automatically implements traits. Instead of you writing the implementation, Rust generates it for you at compile time.

### What Derive Does

When you write:

```rust
#[derive(Debug)]
struct User {
    name: String,
}
```

Rust generates code equivalent to:

```rust
impl std::fmt::Debug for User {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        f.debug_struct("User")
            .field("name", &self.name)
            .finish()
    }
}
```

You don't write that. The derive macro does.

### Common Derive Macros

#### Debug

Lets you print with `{:?}`.

```rust
#[derive(Debug)]
struct Block {
    index: u64,
    data: String,
}

fn main() {
    let block = Block { index: 1, data: "test".to_string() };
    println!("{:?}", block);  // Block { index: 1, data: "test" }
}
```

Without `#[derive(Debug)]`, you'd have to implement the `Debug` trait manually.

#### Clone

Implement `.clone()` to copy a value.

```rust
#[derive(Clone)]
struct Block {
    index: u64,
    data: String,
}

fn main() {
    let block1 = Block { index: 1, data: "test".to_string() };
    let block2 = block1.clone();  // Explicit copy

    println!("{:?}", block1);  // Still works
    println!("{:?}", block2);  // Also works
}
```

Without `#[derive(Clone)]`, you'd have to implement the Clone trait manually or use ownership transfer.

#### PartialEq

Implement `==` for equality comparison.

```rust
#[derive(PartialEq)]
struct Block {
    index: u64,
    hash: String,
}

fn main() {
    let block1 = Block { index: 1, hash: "abc".to_string() };
    let block2 = Block { index: 1, hash: "abc".to_string() };
    let block3 = Block { index: 2, hash: "xyz".to_string() };

    println!("{}", block1 == block2);  // true
    println!("{}", block1 == block3);  // false
}
```

Without this, you can't use `==` on custom types.

#### Copy

Auto-copy for small types instead of moving.

```rust
#[derive(Copy, Clone)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p1 = Point { x: 1, y: 2 };
    let p2 = p1;  // Automatic copy (not move)

    println!("{:?}", p1);  // Still works (p1 wasn't moved)
    println!("{:?}", p2);  // Also works
}
```

Only works for types without heap allocation (String would fail).

#### Default

Implement default values for a struct.

```rust
#[derive(Default)]
struct Config {
    port: u16,
    host: String,
}

fn main() {
    let config = Config::default();
    println!("{} on {}", config.port, config.host);  // 0 on
}
```

Creates a default instance with zero/empty values.

#### Eq

Like `PartialEq`, but for total equality (reflexive, symmetric, transitive).

```rust
#[derive(Eq, PartialEq)]
struct User {
    id: u64,
}
```

Use when your type can always be compared for equality.

#### Ord and PartialOrd

Implement ordering for comparisons (`<`, `>`, etc.).

```rust
#[derive(PartialOrd, Ord, PartialEq, Eq)]
struct Block {
    index: u64,
}

fn main() {
    let b1 = Block { index: 1 };
    let b2 = Block { index: 2 };

    println!("{}", b1 < b2);  // true
}
```

### Multiple Derives

Combine multiple derives:

```rust
#[derive(Debug, Clone, PartialEq, Eq)]
struct Transaction {
    from: String,
    to: String,
    amount: u64,
}

fn main() {
    let tx1 = Transaction {
        from: "alice".to_string(),
        to: "bob".to_string(),
        amount: 100,
    };

    let tx2 = tx1.clone();

    println!("{:?}", tx1);           // Print with Debug
    println!("{}", tx1 == tx2);      // Compare with PartialEq
}
```

### Derive Dependencies

Some derives require others:

- `Copy` requires `Clone`
- `Ord` requires `Eq` and `PartialOrd`
- `Eq` requires `PartialEq`

```rust
#[derive(Copy, Clone)]  // Copy needs Clone
struct Point {
    x: i32,
}

#[derive(Eq, PartialEq)]  // Eq needs PartialEq
struct Id(u64);
```

### Why This Matters

Without `#[derive(...)]`, you'd write hundreds of lines:

```rust
// Manual implementation of Debug
impl std::fmt::Debug for Block {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        f.debug_struct("Block")
            .field("index", &self.index)
            .field("hash", &self.hash)
            .finish()
    }
}

// Manual implementation of Clone
impl Clone for Block {
    fn clone(&self) -> Self {
        Block {
            index: self.index,
            hash: self.hash.clone(),
        }
    }
}

// Manual implementation of PartialEq
impl PartialEq for Block {
    fn eq(&self, other: &Self) -> bool {
        self.index == other.index && self.hash == other.hash
    }
}
```

With `#[derive(Debug, Clone, PartialEq)]`, you get all that for free.

### Commonly Used Derives for Blockchain

For ScrapyChain, you'll typically use:

```rust
#[derive(Debug, Clone, PartialEq, Eq)]
struct Block {
    index: u64,
    timestamp: u64,
    data: String,
    hash: String,
    previous_hash: String,
}

#[derive(Debug, Clone, PartialEq, Eq)]
struct Transaction {
    from: String,
    to: String,
    amount: u64,
}
```

These gives you:

- `Debug` for printing and debugging
- `Clone` for copying blocks/transactions
- `PartialEq` for comparing blocks
- `Eq` for using in HashMaps/HashSets

## When to Use Macros

**Use macros when:**

- You're repeating code patterns
- You need compile-time code generation
- You want to hide complexity
- You're writing domain-specific logic

**Don't use macros when:**

- A function would work
- Clarity matters more than brevity
- The logic is simple

Macros can be confusing. Use them to improve code clarity, not to show off.

## Practical Example: ScrapyChain Logging Macros

Here's what you might add to ScrapyChain:

```rust
macro_rules! log_block {
    ($block:expr, $level:expr) => {
        eprintln!(
            "[{}] Block #{} | Hash: {} | Data: {} bytes",
            $level,
            $block.index,
            &$block.hash[..8],  // First 8 chars of hash
            $block.data.len()
        );
    };
}

macro_rules! log_chain {
    ($chain:expr) => {
        eprintln!("[CHAIN] {} blocks, tip: #{}", $chain.len(), $chain.len() - 1);
    };
}

macro_rules! validate_tx {
    ($tx:expr) => {
        if $tx.amount == 0 {
            return Err("Amount cannot be zero".to_string());
        }
        if $tx.from.is_empty() {
            return Err("Sender cannot be empty".to_string());
        }
        if $tx.to.is_empty() {
            return Err("Recipient cannot be empty".to_string());
        }
    };
}

fn main() {
    let block = Block {
        index: 1,
        timestamp: 0,
        data: "hello".to_string(),
        hash: "abc123def456".to_string(),
        previous_hash: "0".to_string(),
    };

    log_block!(block, "INFO");
}
```

## Why Macros Matter for ScrapyChain

As you build ScrapyChain:

- You'll have repetitive validation logic
- You'll want consistent logging
- You'll want to create blocks/transactions easily
- You'll want debugging output that's clear

Macros make all of this cleaner without sacrificing performance.

## Key Takeaway

Macros are "code that generates code." They're compile-time magic that makes runtime code cleaner.

You don't need to understand how to write complex macros. But you should know:

- What they are (`name!()` syntax)
- What common ones do (`println!`, `vec!`, `assert!`)
- When to create simple ones for your project

For ScrapyChain, start with simple logging and validation macros. As you get comfortable, you can build more complex ones.

Macros are powerful. Used well, they make code elegant. Used poorly, they make it mysterious. Write for clarity first, performance second.
