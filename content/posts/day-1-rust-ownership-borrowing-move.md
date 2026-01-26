---
slug: day-1-rust-ownership-borrowing-move
title: "Day 1:Understanding Rust: Ownership, References, Borrowing, and Move"
date: 2026-01-25
readTime: 6 min
category: rust
tags:
  - rust
  - beginner
  - ownership
  - borrowing
  - references
  - move
excerpt: "The mental model I’m using to stop fighting Rust: one owner, temporary borrows, and moves when ownership changes."
---

# Understanding Rust: Ownership, References, Borrowing, and Move

I'm learning Rust and these words kept showing up everywhere:

- ownership
- references
- borrowing
- move

At first it felt like Rust was being strict for no reason.

Now I'm starting to see it like this:

Rust is basically asking: **who owns the data right now, and who is allowed to use it?**

This is my beginner-level understanding (simple + practical).

## Ownership (the "who owns this?" rule)

In Rust, **every value has one owner**.

When the owner goes away (like a variable leaving a scope), Rust frees the memory automatically.

```rust
fn main() {
    let name = String::from("scrapy");
    // name owns the String here
} // name goes out of scope → String gets dropped (freed)
```

## References (the "can I borrow this?" rule)

A **reference** lets you use data without owning it. It's like borrowing a book from a friend, you can read it, but you don't own it.

There are two types of references:

### Immutable References (`&T`)

You can have many immutable references to the same data, but you can't change it.

```rust
fn main() {
    let name = String::from("scrapy");

    let ref1 = &name;  // immutable reference
    let ref2 = &name;  // another immutable reference (this is fine)

    println!("{}", ref1);  // can read it
    println!("{}", ref2);  // can read it
    // but can't modify name through these references
}
```

### Mutable References (`&mut T`)

You can have only one mutable reference to data at a time, and you can change it.

```rust
fn main() {
    let mut name = String::from("scrapy");

    let ref1 = &mut name;  // mutable reference
    ref1.push_str("chain");

    println!("{}", ref1);  // scrapy chain

    // Can't have another mutable reference while ref1 is still in use
    // let ref2 = &mut name;  // ERROR!
}
```

**Key rule:** Either many immutable references OR one mutable reference, but not both at the same time.

## Borrowing (loaning data to functions)

**Borrowing** happens when you pass a reference to a function instead of ownership. The function "borrows" the data and returns it when done.

```rust
fn print_name(name: &String) {
    // name is borrowed here
    println!("{}", name);
}
// ownership returns to the caller after this function ends

fn main() {
    let name = String::from("scrapy");
    print_name(&name);  // pass a reference (borrow)

    println!("{}", name);  // still own name here
}
```

### Mutable Borrowing

You can borrow mutably to allow the function to modify the data.

```rust
fn append_chain(name: &mut String) {
    name.push_str("chain");
}

fn main() {
    let mut name = String::from("scrapy");
    append_chain(&mut name);  // mutable borrow

    println!("{}", name);  // scrapy chain
}
```

## Move (transferring ownership)

A **move** happens when you transfer ownership of data from one owner to another. The original owner loses access to the data.

```rust
fn main() {
    let name = String::from("scrapy");
    let name2 = name;  // ownership MOVES to name2

    // println!("{}", name);  // ERROR! name no longer owns this data
    println!("{}", name2);  // OK
}
```

### Move in Function Calls

When you pass data (not a reference) to a function, ownership moves to that function.

```rust
fn take_ownership(name: String) {
    println!("{}", name);
}
// ownership is dropped here when the function ends

fn main() {
    let name = String::from("scrapy");
    take_ownership(name);  // ownership MOVES into the function

    // println!("{}", name);  // ERROR! ownership was moved
}
```

### Copy Types vs Move Types

Some types (like `i32`, `bool`) are **Copy**, meaning they're automatically copied instead of moved.

```rust
fn main() {
    let x = 5;
    let y = x;  // x is COPIED (not moved), because i32 is Copy

    println!("{}", x);  // OK! x still exists
    println!("{}", y);  // OK
}
```

But `String` is not `Copy`, so it moves.

```rust
fn main() {
    let name = String::from("scrapy");
    let name2 = name;  // MOVES (not copied)

    // println!("{}", name);  // ERROR! name was moved
}
```

## Quick Summary

| Concept                 | What it does                | Example                           |
| ----------------------- | --------------------------- | --------------------------------- |
| **Ownership**           | One owner per value         | `let x = String::from("hi");`     |
| **Immutable Reference** | Read without owning         | `let r = &x;`                     |
| **Mutable Reference**   | Modify without owning       | `let r = &mut x;`                 |
| **Borrowing**           | Temporary use via reference | `fn f(name: &String) {}`          |
| **Move**                | Transfer ownership          | `let y = x;` (for non-Copy types) |

The core principle: **Rust ensures memory safety by always knowing who owns data and who can use it.**
