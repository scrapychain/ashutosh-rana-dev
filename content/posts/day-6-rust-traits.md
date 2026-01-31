---
slug: day-6-rust-traits
title: "Day 6: Introduction to Traits"
date: 2026-01-30
readTime: 5 min
category: rust
tags:
  - rust
  - beginner
  - traits
  - interfaces
excerpt: "Traits define shared behavior. They're like contracts that say 'if you implement this behavior, you need these methods'."
---

# Introduction to Traits in Rust

A trait is a way to define shared behavior. It's a contract that says: "If you implement me, you promise to have these methods."

Think of it like describing what something should be able to do.

## What's a Trait?

A trait lists methods without writing what they do.

```rust
trait Printer {
    fn print(&self);
}
```

That's it. `Printer` says: "Any type that implements me must have a `print()` method."

## Implementing a Trait

You can implement traits for built-in types too.

```rust
trait Printer {
    fn print(&self);
}

impl Printer for i32 {
    fn print(&self) {
        println!("Number: {}", self);
    }
}

impl Printer for String {
    fn print(&self) {
        println!("Text: {}", self);
    }
}

fn main() {
    let num: i32 = 42;
    let text = String::from("hello");

    num.print();    // Number: 42
    text.print();   // Text: hello
}
```

Now both `i32` and `String` can `print()`. Different types, same behavior.

## Using Traits in Functions

You can write a function that works with any type that implements a trait.

```rust
fn do_print(item: &dyn Printer) {
    item.print();
}

fn main() {
    let num: i32 = 42;
    let text = String::from("hello");

    do_print(&num);    // Works
    do_print(&text);   // Works
}
```

`&dyn Printer` means "a reference to any type that implements Printer." One function, different types.

## Default Implementations

You can give traits default methods. Types can use them or override them.

```rust
trait Speaker {
    fn speak(&self);

    fn greet(&self) {
        println!("Hello!");
    }
}

impl Speaker for i32 {
    fn speak(&self) {
        println!("I'm a number: {}", self);
    }
    // greet() uses the default
}

fn main() {
    let num: i32 = 5;
    num.speak();   // I'm a number: 5
    num.greet();   // Hello!
}
```

## Trait Bounds

Use trait bounds to say "this function only works with types that implement this trait."

```rust
fn do_something<T: Speaker>(item: &T) {
    item.speak();
    item.greet();
}

fn main() {
    let num: i32 = 5;
    do_something(&num);  // Works

    let text = "hello";
    do_something(&text);  // ERROR! &str doesn't implement Speaker
}
```

`T: Speaker` means "T must implement Speaker."

## Common Built-in Traits

Rust has traits you'll use constantly.

### Debug

Lets you print with `{:?}`.

```rust
fn main() {
    let num = 42;
    println!("{:?}", num);  // 42

    let vec = vec![1, 2, 3];
    println!("{:?}", vec);  // [1, 2, 3]
}
```

Numbers and vectors already implement Debug. That's why `{:?}` works.

### Clone

Lets you copy a value explicitly.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();  // Make a copy

    println!("{}", s1);  // hello
    println!("{}", s2);  // hello
}
```

`String` implements `Clone`. That's why `.clone()` works.

### Copy

Small types are automatically copied.

```rust
fn main() {
    let x = 5;
    let y = x;  // Automatic copy (i32 implements Copy)

    println!("{}", x);  // 5
    println!("{}", y);  // 5
}
```

Numbers implement `Copy`. Strings don't (too big to copy automatically).

## Why Traits Matter

Traits let you:

1. **Define behavior** - what something should be able to do
2. **Write flexible code** - functions that work with many types
3. **Share interfaces** - different types doing similar things

When you see `.clone()`, `.print()`, or use `{:?}`, you're using traits.

## Simple Example

```rust
trait Calculator {
    fn calculate(&self) -> i32;
}

impl Calculator for i32 {
    fn calculate(&self) -> i32 {
        self * 2
    }
}

impl Calculator for String {
    fn calculate(&self) -> i32 {
        self.len() as i32
    }
}

fn show_result(item: &dyn Calculator) {
    println!("Result: {}", item.calculate());
}

fn main() {
    let num: i32 = 5;
    let text = String::from("hello");

    show_result(&num);   // Result: 10 (5 * 2)
    show_result(&text);  // Result: 5 (length)
}
```

Different types. Same function. That's traits.

## Key Takeaway

Traits are contracts that define behavior. A type can implement a trait and promise to have certain methods. Use `&dyn TraitName` to work with any type that implements that trait.

You're already using traits with `.clone()`, `.len()`, and `{:?}`. Now you understand what's happening underneath.
