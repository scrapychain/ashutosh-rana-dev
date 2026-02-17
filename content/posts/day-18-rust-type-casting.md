---
slug: day-18-rust-type-casting
title: "Day 18: Type Casting and Safe Conversions"
date: 2026-02-11
readTime: 12 min
category: rust
tags:
  - rust
  - beginner
  - type-casting
  - conversions
  - integers
  - safety
excerpt: "Learn safe type conversions in Rust. From integers to strings, using `as`, `into`, `From`, and working with Option and Result for fallible conversions."
---

# Type Casting and Safe Conversions in Rust

You have a `u64` but need an `i32`. You have a `String` but need a `&str`. You have text that might be a number.

Type conversions happen constantly. Rust gives you multiple ways to do it safely.

Unlike C or C++, Rust won't silently truncate or overflow. It forces you to be explicit about conversions and handle failures.

This is different from other languages. In Java, converting a large int to a small int silently truncates. In Rust, it's caught at compile time.

## The Problem Type Casting Solves

Different types represent different constraints:

- `u32` - unsigned 32-bit (0 to 4 billion)
- `i32` - signed 32-bit (-2 billion to 2 billion)
- `u64` - unsigned 64-bit (huge numbers)
- `i64` - signed 64-bit
- `usize` - pointer-sized (depends on architecture)

Sometimes you need to convert between them. Sometimes it fails.

## Unsafe Casting with `as`

The `as` keyword does unchecked casting. It's fast but dangerous.

```rust
fn main() {
    let num: u32 = 255;
    let small: u8 = num as u8;  // Works: 255 fits in u8
    println!("{}", small);  // 255

    let big: u32 = 300;
    let small: u8 = big as u8;  // SILENT TRUNCATION!
    println!("{}", small);  // 44 (not 300!)
}
```

300 doesn't fit in `u8` (max 255). The `as` operator silently truncates to 44. No error, no warning. Data loss without alarm.

This is dangerous in blockchain. An amount of 300 becomes 44. Money disappears silently.

**Don't use `as` for conversions you're unsure about.**

### When `as` is Safe

Use `as` when you know the conversion is safe:

```rust
let small_num: u8 = 100;
let big_num: u64 = small_num as u64;  // Safe: u8 always fits in u64
println!("{}", big_num);  // 100

let decimal: f64 = 3.14;
let integer: i32 = decimal as i32;  // Safe: 3 (loses decimal part, but intentional)
println!("{}", integer);  // 3
```

Expanding to larger types is always safe. Truncating is risky.

## Safe Casting with `TryInto` and `TryFrom`

These traits provide safe conversions that return `Result`.

```rust
use std::convert::TryInto;

fn main() {
    let big_num: u32 = 300;

    // TryInto: returns Result
    let small: Result<u8, _> = big_num.try_into();

    match small {
        Ok(n) => println!("Converted: {}", n),
        Err(e) => println!("Conversion failed: {}", e),
    }
}
```

Output: `Conversion failed: out of range integral type conversion attempted`

The conversion is checked. If it fails, you get an error, not silent data loss.

### Using `try_into()` with ?

With the `?` operator in a function that returns `Result`:

```rust
fn convert_to_u8(num: u32) -> Result<u8, String> {
    num.try_into()
        .map_err(|_| format!("Cannot fit {} into u8", num))
}

fn main() {
    match convert_to_u8(300) {
        Ok(n) => println!("Success: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    match convert_to_u8(100) {
        Ok(n) => println!("Success: {}", n),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output:

```
Error: Cannot fit 300 into u8
Success: 100
```

### TryFrom for Custom Types

```rust
use std::convert::TryFrom;

impl TryFrom<u64> for u32 {
    type Error = String;

    fn try_from(value: u64) -> Result<Self, Self::Error> {
        if value > u32::MAX as u64 {
            Err(format!("Value {} too large for u32", value))
        } else {
            Ok(value as u32)
        }
    }
}

fn main() {
    let big: u64 = 5_000_000_000;
    match u32::try_from(big) {
        Ok(n) => println!("{}", n),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output: `Error: Value 5000000000 too large for u32`

## Integer Type Conversions: Common Scenarios

### u32 to i32 (Unsigned to Signed)

```rust
fn main() {
    let unsigned: u32 = 100;
    let signed: i32 = unsigned as i32;  // Safe: 100 is positive
    println!("{}", signed);  // 100

    // Risky: large u32 as i32
    let big_unsigned: u32 = 3_000_000_000;
    let signed: i32 = big_unsigned as i32;  // OVERFLOW!
    println!("{}", signed);  // -1294967296 (garbage)
}
```

Safe version with type constants:

```rust
use std::convert::TryInto;

fn main() {
    let big_unsigned: u32 = 3_000_000_000;

    // Compare against i32::MAX (2,147,483,647)
    if big_unsigned <= i32::MAX as u32 {
        let signed: i32 = big_unsigned as i32;
        println!("Safe conversion: {}", signed);
    } else {
        println!("Too large for i32. Max is: {}", i32::MAX);
    }

    // Or use try_into for automatic checking
    match big_unsigned.try_into() as Result<i32, _> {
        Ok(n) => println!("Success: {}", n),
        Err(_) => println!("Too large for i32"),
    }
}
```

Output:

```
Too large for i32. Max is: 2147483647
```

### Understanding Type Boundaries

Each integer type has limits:

```rust
fn main() {
    println!("u8 range: 0 to {}", u8::MAX);              // 0 to 255
    println!("i8 range: {} to {}", i8::MIN, i8::MAX);    // -128 to 127
    println!("u32 range: 0 to {}", u32::MAX);            // 0 to 4294967295
    println!("i32 range: {} to {}", i32::MIN, i32::MAX); // -2147483648 to 2147483647
    println!("u64 range: 0 to {}", u64::MAX);            // 0 to 18446744073709551615
    println!("i64 range: {} to {}", i64::MIN, i64::MAX); // -9223372036854775808 to 9223372036854775807
}
```

Output:

```
u8 range: 0 to 255
i8 range: -128 to 127
u32 range: 0 to 4294967295
i32 range: -2147483648 to 2147483647
u64 range: 0 to 18446744073709551615
i64 range: -9223372036854775808 to 9223372036854775807
```

### i64 to u32 (Signed, Larger to Smaller)

```rust
use std::convert::TryInto;

fn main() {
    let signed: i64 = 100;

    // Check if positive and fits in u32
    let unsigned: Result<u32, _> = signed.try_into();

    match unsigned {
        Ok(n) => println!("Converted: {}", n),
        Err(_) => println!("Cannot convert: negative or too large"),
    }

    // Convert i64::MAX to u32
    let big_signed: i64 = i64::MAX;  // 9223372036854775807
    match big_signed.try_into() as Result<u32, _> {
        Ok(n) => println!("Value: {}", n),
        Err(_) => println!("i64::MAX ({}) too large for u32 (max: {})", i64::MAX, u32::MAX),
    }
}
```

Output:

```
Converted: 100
i64::MAX (9223372036854775807) too large for u32 (max: 4294967295)
```

### u64 to u32 (Unsigned, Larger to Smaller)

```rust
use std::convert::TryInto;

fn main() {
    let big: u64 = u64::MAX;  // 18446744073709551615

    // Try to fit into u32
    match big.try_into() as Result<u32, _> {
        Ok(n) => println!("Fits: {}", n),
        Err(_) => println!("u64::MAX ({}) too large for u32 (max: {})", u64::MAX, u32::MAX),
    }

    // Safe u64 for u32
    let small: u64 = 100;
    let as_u32: u32 = small as u32;
    println!("Small u64 as u32: {}", as_u32);
}
```

Output:

```
u64::MAX (18446744073709551615) too large for u32 (max: 4294967295)
Small u64 as u32: 100
```

### usize to u32 (Platform-Dependent)

`usize` is 32-bit on 32-bit systems, 64-bit on 64-bit systems. Use `TryInto`:

```rust
use std::convert::TryInto;

fn main() {
    let big: usize = usize::MAX;

    // Try to fit into u32
    match big.try_into() as Result<u32, _> {
        Ok(n) => println!("Fits: {}", n),
        Err(_) => println!("usize::MAX on this system is too large for u32"),
    }

    println!("usize::MAX on this system: {}", usize::MAX);
    println!("u32::MAX: {}", u32::MAX);
}
```

Output on 64-bit system:

```
usize::MAX on this system is too large for u32
usize::MAX on this system: 18446744073709551615
u32::MAX: 4294967295
```

## Working with Vectors and Type Conversion

### Convert Vector Elements

```rust
fn main() {
    let numbers: Vec<u32> = vec![1, 2, 3, 4, 5];

    // Convert u32 to u64
    let expanded: Vec<u64> = numbers
        .iter()
        .map(|&n| n as u64)
        .collect();

    println!("{:?}", expanded);  // [1, 2, 3, 4, 5]
}
```

### Safe Conversion in Vector

```rust
use std::convert::TryInto;

fn main() {
    let big_numbers: Vec<u32> = vec![100, 200, 300, 4_000_000_000];

    let small: Vec<u8> = big_numbers
        .iter()
        .filter_map(|&n| n.try_into().ok())
        .collect();

    println!("{:?}", small);  // [100, 200] (300 and 4_000_000_000 filtered out)
}
```

`filter_map` keeps only conversions that succeeded.

### Collecting Failed Conversions

```rust
use std::convert::TryInto;

fn main() {
    let numbers: Vec<u32> = vec![100, 200, 300, 4_000_000_000];

    let mut valid = Vec::new();
    let mut invalid = Vec::new();

    for num in numbers {
        match num.try_into() as Result<u8, _> {
            Ok(n) => valid.push(n),
            Err(_) => invalid.push(num),
        }
    }

    println!("Valid: {:?}", valid);    // [100, 200]
    println!("Invalid: {:?}", invalid); // [300, 4000000000]
}
```

## Working with Option and Type Conversion

### Convert With Option

Sometimes you want a conversion that returns `Option` instead of `Result`:

```rust
fn safe_u8(num: u32) -> Option<u8> {
    if num <= 255 {
        Some(num as u8)
    } else {
        None
    }
}

fn main() {
    match safe_u8(100) {
        Some(n) => println!("Got: {}", n),
        None => println!("Too big"),
    }

    match safe_u8(300) {
        Some(n) => println!("Got: {}", n),
        None => println!("Too big"),
    }
}
```

Output:

```
Got: 100
Too big
```

### Chaining Options

```rust
fn main() {
    let num: u32 = 100;

    let result = safe_u8(num)
        .map(|n| n * 2)  // If Some, double it
        .map(|n| n + 1)  // If Some, add 1
        .unwrap_or(0);   // If None, use 0

    println!("{}", result);  // 201 (100 as u8 = 100, *2 = 200, +1 = 201)
}
```

## String and Number Conversions

### String to Integer

```rust
use std::convert::TryInto;

fn main() {
    let text = "42";

    // Using parse (returns Result)
    let num: Result<i32, _> = text.parse();
    match num {
        Ok(n) => println!("Parsed: {}", n),
        Err(_) => println!("Not a number"),
    }
}
```

### Integer to String

```rust
fn main() {
    let num: i32 = 42;

    // Using to_string
    let text = num.to_string();
    println!("{}", text);  // "42"

    // Using format macro
    let text = format!("{}", num);
    println!("{}", text);  // "42"
}
```

### Parsing With Error Handling

```rust
fn parse_amount(text: &str) -> Result<u64, String> {
    text.parse::<u64>()
        .map_err(|_| format!("'{}' is not a valid amount", text))
}

fn main() {
    match parse_amount("100") {
        Ok(n) => println!("Amount: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    match parse_amount("not_a_number") {
        Ok(n) => println!("Amount: {}", n),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output:

```
Amount: 100
Error: 'not_a_number' is not a valid amount
```

## Practical Blockchain Example: Transaction Amount Conversion

```rust
struct Transaction {
    from: String,
    to: String,
    amount: u64,  // Stored as u64
}

impl Transaction {
    // Convert from user input (u32) to internal format (u64)
    fn new(from: String, to: String, amount: u32) -> Result<Self, String> {
        Ok(Transaction {
            from,
            to,
            amount: amount as u64,  // Safe: u32 always fits in u64
        })
    }

    // Convert to compact format (u8) for serialization
    fn to_compact(&self) -> Result<Vec<u8>, String> {
        self.amount
            .try_into()
            .map(|amt: u8| vec![amt])
            .map_err(|_| format!("Amount {} too large for compact format", self.amount))
    }

    // Parse from string input
    fn from_string(from: String, to: String, amount_str: &str) -> Result<Self, String> {
        let amount: u32 = amount_str
            .parse()
            .map_err(|_| "Invalid amount format".to_string())?;

        Self::new(from, to, amount)
    }
}

fn main() {
    // Valid transaction
    match Transaction::new("alice".to_string(), "bob".to_string(), 100) {
        Ok(tx) => println!("Transaction: {} -> {}: {}", tx.from, tx.to, tx.amount),
        Err(e) => println!("Error: {}", e),
    }

    // From string input
    match Transaction::from_string(
        "alice".to_string(),
        "bob".to_string(),
        "250",
    ) {
        Ok(tx) => println!("Parsed: {}", tx.amount),
        Err(e) => println!("Parse error: {}", e),
    }

    // Compact format (fails if amount too large)
    let tx = Transaction::new("alice".to_string(), "bob".to_string(), 100).unwrap();
    match tx.to_compact() {
        Ok(bytes) => println!("Compact: {:?}", bytes),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output:

```
Transaction: alice -> bob: 100
Parsed: 250
Compact: [100]
```

## Type Conversion Conversion Decision Tree

```
Do I know the conversion is safe?
├─ YES → Use `as` (fast, simple)
│        Example: let big: u64 = small_u8 as u64;
│
└─ NO → Does it return an error?
   ├─ YES → Use `TryInto` or `try_from()` (safe, returns Result)
   │        Example: num.try_into().map_err(...)?
   │
   └─ NO → Use `Option` (returns Some/None)
            Example: if num <= 255 { Some(num as u8) } else { None }
```

## Common Mistakes

### Mistake 1: Silent Overflow with `as`

```rust
// WRONG
let big: u32 = 300;
let small: u8 = big as u8;  // 300 becomes 44!

// RIGHT
use std::convert::TryInto;
let small: Result<u8, _> = big.try_into();
```

### Mistake 2: Unwrapping Without Checking

```rust
// WRONG
let num: u8 = text.parse().unwrap();  // Panics if not a number

// RIGHT
match text.parse::<u8>() {
    Ok(n) => { /* use n */ },
    Err(e) => { /* handle error */ },
}
```

### Mistake 3: Forgetting Platform Differences

```rust
// RISKY
let size: usize = big_u64 as usize;  // Might truncate on 32-bit

// BETTER
use std::convert::TryInto;
let size: Result<usize, _> = big_u64.try_into();
```

## Why This Matters for Blockchain

In blockchain, type conversion happens everywhere:

1. **Transaction amounts** - converting from user input to internal representation
2. **Block heights** - converting between different integer sizes
3. **Timestamps** - converting from different time formats
4. **Hash values** - converting between bytes and hex strings
5. **Network messages** - parsing incoming data (which might be invalid)

One silent truncation = lost funds = node crash = chain fork.

Use safe conversions. Always.

## Key Takeaway

Rust gives you three tools for type conversion:

1. **`as`** - Fast, unchecked. Use when you're certain.
2. **`TryInto` / `try_from()`** - Safe, returns Result. Use when unsure.
3. **`Option`** - Simple yes/no. Use for simple validations.

Choose the right tool. Your blockchain's security depends on it.

In blockchain, one silent truncation = lost funds = node crash = chain fork. Always use safe conversions.
