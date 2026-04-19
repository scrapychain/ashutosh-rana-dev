---
slug: rust-ownership-deep-dive
title: "Ownership & Borrowing in Rust Deep Dive"
date: 2026-02-24
readTime: 14 min
category: rust
tags:
  - rust
  - beginner
  - ownership
  - borrowing
  - references
excerpt: "Ownership is Rust's core idea. Learn how values move, how borrowing works, when to use *, and how iterators fit into the picture."
---

# Ownership & Borrowing in Rust Deep Dive

Ownership is the idea everything else in Rust is built on. Once you understand it, the compiler stops feeling like it's fighting you and starts feeling like it has your back.

Here's the core rule: every value has exactly one owner at a time. When the owner goes out of scope, the value is dropped. You can lend a value out temporarily (borrow it), but you can't give it away while it's lent. That's it. Everything else follows from this.

## Copy vs Move: The Fundamental Split

When you assign a value to another variable, one of two things happens: it either gets copied or moved. Which one depends on the type.

### Copy Types

Types stored entirely on the stack — `i32`, `bool`, `char`, `f64`, `usize` — are copied on assignment. Both the original and the new variable stay valid.

```rust
fn main() {
    let x: i32 = 42;
    let y = x;       // x is COPIED into y
    println!("{x}"); // ✅ x is still valid

    let t1: (i32, bool) = (10, true);
    let t2 = t1;     // tuples of Copy types are also Copy
    println!("{:?}", t1); // ✅ still valid
}
```

### Non-Copy Types (Move Semantics)

Types that own heap memory — `String`, `Vec<T>`, `HashSet<T>` — are moved on assignment. The original is invalidated.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;       // s1 MOVED into s2
    // println!("{s1}"); // ❌ value used after move

    let v1 = vec![1, 2, 3];
    let v2 = v1;       // MOVE
    // println!("{:?}", v1); // ❌ use of moved value
}
```

You have two ways to fix this:

```rust
fn main() {
    // Option 1: Clone — makes an independent copy
    let s1 = String::from("hello");
    let s2 = s1.clone();
    println!("{s1} {s2}"); // ✅ both valid

    // Option 2: Borrow — s2 points to s1, doesn't own it
    let s1 = String::from("hello");
    let s2 = &s1;
    println!("{s1} {s2}"); // ✅ both valid
}
```

The same applies to function calls. Passing a `String` into a function moves it. After the call, you no longer have access.

```rust
fn take_ownership(s: String) {
    println!("{s}");
} // s is dropped here

fn main() {
    let s = String::from("hello");
    take_ownership(s);
    // println!("{s}"); // ❌ s was moved into the function
}
```

Fix it by passing a reference instead:

```rust
fn borrow_it(s: &String) {
    println!("{s}");
}

fn main() {
    let s = String::from("hello");
    borrow_it(&s);
    println!("{s}"); // ✅ s never moved
}
```

## Borrowing: &T and &mut T

Borrowing is how you use a value without taking ownership of it. There are two kinds.

### Shared References &T

Multiple shared references can exist at the same time. You can read through them but not write.

```rust
fn main() {
    let s = String::from("hello");
    let r1 = &s;
    let r2 = &s; // ✅ multiple shared refs are fine
    println!("{r1} {r2}");
}
```

### Exclusive References &mut T

Only one mutable reference can exist at a time. No shared references can coexist with it. This is how Rust prevents data races at compile time.

```rust
fn main() {
    let mut s = String::from("hello");
    let r = &mut s;
    r.push_str(" world"); // ✅
    // let r2 = &s; // ❌ can't borrow as immutable while mutably borrowed
    println!("{r}");
}
```

The rule in one place:

```
At any given time, for a value T, you may have EITHER:
  - Any number of &T (shared borrows)   OR
  - Exactly one &mut T (exclusive borrow)

But NEVER both at the same time.
```

### Borrowing from a Vec

You can't move an element out of a `Vec` by index. The Vec owns its elements, and pulling one out would leave it in an invalid state.

```rust
fn main() {
    let v = vec![String::from("a"), String::from("b")];
    // let first = v[0]; // ❌ cannot move out of index of Vec<String>

    // Your options:
    let first = v[0].clone();           // Option A: clone it
    let first: &String = &v[0];        // Option B: borrow it

    let mut v2 = vec![String::from("a"), String::from("b")];
    let first = v2.remove(0);          // Option C: remove it (Vec shrinks)
}
```

For Copy types like `i32`, indexing just works because Rust copies the value silently.

```rust
fn main() {
    let v = vec![10, 20, 30];
    let x: i32 = v[1]; // ✅ i32 is Copy — Rust copies it automatically
    let r: &i32 = &v[1]; // ✅ or just borrow it
}
```

## Dereferencing: When Do You Need \*?

`*` follows a reference to the value it points to. Rust handles a lot of this automatically, but not always.

### When \* Is Required

You need `*` for arithmetic and comparisons, assigning through a mutable reference, and when working inside iterators.

```rust
fn main() {
    let x = 5i32;
    let r = &x;
    let sum = *r + 10; // ✅ must deref to do arithmetic
    // let sum = r + 10; // ❌ can't add &i32 + i32

    let mut val = 5;
    let rm = &mut val;
    *rm = 10; // ✅ assign through mutable reference
    // rm = 10; // ❌ that would try to reassign the reference itself

    let nums = vec![1, 2, 3];
    for x in &nums {
        // x is &i32
        let doubled = *x * 2; // must deref for arithmetic
        println!("{doubled}");
    }
}
```

### When \* Is NOT Required (Auto-Deref)

Rust inserts `*` automatically for method calls, format macros, and indexing.

```rust
fn main() {
    let s = String::from("hello");
    let r = &s;

    println!("{}", r.len()); // ✅ auto-deref — no * needed
    println!("{r}");         // ✅ auto-deref in format macros

    let v = vec![1, 2, 3];
    let rv = &v;
    let elem = rv[0]; // ✅ auto-deref — Rust figures out the indexing
}
```

### The Copy Rule Through \*

This is the detail people miss. Whether `*` works depends on whether the type is `Copy`.

```rust
fn main() {
    // Copy type — deref and copy works fine
    let x: i32 = 5;
    let r: &i32 = &x;
    let y: i32 = *r; // ✅ i32 is Copy

    // Non-Copy type — deref to move is FORBIDDEN
    let s = String::from("hello");
    let r: &String = &s;
    // let owned: String = *r; // ❌ can't move out of a shared reference
    let owned: String = r.clone(); // ✅ clone it instead
}
```

When you dereference a non-Copy type, Rust would need to move the value — but the original owner still exists, so it refuses.

## Iterators: iter, iter_mut, into_iter

These three methods give you different levels of access to a collection.

```
.iter()      → &T     → borrows the collection (immutably)
.iter_mut()  → &mut T → borrows the collection (mutably)
.into_iter() → T      → consumes (moves) the collection
```

### iter() — Read Only

```rust
fn main() {
    let v = vec![String::from("a"), String::from("b"), String::from("c")];

    for s in v.iter() {
        // s is &String
        println!("{s}");
        // let owned: String = *s; // ❌ can't move out of &String
        let owned: String = s.clone(); // ✅
    }

    println!("{:?}", v); // ✅ v is still valid
}
```

### iter_mut() — Modify In Place

```rust
fn main() {
    let mut v = vec![1, 2, 3];
    for n in v.iter_mut() {
        // n is &mut i32
        *n *= 2; // must deref to write through mutable reference
    }
    println!("{:?}", v); // [2, 4, 6]
}
```

```rust
fn main() {
    let mut strings = vec![String::from("hello"), String::from("world")];
    for s in strings.iter_mut() {
        // s is &mut String
        s.push('!'); // ✅ method calls auto-deref
    }
    println!("{:?}", strings); // ["hello!", "world!"]
}
```

### into_iter() — Take Ownership

```rust
fn main() {
    let v = vec![String::from("a"), String::from("b")];
    for s in v.into_iter() {
        // s is String — you own it
        let upper = s.to_uppercase();
        println!("{upper}");
    }
    // println!("{:?}", v); // ❌ v was moved into the iterator
}
```

For Copy types, `into_iter()` copies each element — but the collection itself is still consumed.

### Nested Loops

```rust
fn main() {
    let matrix: Vec<Vec<i32>> = vec![
        vec![1, 2, 3],
        vec![4, 5, 6],
    ];

    // Borrow everything — matrix stays intact
    for row in &matrix {      // row: &Vec<i32>
        for val in row {      // val: &i32
            print!("{val} ");
        }
        println!();
    }
    println!("{:?}", matrix); // ✅ still valid

    // Mutate in place
    let mut m2: Vec<Vec<i32>> = vec![vec![1, 2], vec![3, 4]];
    for row in &mut m2 {      // row: &mut Vec<i32>
        for val in row {      // val: &mut i32
            *val *= 10;
        }
    }
    println!("{:?}", m2); // [[10, 20], [30, 40]]
}
```

## Closure Patterns: |x| vs |&x|

When iterating with closures, the parameter type matters.

```rust
fn main() {
    let nums = vec![1, 2, 3];

    // x is &i32 — you need *x for arithmetic
    let sum = nums.iter().fold(0, |acc, x| acc + *x); // ✅

    // |&x| destructures the reference — x becomes i32 directly
    let sum = nums.iter().fold(0, |acc, &x| acc + x); // ✅

    // For non-Copy types, you can't destructure — keep x as &String
    let strs = vec![String::from("a"), String::from("b")];
    strs.iter().for_each(|s| println!("{s}")); // s is &String ✅
    // strs.iter().for_each(|&s| println!("{s}")); // ❌ can't move out of &String
}
```

`.copied()` is a cleaner way to convert `&i32` to `i32` without manual deref:

```rust
fn main() {
    let nums = vec![1, 2, 3];
    let doubled: Vec<i32> = nums.iter().copied().map(|x| x * 2).collect();
    println!("{:?}", doubled); // [2, 4, 6]

    // For non-Copy types, use .cloned()
    let strings = vec![String::from("a"), String::from("b")];
    let owned: Vec<String> = strings.iter().cloned().collect();
}
```

## Quick Reference: Do I Need \*?

```
Calling a method?          → Never need *  (auto-deref)
Printing with println!?    → Never need *  (auto-deref)
Doing arithmetic?          → Yes, *r + 10
Assigning through &mut T?  → Yes, *r = value
Comparing &T to T?         → Yes, *r == 5
Iterating with .iter()?    → Items are &T; use *x if you need the value
Non-Copy type through &T?  → You CANNOT move; borrow or .clone()
```

## Key Takeaway

Ownership, borrowing, and references are not separate concepts — they're one system. Every rule flows from a single idea: each value has exactly one owner, and the compiler enforces this at compile time so you never have to at runtime.

The patterns repeat everywhere:

- Use `&T` when you just need to read.
- Use `&mut T` when you need to modify.
- Use `.clone()` when you need a new owned copy.
- Use `into_iter()` when you're done with the original.

Once these click, you'll stop reading compiler errors as obstacles and start reading them as directions.
