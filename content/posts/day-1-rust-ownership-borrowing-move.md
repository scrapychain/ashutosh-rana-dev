---
slug: day-1-rust-ownership-borrowing-move
title: "Day 1: Ownership, References, Borrowing, and Move"
date: 2026-01-25
readTime: 8 min
category: rust
tags:
  - rust
  - beginner
  - ownership
  - borrowing
  - references
  - move
excerpt: "The mental model I'm using to stop fighting Rust: one owner, temporary borrows, and moves when ownership changes."
---

# Understanding Rust: Ownership, References, Borrowing, and Move

When I first started learning Rust, I kept hitting these errors that made no sense:

> "value borrowed after move"
> "cannot borrow as mutable because it's also borrowed as immutable"
> "this value does not implement Copy"

I thought Rust was being needlessly strict. But then I realized: Rust is actually asking a simple question about every piece of data:

**Who owns this data right now? And who's allowed to use it?**

Once I understood that, everything clicked. Let me walk you through it.

## The Big Picture: Memory Safety Without Garbage Collection

Most languages handle memory in two ways:

1. **Manual management** (C/C++) - you allocate and free. Freedom, but easy to mess up.
2. **Garbage collection** (Python, Java, Go) - the language cleans up for you. Safe, but slower.

Rust does something different: **ownership**. The language tracks who owns data at compile time and automatically frees it when the owner is done. No garbage collector needed. No manual freeing.

This is why Rust feels strict, it's proving your code is safe before it even runs.

---

## Ownership: The Core Rule

**Every value in Rust has exactly one owner.**

That's it. One owner. When the owner stops existing, the data gets cleaned up automatically.

```rust
fn main() {
    let name = String::from("scrapy");
    // name is the owner of this String
    // Rust allocates memory for "scrapy"

    println!("{}", name);  // name still owns it
} // name goes out of scope here
  // Rust automatically frees the memory. No garbage collector. No manual free().
```

Think of it like this: if you create a String, you own it. Period. When your variable goes away, the String goes away too. The memory is cleaned up.

### Why This Matters

Without ownership, you'd have memory leaks (allocate but forget to free) or use-after-free bugs (try to use memory that's already been freed). Rust prevents both by enforcing one owner.

---

## References: Borrowing Without Ownership

Here's the problem with "one owner": what if you want to use data in a function without giving up ownership?

That's where **references** come in. A reference lets you use data _without_ owning it. You're borrowing.

Think of it like lending a book to a friend. Your friend can read it, but you still own it. When they're done, they give it back.

### Immutable References (`&T`): Read-Only Borrowing

```rust
fn main() {
    let name = String::from("scrapy");

    // Create a reference (borrow)
    let ref1 = &name;
    let ref2 = &name;  // You can have multiple!

    // Use the references
    println!("{}", ref1);  // Read the data
    println!("{}", ref2);  // Read it again

    println!("{}", name);  // name still owns it
} // Everyone is done. name gets cleaned up.
```

You can have **as many immutable references as you want** to the same data. But you can only _read_ through them.

### Mutable References (`&mut T`): Read AND Write Borrowing

```rust
fn main() {
    let mut name = String::from("scrapy");

    // Mutable reference: can read AND modify
    let ref1 = &mut name;
    ref1.push_str("chain");  // Modify through the reference

    println!("{}", ref1);  // "scrapychain"

    // You can't have another mutable reference while ref1 exists
    // let ref2 = &mut name;  // ERROR!
}
```

This is stricter: you can have **only one mutable reference** at a time.

### The Key Rule

- **Multiple immutable references?** ✅ Fine.
- **One mutable reference?** ✅ Fine.
- **Both at the same time?** ❌ Not allowed.

Why? If multiple people could modify the same data at the same time, you'd get data corruption. Rust prevents that at compile time.

---

## Borrowing in Functions: Loaning Data Around

When you pass data to a function, you usually don't want to give up ownership. You want to borrow.

```rust
fn greet(name: &String) {
    // name is borrowed here
    // This function can READ the String, but can't take ownership
    println!("Hello, {}", name);
}

fn main() {
    let name = String::from("alice");

    greet(&name);  // Pass a reference (borrow)

    // name is still owned by main()
    println!("{}", name);  // Still works!
}
```

Notice: `greet()` takes `&String`, not `String`. The `&` means "borrow this, don't take ownership."

### Mutable Borrowing in Functions

Sometimes you want a function to _modify_ the data you pass it:

```rust
fn add_suffix(name: &mut String) {
    // Can read AND modify through this reference
    name.push_str(" smith");
}

fn main() {
    let mut name = String::from("alice");

    add_suffix(&mut name);  // Lend mutably

    println!("{}", name);  // "alice smith"
}
```

The function can modify the data, but still doesn't own it. When the function returns, ownership goes back to `main()`.

---

## Move: Transferring Ownership

Sometimes you _do_ want to give up ownership. That's called a **move**.

When you move data, the original owner loses access. The new owner takes over.

```rust
fn main() {
    let name1 = String::from("scrapy");
    let name2 = name1;  // Ownership MOVES to name2

    // name1 no longer owns the data
    // println!("{}", name1);  // ERROR! Can't use name1 anymore
    println!("{}", name2);  // OK. name2 owns it now
}
```

This is one of the hardest concepts to wrap your head around, but it makes sense: a piece of data can only have one owner. If you move it to `name2`, then `name1` can't use it anymore.

### Moving in Function Calls

```rust
fn take_ownership(name: String) {
    // This function takes ownership (no & means ownership transfer)
    println!("{}", name);
} // name goes out of scope here. Memory is freed.

fn main() {
    let name = String::from("alice");
    take_ownership(name);  // Ownership MOVES into the function

    // name is gone. We no longer own this data.
    // println!("{}", name);  // ERROR!
}
```

When you pass data without `&`, ownership moves. The function becomes the owner. After the function ends, the data is freed.

### Copy Types: The Exception

Small, simple types like `i32` and `bool` are **Copy**. They're cheap to copy, so Rust copies them automatically instead of moving.

```rust
fn main() {
    let x = 5;
    let y = x;  // x is COPIED, not moved

    println!("{}", x);  // OK! x still exists
    println!("{}", y);  // OK
}
```

For Copy types, `let y = x;` actually means "copy x to y." No move happens.

But `String` is not Copy:

```rust
fn main() {
    let x = String::from("hello");
    let y = x;  // MOVES (doesn't copy)

    // println!("{}", x);  // ERROR! x no longer owns it
    println!("{}", y);  // OK
}
```

Why the difference? Copying a big String every time would be slow and wasteful. So Rust moves it instead.

---

## Putting It Together: A Practical Example

```rust
fn print_name(name: &String) {
    // Borrow: read-only
    println!("Name: {}", name);
}

fn add_title(name: &mut String) {
    // Mutable borrow: can modify
    name.push_str(", Software Engineer");
}

fn take_and_process(name: String) {
    // Move: takes ownership
    println!("Processing: {}", name);
} // name is dropped here

fn main() {
    let mut person = String::from("Alice");

    print_name(&person);           // Borrow (immutable)
    add_title(&mut person);        // Borrow (mutable)
    println!("{}", person);        // Still own it

    take_and_process(person);      // Move ownership

    // println!("{}", person);     // ERROR! person was moved
}
```

Walk through this:

1. `print_name()` borrows immutably → can read, can't modify
2. `add_title()` borrows mutably → can read and modify
3. We still own `person` after both calls
4. `take_and_process()` takes ownership → person is gone after this
5. We can't use `person` anymore

---

## Quick Reference

| What                 | How                          | Example                                                  |
| -------------------- | ---------------------------- | -------------------------------------------------------- |
| **Ownership**        | One owner per value          | `let x = String::from("hi");`                            |
| **Immutable Borrow** | Read without owning          | `let r = &x;` or `fn f(x: &String)`                      |
| **Mutable Borrow**   | Read & modify without owning | `let r = &mut x;` or `fn f(x: &mut String)`              |
| **Move**             | Transfer ownership           | `let y = x;` (for non-Copy types) or `take_ownership(x)` |

---

## Why Rust Is Actually Your Friend

This feels strict at first. You'll get compile errors that seem annoying.

But here's the thing: **every error Rust gives you is a bug you would've had to debug later.** Use-after-free, data races, memory leaks, Rust catches them before your code even runs.

Other languages don't know who owns data. Rust does. And that's powerful.

The core principle: **Rust ensures memory safety by always knowing who owns data and who's allowed to use it.**
