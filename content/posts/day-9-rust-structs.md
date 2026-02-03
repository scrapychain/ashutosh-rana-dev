---
slug: day-9-rust-structs
title: "Day 9: Understanding Structs"
date: 2026-02-02
readTime: 10 min
category: rust
tags:
  - rust
  - beginner
  - structs
  - data-structures
  - types
excerpt: "Structs let you group related data together with names. They're the foundation of organizing data in Rust and the bridge to traits and advanced patterns."
---

# Understanding Structs in Rust

You've learned tuples for grouping data. But tuples have a problem: you access fields by index (`.0`, `.1`). That's not very readable.

**Structs** fix this. A struct lets you name your fields. You can access them by name, which is much clearer.

A struct is basically "custom data with labels."

## Creating a Struct

Define a struct with the `struct` keyword and list named fields.

```rust
struct User {
    name: String,
    age: i32,
    email: String,
}
```

That's the definition. Now use it:

```rust
fn main() {
    let user = User {
        name: String::from("Alice"),
        age: 30,
        email: String::from("alice@example.com"),
    };

    println!("{}", user.name);   // Alice
    println!("{}", user.age);    // 30
    println!("{}", user.email);  // alice@example.com
}
```

Much clearer than tuples. You know exactly what each field is.

## Mutable Structs

If you want to modify fields, make the struct mutable.

```rust
fn main() {
    let mut user = User {
        name: String::from("Alice"),
        age: 30,
        email: String::from("alice@example.com"),
    };

    user.age = 31;
    user.email = String::from("alice.new@example.com");

    println!("{}", user.age);  // 31
}
```

Note: You can't make individual fields mutable. Either the whole struct is mutable or it's not.

## Shorthand Syntax

If you have variables with the same name as fields, use the shorthand:

```rust
fn main() {
    let name = String::from("Bob");
    let age = 25;
    let email = String::from("bob@example.com");

    // Long way
    let user = User {
        name: name,
        age: age,
        email: email,
    };

    // Short way (same thing)
    let user = User {
        name,
        age,
        email,
    };
}
```

## Printing Structs

Use `{:?}` with the Debug derive to print structs.

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

    println!("{:?}", user);
    // User { name: "Alice", age: 30, email: "alice@example.com" }
}
```

The `#[derive(Debug)]` attribute automatically implements printing.

## Methods on Structs

Add methods to structs with `impl` blocks.

```rust
struct User {
    name: String,
    age: i32,
}

impl User {
    fn greet(&self) {
        println!("Hello, I'm {}", self.name);
    }

    fn have_birthday(&mut self) {
        self.age += 1;
    }
}

fn main() {
    let mut user = User {
        name: String::from("Alice"),
        age: 30,
    };

    user.greet();              // Hello, I'm Alice
    user.have_birthday();
    println!("{}", user.age);  // 31
}
```

Methods take `&self` (borrow) or `&mut self` (borrow mutably) or `self` (move).

## Associated Functions

Use `impl` to create functions associated with a struct (no `self`).

```rust
impl User {
    fn new(name: String, age: i32) -> User {
        User {
            name,
            age,
        }
    }
}

fn main() {
    let user = User::new(String::from("Bob"), 25);
    println!("{}", user.name);  // Bob
}
```

`User::new()` creates a new User. This is like a constructor.

## Structs and Ownership

Structs follow ownership rules just like any other data.

```rust
fn main() {
    let user = User {
        name: String::from("Alice"),
        age: 30,
    };

    // Borrow immutably
    print_user(&user);
    println!("{}", user.name);  // Still own it

    // Move
    take_user(user);
    // println!("{}", user.name);  // ERROR! user was moved
}

fn print_user(u: &User) {
    println!("{}", u.name);
}

fn take_user(u: User) {
    println!("{}", u.name);
}
```

Pass `&user` to borrow, or `user` to move. Same rules as Day 1.

## Struct Variants: Tuple Structs

Sometimes you want a struct but with unnamed fields. Use tuple struct syntax.

```rust
struct Point(f64, f64);

fn main() {
    let point = Point(3.5, 4.2);

    println!("{}", point.0);  // 3.5
    println!("{}", point.1);  // 4.2
}
```

Tuple structs are like named tuples. They're lighter than regular structs but heavier than plain tuples.

## Struct Variants: Unit Structs

A struct with no fields. Sounds useless, but they're useful as markers.

```rust
struct Marker;

fn main() {
    let _marker = Marker;
}
```

You'll see unit structs later when you learn traits. They're useful for implementing behavior on empty types.

## Using Structs with Collections

Store structs in vectors.

```rust
fn main() {
    let users = vec![
        User {
            name: String::from("Alice"),
            age: 30,
        },
        User {
            name: String::from("Bob"),
            age: 25,
        },
    ];

    for user in &users {
        println!("{}: {}", user.name, user.age);
    }
}
```

Same ownership rules apply. Iterate with `&users` to borrow.

## Practical Example: Transaction Struct

```rust
#[derive(Debug, Clone)]
struct Transaction {
    from: String,
    to: String,
    amount: u64,
    timestamp: u64,
}

impl Transaction {
    fn new(from: String, to: String, amount: u64) -> Transaction {
        Transaction {
            from,
            to,
            amount,
            timestamp: 0,
        }
    }

    fn is_valid(&self) -> bool {
        self.amount > 0 && !self.from.is_empty() && !self.to.is_empty()
    }

    fn execute(&mut self) {
        self.timestamp = 12345;  // Would be actual timestamp
        println!("Transaction executed: {} -> {}: {}",
                 self.from, self.to, self.amount);
    }
}

fn main() {
    let mut tx = Transaction::new(
        String::from("alice"),
        String::from("bob"),
        100,
    );

    if tx.is_valid() {
        tx.execute();
        println!("{:?}", tx);
    }
}
```

Output:

```
Transaction executed: alice -> bob: 100
Transaction { from: "alice", to: "bob", amount: 100, timestamp: 12345 }
```

This is real blockchain code structure. You define data, add methods to work with it.

## Field Privacy

By default, struct fields are private. Only the module that defines the struct can access them.

```rust
mod wallet {
    pub struct Wallet {
        pub address: String,
        balance: u64,  // Private
    }

    impl Wallet {
        pub fn new(address: String) -> Wallet {
            Wallet {
                address,
                balance: 0,
            }
        }

        pub fn get_balance(&self) -> u64 {
            self.balance
        }
    }
}

fn main() {
    let wallet = wallet::Wallet::new(String::from("0x123"));
    println!("{}", wallet.address);        // OK
    println!("{}", wallet.get_balance());  // OK
    // println!("{}", wallet.balance);     // ERROR! Private
}
```

Use `pub` to make fields accessible outside the module.

## Structs vs Tuples

| Feature             | Struct       | Tuple           |
| ------------------- | ------------ | --------------- |
| **Named fields**    | Yes          | No              |
| **Fixed size**      | Yes          | Yes             |
| **Different types** | Yes          | Yes             |
| **Methods**         | Yes          | No              |
| **Readability**     | High         | Medium          |
| **Best for**        | Complex data | Quick groupings |

Use structs for anything with more than a couple fields. Use tuples for simple groupings or return values.

## Common Struct Patterns

### Builder Pattern

```rust
impl User {
    fn builder() -> UserBuilder {
        UserBuilder::default()
    }
}

// (You'll learn this pattern later)
```

### Deriving Common Traits

```rust
#[derive(Debug, Clone, PartialEq)]
struct User {
    name: String,
    age: i32,
}
```

Automatically implement Debug (print), Clone (copy), and PartialEq (equality).

### Getters and Setters

```rust
impl User {
    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn set_age(&mut self, age: i32) {
        if age > 0 {
            self.age = age;
        }
    }
}
```

Control access to fields with methods.

## Why Structs Matter

Structs are how you organize data in Rust. They're not just for grouping values. They're:

1. **Named** - fields have meaning
2. **Organized** - methods define behavior
3. **Type-safe** - compiler checks you're using them correctly
4. **Composable** - structs contain other structs

In blockchain, structs represent:

- **Accounts** - with address, balance, nonce
- **Transactions** - with from, to, amount
- **Blocks** - with header, transactions, timestamp

Structs are fundamental to Rust programming.

## Key Takeaway

A struct groups named fields together. Define them with `struct`. Access fields with dot notation. Add methods with `impl`. Use them to organize data in your program.

Structs are the foundation of Rust. Once you master structs, traits (from Day 6) become powerful because you can add behavior to your data types.

Your blockchain code will be built on structs.
