---
slug: day-5-rust-stack-vs-heap
title: "Day 5: Stack vs Heap (How Rust Stores Data)"
date: 2026-01-29
readTime: 9 min
category: rust
tags:
  - rust
  - beginner
  - memory
  - stack
  - heap
  - ownership
excerpt: "The missing puzzle piece behind ownership: stack is fast for fixed-size values, heap is flexible for growable data. Rust uses both, but makes sure you can’t misuse either."
---

# Stack vs Heap in Rust (and why it makes ownership click)

In Day 1, the big idea was: **one owner, temporary borrows, and moves when ownership changes**.
That whole model is basically Rust’s way of answering:

**“Who is responsible for freeing memory, and when?”**

To understand *why* Rust is so strict (and why it’s worth it), you need to know the two main places data can live:

- **Stack** (fast, fixed-size, automatic)
- **Heap** (flexible, dynamic, must be managed)

Rust uses both. And the ownership system is the guardrail that keeps heap memory safe without a garbage collector.

---

## The Stack: fast, simple, predictable

The **stack** is where function calls store their local variables.

Think of it like a pile of plates:

- You **push** a new stack frame when a function starts
- You **pop** it when the function ends
- Everything inside that frame disappears together

### What typically lives on the stack?

Values that have a **known size at compile time**, like:

- integers (`i32`, `u64`)
- booleans (`bool`)
- fixed-size arrays (`[i32; 3]`)
- tuples with fixed-size parts (`(i32, bool)`)

```rust
fn main() {
    let x: i32 = 10;             // stack
    let y: bool = true;          // stack
    let a: [i32; 3] = [1, 2, 3];  // stack (fixed size)
    let t: (i32, bool) = (7, false); // stack
}
```

**Why stack is fast:**
- allocation is basically “move the stack pointer”
- freeing is automatic when the scope ends

No searching for memory. No cleanup code. It’s just *gone*.

---

## The Heap: flexible, but needs rules

The **heap** is for data that is:

- **dynamic-sized** (size not known at compile time), or
- **growable** (like `String`, `Vec`), or
- **too big** to comfortably keep on the stack

Heap allocation is more expensive because the program must ask the allocator:
> “Give me N bytes that can live beyond this moment.”

### Common heap-backed types in Rust

- `String` (growable UTF-8 text)
- `Vec<T>` (growable array)
- `HashSet<T>` / `HashMap<K,V>` (internal tables on heap)

```rust
fn main() {
    let s = String::from("scrapy"); // heap-backed
    let v = vec![1, 2, 3, 4];       // heap-backed
}
```

---

## The key Rust trick: “stack handle, heap data”

This part is *the* mental model.

When you write:

```rust
let s = String::from("hello");
```

It’s not “String lives on heap”.

What actually happens is:

- A small **String struct** lives on the **stack**
- The actual characters `"hello"` live on the **heap**

You can picture it like:

- **stack**: `s = { ptr, len, capacity }`
- **heap**: the bytes for `"hello"`

Same with `Vec<T>`:

- **stack**: `{ ptr, len, capacity }`
- **heap**: the elements

So when you “move a String”, you’re usually just moving that small **stack handle** (pointer + metadata), not copying all heap bytes.

---

## Move vs Copy makes more sense now

### Copy types (usually stack-only)

`i32` is `Copy`, so assignment duplicates the value:

```rust
fn main() {
    let a = 5;
    let b = a; // copies
    println!("{a} {b}"); // both valid
}
```

### Heap-backed types (move by default)

`String` is NOT `Copy`. Rust moves ownership:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // move (no deep copy)

    // println!("{s1}"); // ERROR: s1 was moved
    println!("{s2}");   // OK
}
```

**Why Rust moves instead of copying:**
Copying a `String` would mean copying heap bytes too. That can be slow and expensive.

Rust says:
- “I’ll move the handle.”
- “Only one owner can free the heap allocation.”

This connects directly to Day 1’s rule: **every value has exactly one owner**.

---

## Borrowing is about safe access to memory

When you borrow, you get a reference:

- `&T` = read-only pointer
- `&mut T` = read/write pointer

A reference itself is usually a small value stored on the stack (basically an address).
But it points to data that might be on the stack *or* heap.

Rust’s rules prevent two classic disasters:

1. **Use-after-free** (reference outlives the data)
2. **Data races / corruption** (multiple writers or writer + readers)

This is why the “no mutable + immutable at the same time” rule exists (Day 1).

---

## Who frees heap memory? The owner (Drop)

In Rust, heap memory is freed automatically when the **owner goes out of scope**.

```rust
fn main() {
    let s = String::from("hello");
    println!("{s}");
} // s is dropped here, heap memory is freed
```

No `free()`. No garbage collector.

This is called RAII (Resource Acquisition Is Initialization), but you don’t need to memorize the term.
The important part is:

**When the owner dies, the heap allocation dies.**

---

## When does Rust use stack vs heap?

Here’s a useful rule of thumb:

### Rust uses the stack when:
- size is known at compile time
- data is small and local
- it can be stored directly inside a stack frame

Examples: numbers, bools, fixed arrays, small structs.

### Rust uses the heap when:
- size is dynamic or growable (`String`, `Vec`)
- you want data to outlive the current scope in a flexible way
- you explicitly request it (`Box<T>`)
- the type is unsized behind a pointer (`dyn Trait`, slices `str`, `[T]` behind references)

---

---

## Why this matters for Rust memory safety + ownership

If Rust allowed this kind of thing:

- two owners of the same heap pointer
- or references living longer than the data
- or multiple mutable references at once

…you’d get the exact bugs that C/C++ programmers fight all day:

- **double free**
- **use after free**
- **memory leaks**
- **data races**

Rust’s ownership + borrowing rules exist to stop these *before the program runs*.

So the “strictness” is not random.
It’s literally Rust protecting the boundary where heap memory would otherwise be unsafe.

---

## Quick Reference

| Concept | Stack | Heap |
| --- | --- | --- |
| Allocation | Very fast | Slower (allocator) |
| Size | Fixed/known | Dynamic/growable |
| Lifetime | Scoped to stack frame | Managed explicitly (via owner) |
| Typical Rust types | `i32`, `bool`, `[T; N]`, small structs | `String`, `Vec<T>`, `Box<T>`, `HashMap` |
| Rust safety angle | “auto cleanup” at scope end | ownership ensures exactly one free |

---

## A small practical example: Vec and moves

This is the same move/borrow idea from Day 1 and Day 2, but now you know what’s happening in memory.

```rust
fn main() {
    let v1 = vec![1, 2, 3];

    // Move: v1's stack handle moves to v2
    // heap allocation stays in place
    let v2 = v1;

    // println!("{:?}", v1); // ERROR (v1 moved)

    // Borrow: reference to v2's handle + heap data
    let r = &v2;
    println!("{:?}", r); // OK
}
```

**What moved?**
Just the small `{ptr, len, cap}` on the stack.
The heap buffer never “moved around” in memory.

---

## The takeaway

- Stack is fast for fixed-size values.
- Heap is flexible for growable data.
- Rust stores a **small handle on the stack** that points to **heap data** for types like `String` and `Vec`.
- Ownership exists so heap allocations get freed exactly once.
- Borrowing exists so references never outlive the data and never cause unsafe aliasing.

Once you see stack vs heap, ownership stops being “rules” and starts being “the safety system”.
