---
slug: day-10-rust-result-type
title: "Day 10: Understanding the Result Type"
date: 2026-02-03
readTime: 10 min
category: rust
tags:
  - rust
  - beginner
  - result
  - error-handling
  - pattern-matching
excerpt: "Result represents success or failure. It forces you to handle errors explicitly, making your code reliable and safer."
---

# Understanding the Result Type in Rust

You know `Option<T>` handles "maybe there's a value, maybe there isn't."

But what if something fails? You need to know _why_ it failed. That's what **Result** does.

`Result` is like `Option`, but instead of `None`, you get an error description.

## What is Result?

`Result` is an enum with two variants:

```rust
enum Result<T, E> {
    Ok(T),      // Success. Here's the value.
    Err(E),     // Failure. Here's why it failed.
}
```

`T` is the success type. `E` is the error type.

When a function might fail, it returns `Result<SuccessType, ErrorType>`.

## Creating Results

You can create `Result` values yourself.

```rust
fn main() {
    let success: Result<i32, String> = Ok(42);
    let failure: Result<i32, String> = Err(String::from("Something went wrong"));

    println!("{:?}", success);  // Ok(42)
    println!("{:?}", failure);  // Err("Something went wrong")
}
```

## Using Result: Pattern Matching

When you get a `Result`, you must handle both `Ok` and `Err`.

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    let result = divide(10, 2);

    match result {
        Ok(value) => println!("Result: {}", value),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output: `Result: 5`

Try with division by zero:

```rust
let result = divide(10, 0);

match result {
    Ok(value) => println!("Result: {}", value),
    Err(e) => println!("Error: {}", e),
}
```

Output: `Error: Cannot divide by zero`

`match` forces you to handle failure. You can't ignore it.

## Result Methods

Instead of always using `match`, Rust provides convenient methods.

### .unwrap()

Gets the value inside `Ok`. Panics if it's `Err`.

```rust
fn main() {
    let result = Ok(42);
    println!("{}", result.unwrap());  // 42

    let error: Result<i32, String> = Err(String::from("oops"));
    println!("{}", error.unwrap());  // PANIC!
}
```

Only use `.unwrap()` when you're certain it's `Ok`.

### .unwrap_or()

Gets the value, or a default if it's `Err`.

```rust
fn main() {
    let success: Result<i32, String> = Ok(42);
    println!("{}", success.unwrap_or(0));  // 42

    let error: Result<i32, String> = Err(String::from("oops"));
    println!("{}", error.unwrap_or(0));  // 0 (default)
}
```

Safer than `.unwrap()`.

### .is_ok() and .is_err()

Check what you have without extracting.

```rust
fn main() {
    let result = Ok(42);

    if result.is_ok() {
        println!("Success!");
    }

    if result.is_err() {
        println!("Failed!");
    }
}
```

### .map()

Transform the success value.

```rust
fn main() {
    let result = Ok(5);

    let doubled = result.map(|x| x * 2);
    println!("{:?}", doubled);  // Ok(10)

    let error: Result<i32, String> = Err(String::from("oops"));
    let result2 = error.map(|x| x * 2);
    println!("{:?}", result2);  // Err("oops")
}
```

`.map()` transforms only if it's `Ok`. If it's `Err`, it stays `Err`.

### .map_err()

Transform the error.

```rust
fn main() {
    let error: Result<i32, String> = Err(String::from("bad"));

    let new_error = error.map_err(|e| format!("Error: {}", e));
    println!("{:?}", new_error);  // Err("Error: bad")
}
```

### .and_then()

Chain operations that return `Result`.

```rust
fn main() {
    let result = Ok(5);

    let final_result = result
        .and_then(|x| {
            if x > 0 {
                Ok(x * 2)
            } else {
                Err(String::from("Negative"))
            }
        });

    println!("{:?}", final_result);  // Ok(10)
}
```

Chain multiple operations. If any fails, the rest is skipped.

### .or_else()

Provide a fallback `Result` if the first is `Err`.

```rust
fn main() {
    let error: Result<i32, String> = Err(String::from("first failed"));

    let result = error.or_else(|_| Ok(42));
    println!("{:?}", result);  // Ok(42)
}
```

## if let with Result

Use `if let` for simple cases.

```rust
fn main() {
    let result = Ok(42);

    if let Ok(value) = result {
        println!("Success: {}", value);
    }
}
```

Handle only the success case. Ignore the error.

```rust
fn main() {
    let result = Ok(42);

    if let Ok(value) = result {
        println!("Success: {}", value);
    } else {
        println!("Failed");
    }
}
```

Or handle both:

```rust
if let Err(e) = result {
    println!("Error: {}", e);
}
```

## Functions Returning Result

Write functions that return `Result` when they might fail.

```rust
fn parse_number(s: &str) -> Result<i32, String> {
    match s.parse::<i32>() {
        Ok(num) => Ok(num),
        Err(_) => Err(String::from("Not a valid number")),
    }
}

fn main() {
    match parse_number("42") {
        Ok(num) => println!("Parsed: {}", num),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output: `Parsed: 42`

Try with invalid input:

```rust
match parse_number("abc") {
    Ok(num) => println!("Parsed: {}", num),
    Err(e) => println!("Error: {}", e),
}
```

Output: `Error: Not a valid number`

## Chaining Results

The power of `Result` is chaining operations.

```rust
fn main() {
    let result = Ok(10)
        .map(|x| x * 2)         // Ok(20)
        .and_then(|x| {
            if x > 15 {
                Ok(x + 5)
            } else {
                Err(String::from("Too small"))
            }
        })
        .map(|x| x / 2);        // Ok(12)

    println!("{:?}", result);  // Ok(12)
}
```

Each operation transforms the `Result`. If any fails, the chain stops.

## Result vs Option

| Feature          | Result               | Option                |
| ---------------- | -------------------- | --------------------- |
| **Success case** | `Ok(T)`              | `Some(T)`             |
| **Failure case** | `Err(E)`             | `None`                |
| **Carries info** | Yes (error details)  | No (just absence)     |
| **Use when**     | Operation might fail | Value might not exist |

Use `Result` when you need to know _why_ something failed. Use `Option` when you just care if something exists.

## Practical Example: Transaction Validation

```rust
#[derive(Debug)]
struct Transaction {
    from: String,
    to: String,
    amount: u64,
}

impl Transaction {
    fn validate(&self) -> Result<(), String> {
        if self.from.is_empty() {
            return Err(String::from("Sender is empty"));
        }

        if self.to.is_empty() {
            return Err(String::from("Recipient is empty"));
        }

        if self.amount == 0 {
            return Err(String::from("Amount must be greater than 0"));
        }

        Ok(())
    }
}

fn main() {
    let tx1 = Transaction {
        from: String::from("alice"),
        to: String::from("bob"),
        amount: 100,
    };

    match tx1.validate() {
        Ok(()) => println!("Transaction valid"),
        Err(e) => println!("Validation failed: {}", e),
    }

    let tx2 = Transaction {
        from: String::from("alice"),
        to: String::from("bob"),
        amount: 0,
    };

    match tx2.validate() {
        Ok(()) => println!("Transaction valid"),
        Err(e) => println!("Validation failed: {}", e),
    }
}
```

Output:

```
Transaction valid
Validation failed: Amount must be greater than 0
```

Real blockchain code. Validating transactions and catching errors.

## The ? Operator (Error Propagation)

When a function returns `Result`, you can use `?` to propagate errors.

```rust
fn process_transaction(from: &str, to: &str, amount: &str) -> Result<u64, String> {
    let amt = parse_number(amount)?;  // If parse fails, return Err

    if from.is_empty() {
        return Err(String::from("Sender empty"));
    }

    Ok(amt)
}

fn main() {
    match process_transaction("alice", "bob", "100") {
        Ok(amt) => println!("Amount: {}", amt),
        Err(e) => println!("Error: {}", e),
    }
}
```

If `parse_number` fails, `?` immediately returns the error. You don't need to explicitly handle it.

## Common Patterns

### Check and return

```rust
fn validate() -> Result<(), String> {
    if condition {
        Err(String::from("Failed"))
    } else {
        Ok(())
    }
}
```

### Chain with and_then

```rust
let result = fetch_data()
    .and_then(|data| validate(data))
    .and_then(|data| process(data));
```

### Recover from error

```rust
result.or_else(|_| Ok(default_value))
```

## Why Result Matters

Result forces you to think about failure. Every function that might fail returns a `Result`. You can't accidentally ignore errors.

In blockchain:

- **Parsing** blocks or transactions can fail
- **Validating** can fail (bad signature, insufficient balance)
- **Executing** state changes can fail (contract revert)

Result makes you handle these cases explicitly.

## Key Takeaway

`Result<T, E>` represents success or failure. `Ok(value)` means success. `Err(error)` means failure.

Use `match` to handle both cases. Use methods like `.map()`, `.and_then()`, and `?` to work with `Result` values cleanly.

Result is like `Option`, but carries error information. That makes it perfect for functions that can fail.

Once you understand `Result`, you understand how Rust makes error handling explicit and safe. That's critical for blockchain code where failures must be handled correctly.
