---
slug: day-11-rust-enums
title: "Day 11: Understanding Enums"
date: 2026-02-04
readTime: 10 min
category: rust
tags:
  - rust
  - beginner
  - enums
  - pattern-matching
  - types
excerpt: "Enums let you define a type that can be one of several variants. Option and Result are enums. Learn to create your own."
---

# Understanding Enums in Rust

You've seen `Option` and `Result`. Both are enums. But you haven't built your own yet.

An enum is a type that can be one of several things. It's short for "enumeration."

Think of it like: "A user can be either Active, Inactive, or Banned. Pick one."

## What's an Enum?

An enum defines multiple possible variants. A value of that enum type must be one of those variants.

```rust
enum Status {
    Active,
    Inactive,
    Banned,
}
```

Now you can use `Status`:

```rust
fn main() {
    let user_status = Status::Active;
    println!("{:?}", user_status);  // Active
}
```

Note: You need `#[derive(Debug)]` to print it.

```rust
#[derive(Debug)]
enum Status {
    Active,
    Inactive,
    Banned,
}

fn main() {
    let user_status = Status::Active;
    println!("{:?}", user_status);  // Active
}
```

## Enums with Data

Variants can hold data. Each variant can have different data.

```rust
#[derive(Debug)]
enum Message {
    Text(String),
    Number(i32),
    Boolean(bool),
}

fn main() {
    let msg1 = Message::Text(String::from("hello"));
    let msg2 = Message::Number(42);
    let msg3 = Message::Boolean(true);

    println!("{:?}", msg1);  // Text("hello")
    println!("{:?}", msg2);  // Number(42)
    println!("{:?}", msg3);  // Boolean(true)
}
```

Each variant holds a different type. `Text` holds a `String`. `Number` holds an `i32`.

## Matching on Enums

You use `match` to handle each variant.

```rust
fn handle_message(msg: Message) {
    match msg {
        Message::Text(s) => println!("Text message: {}", s),
        Message::Number(n) => println!("Number: {}", n),
        Message::Boolean(b) => println!("Boolean: {}", b),
    }
}

fn main() {
    let msg = Message::Text(String::from("hello"));
    handle_message(msg);  // Text message: hello
}
```

`match` extracts the data from each variant and lets you use it.

## Enums with Multiple Fields

Variants can hold multiple pieces of data.

```rust
#[derive(Debug)]
enum Transaction {
    Payment { from: String, to: String, amount: u64 },
    Mint { address: String, amount: u64 },
    Burn { amount: u64 },
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

    println!("{:?}", tx1);
    println!("{:?}", tx2);
}
```

Different transaction types have different fields. `Payment` needs `from` and `to`. `Mint` needs only `address`.

## Matching with Multiple Fields

Extract and use multiple fields.

```rust
match tx {
    Transaction::Payment { from, to, amount } => {
        println!("Payment: {} -> {} : {}", from, to, amount);
    }
    Transaction::Mint { address, amount } => {
        println!("Mint: {} got {}", address, amount);
    }
    Transaction::Burn { amount } => {
        println!("Burned: {}", amount);
    }
}
```

Pattern matching extracts all the data you need.

## Methods on Enums

Add methods to enums with `impl`.

```rust
impl Transaction {
    fn is_valid(&self) -> bool {
        match self {
            Transaction::Payment { amount, .. } => amount > &0,
            Transaction::Mint { amount, .. } => amount > &0,
            Transaction::Burn { amount } => amount > &0,
        }
    }
}

fn main() {
    let tx = Transaction::Payment {
        from: String::from("alice"),
        to: String::from("bob"),
        amount: 100,
    };

    println!("{}", tx.is_valid());  // true
}
```

`..` ignores fields you don't need. The method examines all variants.

## Option and Result Are Enums

Now you know. `Option` is defined like this:

```rust
enum Option<T> {
    Some(T),
    None,
}
```

`Result` is:

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

They're just enums. You use them the same way: with `match`, `if let`, or methods like `.map()`.

## if let for Single Variant

When you only care about one variant, use `if let`.

```rust
fn main() {
    let tx = Transaction::Payment {
        from: String::from("alice"),
        to: String::from("bob"),
        amount: 100,
    };

    if let Transaction::Payment { amount, .. } = tx {
        println!("Payment amount: {}", amount);
    }
}
```

`if let` is cleaner than `match` when you ignore other variants.

## Enums Without Data

Variants don't have to hold data. They can just be variants.

```rust
#[derive(Debug)]
enum Direction {
    North,
    South,
    East,
    West,
}

fn main() {
    let way = Direction::North;
    println!("{:?}", way);  // North
}
```

These are like the `Status` example earlier. Simple markers.

## Mixing Data and No Data

An enum can have some variants with data and some without.

```rust
#[derive(Debug)]
enum UserAction {
    Login(String),          // Takes username
    Logout,                 // No data
    Purchase { item: String, price: u64 },  // Multiple fields
}

fn main() {
    let action1 = UserAction::Login(String::from("alice"));
    let action2 = UserAction::Logout;
    let action3 = UserAction::Purchase {
        item: String::from("sword"),
        price: 100,
    };

    println!("{:?}", action1);
    println!("{:?}", action2);
    println!("{:?}", action3);
}
```

Different variants, different data. That's the power of enums.

## Matching with Defaults

Use `_` to ignore unmatched variants.

```rust
match action {
    UserAction::Login(user) => println!("Logged in: {}", user),
    UserAction::Logout => println!("Logged out"),
    _ => println!("Other action"),
}
```

This catches `Purchase` in the `_` case.

## Practical Example: Blockchain State

```rust
#[derive(Debug, Clone)]
enum BlockState {
    Pending,
    Confirmed { block_number: u64 },
    Finalized { block_number: u64 },
    Rejected { reason: String },
}

fn process_block(state: BlockState) {
    match state {
        BlockState::Pending => {
            println!("Block is waiting to be confirmed");
        }
        BlockState::Confirmed { block_number } => {
            println!("Block {} confirmed", block_number);
        }
        BlockState::Finalized { block_number } => {
            println!("Block {} is final", block_number);
        }
        BlockState::Rejected { reason } => {
            println!("Block rejected: {}", reason);
        }
    }
}

fn main() {
    let state1 = BlockState::Pending;
    let state2 = BlockState::Confirmed { block_number: 1000 };
    let state3 = BlockState::Rejected {
        reason: String::from("Invalid hash"),
    };

    process_block(state1);
    process_block(state2);
    process_block(state3);
}
```

Output:

```
Block is waiting to be confirmed
Block 1000 confirmed
Block rejected: Invalid hash
```

This is real blockchain code. Different block states, different handling.

## Enums vs Structs

| Feature                        | Enum                | Struct                 |
| ------------------------------ | ------------------- | ---------------------- |
| **Multiple variants**          | Yes (one at a time) | No (all fields always) |
| **Different data per variant** | Yes                 | No                     |
| **Named fields**               | Optional            | Yes                    |
| **All fields present**         | No (one variant)    | Yes                    |
| **Best for**                   | States, choices     | Data grouping          |

Use enums when something can be one of several things. Use structs to group data.

## Common Enum Patterns

### Result for error handling

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10, 2) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}
```

### Option for optional values

```rust
fn find_user(users: &[&str], target: &str) -> Option<&str> {
    for user in users {
        if user == &target {
            return Some(user);
        }
    }
    None
}

fn main() {
    let users = vec!["alice", "bob"];
    match find_user(&users, "alice") {
        Some(user) => println!("Found: {}", user),
        None => println!("Not found"),
    }
}
```

### Custom enums for states

```rust
#[derive(Debug)]
enum Order {
    Pending { items: usize },
    Shipped { tracking: String },
    Delivered,
    Cancelled { reason: String },
}
```

## Why Enums Matter

Enums force you to handle all cases. If you forget a variant in your `match`, the compiler catches it.

In blockchain:

- **Transactions** have different types (Payment, Mint, Burn)
- **Blocks** have different states (Pending, Confirmed, Finalized)
- **Messages** have different formats
- **Errors** have different reasons

Enums let you represent all these cleanly and safely.

## Key Takeaway

An enum is a type that can be one of several variants. Each variant can hold different data. Use `match` to handle each variant. Enums are how Rust represents choices.

You've been using Option and Result (which are enums) since Day 8. Now you can create your own for any situation where something can be one of several things.

Enums + pattern matching = type-safe choices. That's powerful.
