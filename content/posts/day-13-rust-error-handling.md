---
slug: day-13-rust-error-handling
title: "Day 13: Error Handling Best Practices"
date: 2026-02-06
readTime: 12 min
category: rust
tags:
  - rust
  - beginner
  - error-handling
  - result
  - option
  - best-practices
excerpt: "Learn when to use Result vs Option, how to propagate errors, custom error types, and practical patterns for bulletproof error handling."
---

# Error Handling Best Practices in Rust

You know `Result` and `Option`. You know pattern matching. Now let's talk about strategy: how do you actually handle errors in real code?

This is where clean code meets reliability. Get this right, and your blockchain code won't crash unexpectedly. Get it wrong, and you'll hunt bugs for days.

## When to Use Result vs Option

This is the first decision.

**Use Option when:**

- Something might not exist
- Absence of a value is not an error
- Example: Finding a user in a list (not found = None)

```rust
fn find_user(users: &[&str], target: &str) -> Option<&str> {
    users.iter().find(|u| u == &target)
}
```

**Use Result when:**

- An operation might fail
- You need to know why it failed
- Example: Parsing a number (invalid format = Err with message)

```rust
fn parse_age(input: &str) -> Result<i32, String> {
    match input.parse::<i32>() {
        Ok(age) => {
            if age > 0 && age < 150 {
                Ok(age)
            } else {
                Err(String::from("Age out of range"))
            }
        }
        Err(_) => Err(String::from("Not a valid number")),
    }
}
```

## Error Propagation with ?

The `?` operator is how you bubble errors up without explicit `match`.

```rust
fn get_user_age(user_id: &str) -> Result<i32, String> {
    let data = fetch_user_data(user_id)?;  // If fetch fails, return error
    let age = parse_age(&data.age_str)?;   // If parse fails, return error
    Ok(age)
}

fn fetch_user_data(id: &str) -> Result<UserData, String> {
    // ... fetching logic
    Ok(UserData { age_str: "30".to_string() })
}

struct UserData {
    age_str: String,
}
```

`?` says: "If this is an error, return it immediately. If it's ok, extract the value and continue."

Without `?`, you'd need explicit `match` statements for every operation:

```rust
fn get_user_age_verbose(user_id: &str) -> Result<i32, String> {
    let data = match fetch_user_data(user_id) {
        Ok(d) => d,
        Err(e) => return Err(e),
    };

    let age = match parse_age(&data.age_str) {
        Ok(a) => a,
        Err(e) => return Err(e),
    };

    Ok(age)
}
```

`?` is much cleaner.

## Custom Error Types

Strings are fine for learning, but real code needs custom error types.

```rust
#[derive(Debug)]
enum TransactionError {
    InvalidAmount,
    InsufficientBalance,
    InvalidAddress,
}

fn validate_transaction(amount: u64, balance: u64) -> Result<(), TransactionError> {
    if amount == 0 {
        return Err(TransactionError::InvalidAmount);
    }

    if amount > balance {
        return Err(TransactionError::InsufficientBalance);
    }

    Ok(())
}

fn main() {
    match validate_transaction(100, 50) {
        Ok(()) => println!("Valid"),
        Err(TransactionError::InvalidAmount) => println!("Amount is zero"),
        Err(TransactionError::InsufficientBalance) => println!("Not enough balance"),
        Err(TransactionError::InvalidAddress) => println!("Bad address"),
    }
}
```

Output: `Not enough balance`

Custom error types let you:

- Use pattern matching on specific errors
- Handle different errors differently
- Carry structured error information

## Implementing Display for Errors

When you print an error, it should be human-readable.

```rust
use std::fmt;

#[derive(Debug)]
enum TransactionError {
    InvalidAmount,
    InsufficientBalance { needed: u64, available: u64 },
    InvalidAddress,
}

impl fmt::Display for TransactionError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            TransactionError::InvalidAmount => {
                write!(f, "Transaction amount must be greater than zero")
            }
            TransactionError::InsufficientBalance { needed, available } => {
                write!(f, "Insufficient balance: need {}, have {}", needed, available)
            }
            TransactionError::InvalidAddress => {
                write!(f, "Invalid address format")
            }
        }
    }
}

fn main() {
    let error = TransactionError::InsufficientBalance {
        needed: 100,
        available: 50,
    };
    println!("{}", error);  // Insufficient balance: need 100, have 50
}
```

## When to Panic vs Return Error

**Panic when:**

- It's a programming error (logic bug)
- Recovery is impossible
- Example: Array out of bounds (shouldn't happen if you wrote correct code)

```rust
fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Division by zero");  // This is YOUR bug
    }
    a / b
}
```

**Return error when:**

- It's an operational failure (external input is bad)
- Recovery is possible
- Example: User entered invalid input

```rust
fn parse_age(input: &str) -> Result<i32, String> {
    match input.parse::<i32>() {
        Ok(age) if age > 0 => Ok(age),
        _ => Err(String::from("Invalid age")),
    }
}
```

## Using unwrap() Correctly

`.unwrap()` panics if the Result is `Err`. Only use it when:

- You're certain it's Ok
- It's test code
- You're at the end of your program and failure is unrecoverable

```rust
fn main() {
    let config = parse_config().unwrap();  // Tests often do this
}
```

In production code, prefer:

```rust
fn main() {
    let config = parse_config().unwrap_or_else(|e| {
        eprintln!("Config error: {}", e);
        std::process::exit(1);
    });
}
```

Or:

```rust
fn main() {
    let config = match parse_config() {
        Ok(c) => c,
        Err(e) => {
            eprintln!("Config error: {}", e);
            std::process::exit(1);
        }
    };
}
```

## Error Context: map_err()

Add context to errors as they bubble up.

```rust
fn load_user(id: &str) -> Result<User, String> {
    let json = std::fs::read_to_string("user.json")
        .map_err(|e| format!("Failed to read file: {}", e))?;

    let user: User = serde_json::from_str(&json)
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    Ok(user)
}
```

`map_err()` transforms the error before passing it up. This adds context so you know where the failure happened.

## Recoverable Errors with unwrap_or

Sometimes you want to continue with a default value.

```rust
fn get_timeout(config: &str) -> u64 {
    config.parse::<u64>().unwrap_or(30)  // Default: 30 seconds
}
```

If parsing fails, use 30 as the default. No error propagated.

## Chaining Error-Prone Operations

Use `and_then()` to chain operations that both return `Result`.

```rust
fn process_transaction(data: &str) -> Result<String, String> {
    parse_transaction(data)
        .and_then(validate_transaction)
        .and_then(execute_transaction)
        .map(|result| format!("Success: {}", result))
}

fn parse_transaction(data: &str) -> Result<Transaction, String> {
    // Parse from string
    Ok(Transaction { amount: 100 })
}

fn validate_transaction(tx: Transaction) -> Result<Transaction, String> {
    if tx.amount == 0 {
        Err(String::from("Invalid amount"))
    } else {
        Ok(tx)
    }
}

fn execute_transaction(tx: Transaction) -> Result<String, String> {
    Ok(format!("Executed: {}", tx.amount))
}

struct Transaction {
    amount: u64,
}

fn main() {
    match process_transaction("100") {
        Ok(msg) => println!("{}", msg),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output: `Success: Executed: 100`

Each function handles its own error. If any fails, the chain stops and the error bubbles up.

## Practical Example: Blockchain Transaction Handler

```rust
#[derive(Debug)]
enum TxError {
    InvalidSender,
    InvalidRecipient,
    InvalidAmount,
    InsufficientBalance { needed: u64, have: u64 },
}

impl std::fmt::Display for TxError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            TxError::InvalidSender => write!(f, "Sender address is invalid"),
            TxError::InvalidRecipient => write!(f, "Recipient address is invalid"),
            TxError::InvalidAmount => write!(f, "Amount must be greater than zero"),
            TxError::InsufficientBalance { needed, have } => {
                write!(f, "Insufficient balance: need {}, have {}", needed, have)
            }
        }
    }
}

struct Transaction {
    from: String,
    to: String,
    amount: u64,
}

fn validate_sender(tx: &Transaction) -> Result<(), TxError> {
    if tx.from.is_empty() {
        Err(TxError::InvalidSender)
    } else {
        Ok(())
    }
}

fn validate_recipient(tx: &Transaction) -> Result<(), TxError> {
    if tx.to.is_empty() {
        Err(TxError::InvalidRecipient)
    } else {
        Ok(())
    }
}

fn validate_amount(tx: &Transaction) -> Result<(), TxError> {
    if tx.amount == 0 {
        Err(TxError::InvalidAmount)
    } else {
        Ok(())
    }
}

fn check_balance(tx: &Transaction, balance: u64) -> Result<(), TxError> {
    if tx.amount > balance {
        Err(TxError::InsufficientBalance {
            needed: tx.amount,
            have: balance,
        })
    } else {
        Ok(())
    }
}

fn process_transaction(tx: &Transaction, balance: u64) -> Result<String, TxError> {
    validate_sender(tx)?;
    validate_recipient(tx)?;
    validate_amount(tx)?;
    check_balance(tx, balance)?;

    Ok(format!("Transaction processed: {} -> {}: {}", tx.from, tx.to, tx.amount))
}

fn main() {
    let tx = Transaction {
        from: String::from("alice"),
        to: String::from("bob"),
        amount: 100,
    };

    match process_transaction(&tx, 50) {
        Ok(msg) => println!("{}", msg),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output: `Error: Insufficient balance: need 100, have 50`

Each validation function returns a Result. The `?` operator stops at the first error. The error carries structured information.

## Error Handling Patterns

### Pattern 1: Validate Early

Check inputs at the beginning of your function.

```rust
fn process(data: &str) -> Result<(), String> {
    if data.is_empty() {
        return Err(String::from("Data is empty"));
    }

    // Rest of logic
    Ok(())
}
```

### Pattern 2: Fail Fast

Use `?` to stop at the first error.

```rust
fn chain_operations() -> Result<String, String> {
    let a = operation_1()?;
    let b = operation_2(a)?;
    let c = operation_3(b)?;
    Ok(c)
}
```

### Pattern 3: Provide Context

Add information as errors bubble up.

```rust
fn load_data(path: &str) -> Result<String, String> {
    std::fs::read_to_string(path)
        .map_err(|e| format!("Failed to load {}: {}", path, e))
}
```

### Pattern 4: Default Values

Use `unwrap_or()` for non-critical data.

```rust
let timeout = config.parse::<u64>().unwrap_or(30);
```

### Pattern 5: Match Critical Paths

For critical errors, explicit match is better.

```rust
match critical_operation() {
    Ok(result) => process_result(result),
    Err(CriticalError::DatabaseDown) => restart_database(),
    Err(e) => log_error(e),
}
```

## Key Differences in Error Handling

| Situation                  | Use           | Example                             |
| -------------------------- | ------------- | ----------------------------------- |
| **Input validation fails** | Return Result | `parse_age()` returns Err           |
| **Programmer error**       | panic!()      | Array index out of bounds           |
| **Want to continue**       | unwrap_or()   | Default value for config            |
| **Chain operations**       | ? operator    | Multiple functions returning Result |
| **Need context**           | map_err()     | Add location info to error          |
| **Multiple error types**   | Custom enum   | TransactionError                    |
| **Only one case matters**  | if let Ok()   | Test if something succeeded         |

## Why Error Handling Matters in Blockchain

In blockchain, errors are everywhere:

- Transactions fail (bad signature, insufficient balance)
- Blocks are invalid (bad hash, wrong parent)
- Network operations fail (timeout, unreachable peer)
- State changes can revert

Proper error handling means:

- You know exactly what failed
- You can respond appropriately
- You don't lose data or state
- Debugging is possible

Sloppy error handling means:

- Panics crash the node
- Corrupt state
- Lost transactions
- Days of debugging

## Key Takeaway

Use `Option` when something might not exist. Use `Result` when something might fail. Use `?` to propagate errors. Create custom error types for clarity. Match critical errors explicitly. Add context as errors bubble up.

Error handling is boring until it saves your blockchain from losing money. Then it's the most important code you wrote.
