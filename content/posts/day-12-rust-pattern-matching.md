---
slug: day-12-rust-pattern-matching
title: "Day 12: Pattern Matching - From Beginner to Advanced"
date: 2026-02-05
readTime: 12 min
category: rust
tags:
  - rust
  - beginner
  - pattern-matching
  - match
  - destructuring
excerpt: "Pattern matching is how Rust lets you extract and destructure data. From simple to complex, it's one of the most powerful features in the language."
---

# Pattern Matching: From Beginner to Advanced

You've used `match` and `if let`. But pattern matching is deeper than that.

Pattern matching is how you extract data from complex types. It's how you handle all the cases your code needs to cover. It's everywhere in Rust.

Let me show you from simple to powerful.

## Beginner: Basic Match

You know this already.

```rust
fn main() {
    let value = 2;

    match value {
        1 => println!("One"),
        2 => println!("Two"),
        3 => println!("Three"),
        _ => println!("Other"),
    }
}
```

Output: `Two`

`match` compares a value against patterns. The first pattern that matches runs.

## Beginner: Matching on Enums

You've done this too.

```rust
#[derive(Debug)]
enum Color {
    Red,
    Green,
    Blue,
}

fn main() {
    let color = Color::Red;

    match color {
        Color::Red => println!("It's red"),
        Color::Green => println!("It's green"),
        Color::Blue => println!("It's blue"),
    }
}
```

Each variant gets a pattern and an action.

## Beginner: Extracting Data with Match

Enums that hold data need extraction.

```rust
#[derive(Debug)]
enum Message {
    Text(String),
    Number(i32),
}

fn main() {
    let msg = Message::Text(String::from("hello"));

    match msg {
        Message::Text(s) => println!("Text: {}", s),
        Message::Number(n) => println!("Number: {}", n),
    }
}
```

The pattern `Message::Text(s)` extracts the String into `s`.

## Intermediate: Destructuring Tuples

Pattern matching works on tuples.

```rust
fn main() {
    let point = (3, 4);

    match point {
        (0, 0) => println!("Origin"),
        (x, 0) => println!("On x-axis: {}", x),
        (0, y) => println!("On y-axis: {}", y),
        (x, y) => println!("Point: ({}, {})", x, y),
    }
}
```

Output: `Point: (3, 4)`

Each pattern extracts variables from the tuple. `(x, 0)` matches any point on the x-axis.

## Intermediate: Destructuring Structs

You can destructure struct fields in patterns.

```rust
#[derive(Debug)]
struct User {
    name: String,
    age: i32,
}

fn main() {
    let user = User {
        name: String::from("Alice"),
        age: 30,
    };

    match user {
        User { name, age: 30 } => println!("Alice is 30"),
        User { name, age } => println!("{} is {}", name, age),
    }
}
```

`User { name, age: 30 }` matches only users who are 30. It extracts the name.

## Intermediate: if let (Simplified Match)

When you only care about one pattern, `if let` is cleaner.

```rust
fn main() {
    let value = Some(5);

    if let Some(x) = value {
        println!("The value is {}", x);
    }
}
```

No need for a full `match` when you ignore other cases.

```rust
if let Some(x) = value {
    println!("Found: {}", x);
} else {
    println!("Not found");
}
```

Add an `else` to handle the other case.

## Intermediate: Range Patterns

Match ranges of values.

```rust
fn main() {
    let num = 15;

    match num {
        1..=10 => println!("One to ten"),
        11..=20 => println!("Eleven to twenty"),
        _ => println!("Other"),
    }
}
```

Output: `Eleven to twenty`

`1..=10` matches any number from 1 to 10 inclusive.

## Intermediate: The Wildcard (\_)

Ignore values you don't care about.

```rust
fn main() {
    let tuple = (1, 2, 3);

    match tuple {
        (first, _, third) => {
            println!("First: {}, Third: {}", first, third);
        }
    }
}
```

Output: `First: 1, Third: 3`

`_` means "I don't care about this value."

## Intermediate: Ignoring Remaining Values (..)

When you only need some fields.

```rust
#[derive(Debug)]
struct User {
    name: String,
    age: i32,
    email: String,
}

fn main() {
    let user = User {
        name: String::from("Alice"),
        age: 30,
        email: String::from("alice@example.com"),
    };

    match user {
        User { name, .. } => println!("Name: {}", name),
    }
}
```

Output: `Name: Alice`

`..` means "I don't care about the other fields."

## Advanced: Guard Clauses (if Conditions)

Add conditions to patterns.

```rust
fn main() {
    let num = 15;

    match num {
        n if n < 10 => println!("Less than 10"),
        n if n >= 10 && n <= 20 => println!("Between 10 and 20"),
        _ => println!("Greater than 20"),
    }
}
```

Output: `Between 10 and 20`

`if n >= 10 && n <= 20` is a guard. The pattern matches only if the guard is true.

## Advanced: Matching Nested Data

Complex data types need complex patterns.

```rust
#[derive(Debug)]
enum Result {
    Ok(Data),
    Err(String),
}

#[derive(Debug)]
struct Data {
    id: i32,
    value: String,
}

fn main() {
    let result = Result::Ok(Data {
        id: 42,
        value: String::from("hello"),
    });

    match result {
        Result::Ok(Data { id, value }) => {
            println!("ID: {}, Value: {}", id, value);
        }
        Result::Err(e) => println!("Error: {}", e),
    }
}
```

Output: `ID: 42, Value: hello`

The pattern destructures the enum variant, then the struct inside it.

## Advanced: Or Patterns (|)

Match multiple patterns with the same action.

```rust
fn main() {
    let num = 2;

    match num {
        1 | 2 | 3 => println!("One, two, or three"),
        4 | 5 | 6 => println!("Four, five, or six"),
        _ => println!("Other"),
    }
}
```

Output: `One, two, or three`

`1 | 2 | 3` matches if the value is any of those.

## Advanced: Pattern Bindings with @

Bind a name to a pattern match result.

```rust
fn main() {
    let num = 15;

    match num {
        n @ 10..=20 => println!("In range, got {}", n),
        _ => println!("Out of range"),
    }
}
```

Output: `In range, got 15`

`n @ 10..=20` means "match the range AND bind the value to n."

## Advanced: Complex Destructuring

Combine multiple techniques.

```rust
#[derive(Debug)]
enum Transaction {
    Payment { from: String, to: String, amount: u64 },
    Mint { address: String, amount: u64 },
}

fn main() {
    let tx = Transaction::Payment {
        from: String::from("alice"),
        to: String::from("bob"),
        amount: 100,
    };

    match tx {
        Transaction::Payment { from, to, amount } if amount > 50 => {
            println!("Large payment: {} -> {}: {}", from, to, amount);
        }
        Transaction::Payment { from, to, amount } => {
            println!("Small payment: {} -> {}: {}", from, to, amount);
        }
        Transaction::Mint { address, amount } => {
            println!("Mint: {} got {}", address, amount);
        }
    }
}
```

Output: `Large payment: alice -> bob: 100`

Destructure enum variant fields, then use a guard to check the amount.

## Advanced: Pattern Matching in Function Parameters

Patterns work in function parameters too.

```rust
fn process((x, y): (i32, i32)) {
    println!("Coordinates: {}, {}", x, y);
}

fn main() {
    process((3, 4));  // (3, 4) gets destructured
}
```

Output: `Coordinates: 3, 4`

The parameter pattern automatically destructures the tuple.

## Advanced: Matching References

When working with references, pattern matching can dereference.

```rust
fn main() {
    let value = Some(42);

    match &value {
        Some(n) => println!("The number is {}", n),
        None => println!("No value"),
    }

    println!("{:?}", value);  // Still own value
}
```

`&value` lets you match without consuming the value.

## Advanced: Match Exhaustiveness

The compiler ensures you handle all cases.

```rust
enum Direction {
    North,
    South,
    East,
    West,
}

fn main() {
    let dir = Direction::North;

    match dir {
        Direction::North => println!("Up"),
        Direction::South => println!("Down"),
        // ERROR! Missing East and West
    }
}
```

Rust won't compile until you handle all variants. This prevents bugs.

## Advanced: while let

Loop while a pattern matches.

```rust
fn main() {
    let mut numbers = vec![1, 2, 3];

    while let Some(n) = numbers.pop() {
        println!("Got {}", n);
    }
}
```

Output:

```
Got 3
Got 2
Got 1
```

`while let` is cleaner than `loop` + `if let`.

## Advanced: for in with Patterns

Patterns in loops.

```rust
fn main() {
    let pairs = vec![(1, 2), (3, 4), (5, 6)];

    for (x, y) in pairs {
        println!("{} + {} = {}", x, y, x + y);
    }
}
```

Output:

```
1 + 2 = 3
3 + 4 = 7
5 + 6 = 11
```

Each tuple gets destructured in the loop.

## Practical Example: Blockchain Transaction Processing

```rust
#[derive(Debug, Clone)]
enum Transaction {
    Payment { from: String, to: String, amount: u64 },
    Mint { address: String, amount: u64 },
    Burn { amount: u64 },
}

fn process_transaction(tx: Transaction) -> Result<String, String> {
    match tx {
        Transaction::Payment { from, to, amount } if amount == 0 => {
            Err(String::from("Amount cannot be zero"))
        }
        Transaction::Payment { from, to, amount } => {
            Ok(format!("Payment: {} -> {}: {}", from, to, amount))
        }
        Transaction::Mint { address, amount } if amount > 1_000_000 => {
            Err(String::from("Mint amount too large"))
        }
        Transaction::Mint { address, amount } => {
            Ok(format!("Minted {} for {}", amount, address))
        }
        Transaction::Burn { amount } if amount == 0 => {
            Err(String::from("Cannot burn zero"))
        }
        Transaction::Burn { amount } => {
            Ok(format!("Burned {}", amount))
        }
    }
}

fn main() {
    let tx1 = Transaction::Payment {
        from: String::from("alice"),
        to: String::from("bob"),
        amount: 100,
    };

    let tx2 = Transaction::Mint {
        address: String::from("alice"),
        amount: 50,
    };

    match process_transaction(tx1) {
        Ok(msg) => println!("{}", msg),
        Err(e) => println!("Error: {}", e),
    }

    match process_transaction(tx2) {
        Ok(msg) => println!("{}", msg),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output:

```
Payment: alice -> bob: 100
Minted 50 for alice
```

Real blockchain code. Complex pattern matching with guards, enum variants, and guards.

## Pattern Matching Cheat Sheet

| Pattern             | What it does       | Example             |
| ------------------- | ------------------ | ------------------- |
| `_`                 | Ignore value       | `_`                 |
| `x`                 | Bind to variable   | `x`                 |
| `1 \| 2`            | Or patterns        | `1 \| 2`            |
| `1..=10`            | Range              | `1..=10`            |
| `(x, y)`            | Tuple destructure  | `(x, y)`            |
| `User { name, .. }` | Struct destructure | `User { name, .. }` |
| `Some(x)`           | Enum extract       | `Some(x)`           |
| `x @ 1..=10`        | Bind with pattern  | `x @ 1..=10`        |
| `x if x > 5`        | Guard clause       | `x if x > 5`        |
| `&x`                | Reference match    | `&Some(x)`          |

## Why Pattern Matching Matters

Pattern matching is how Rust forces you to be thorough. You can't miss cases. You can't accidentally forget to extract data.

In blockchain:

- **Transaction types** have different fields. Patterns extract them.
- **States** have different meanings. Patterns handle each one.
- **Errors** have different causes. Patterns let you respond appropriately.

Pattern matching + the type system = bulletproof code.

## Key Takeaway

Pattern matching extracts and destructures data. Use `match` for multiple patterns. Use `if let` for one pattern. Combine with guards for conditions. Patterns work everywhere: match expressions, function parameters, loops.

Rust's pattern matching is one of its superpowers. Master it and your code becomes cleaner, safer, and more expressive.
