---
slug: day-3-rust-iterators
title: "Day 3: Iterators and Methods"
date: 2026-01-27
readTime: 8 min
category: rust
tags:
  - rust
  - beginner
  - iterators
  - methods
  - vectors
  - hashsets
excerpt: "Iterators let you loop through collections lazily. Learn the different ways to iterate over Vecs and HashSets, and what methods are available on each."
---

# Iterators in Rust: Loops, Lazy Evaluation, and Methods

You already know how to loop through collections with `for` loops. But Rust has something more powerful: **iterators**.

An iterator is basically a thing that goes through a collection one element at a time. The cool part? Iterators are lazy. They don't do work until you ask them to.

Let me show you what that means.

## Three Ways to Iterate: The Fundamental Pattern

When you iterate over a collection, you have three choices based on ownership.

```rust
let vec = vec![1, 2, 3];

// 1. Iterate by reference (borrow)
for x in &vec {
    println!("{}", x);  // Borrow. vec still exists after loop.
}
println!("{:?}", vec);  // OK

// 2. Iterate by mutable reference (borrow mutably)
let mut vec = vec![1, 2, 3];
for x in &mut vec {
    *x += 10;  // Modify each element
}
println!("{:?}", vec);  // [11, 12, 13]

// 3. Iterate by consuming (move)
let vec = vec![1, 2, 3];
for x in vec {  // No &. vec is consumed.
    println!("{}", x);
}
// println!("{:?}", vec);  // ERROR! vec is gone
```

This pattern repeats everywhere. It's the same ownership rules from Day 1 and Day 2.

## Iterator Methods vs For Loops

A `for` loop is the easy way. But sometimes you want more control. That's where iterator methods come in.

```rust
let numbers = vec![1, 2, 3, 4, 5];

// For loop (simple)
for n in &numbers {
    println!("{}", n);
}

// Iterator chain (more powerful)
numbers.iter().for_each(|n| {
    println!("{}", n);
});
```

Both do the same thing. But with iterator methods, you can chain operations together.

## Vectors: Iterator Methods

### .iter() - Borrow Immutably

Returns an iterator that borrows each element.

```rust
let vec = vec![1, 2, 3, 4, 5];

vec.iter().for_each(|x| {
    println!("{}", x);
});

println!("{:?}", vec);  // vec still exists
```

### .iter_mut() - Borrow Mutably

Returns an iterator that borrows mutably. You can modify elements.

```rust
let mut vec = vec![1, 2, 3];

vec.iter_mut().for_each(|x| {
    *x *= 2;
});

println!("{:?}", vec);  // [2, 4, 6]
```

### .into_iter() - Consume

Takes ownership. The original vector is consumed.

```rust
let vec = vec![1, 2, 3];

vec.into_iter().for_each(|x| {
    println!("{}", x);
});

// println!("{:?}", vec);  // ERROR! vec is gone
```

## Chaining Iterator Methods

The power of iterators is chaining. You can combine multiple operations.

```rust
let numbers = vec![1, 2, 3, 4, 5];

numbers
    .iter()
    .map(|x| x * 2)      // Double each number
    .filter(|x| x > &5)  // Keep only > 5
    .for_each(|x| {
        println!("{}", x);  // 6, 8, 10
    });
```

Let's break this down:

1. `.iter()` - get an iterator (borrow)
2. `.map(|x| x * 2)` - transform each element
3. `.filter(|x| x > &5)` - keep only matching elements
4. `.for_each(|x| println!("{}", x))` - do something with each

Each step transforms the data lazily. Nothing happens until `.for_each()` at the end actually consumes the iterator.

## Common Iterator Methods

### .map() - Transform Elements

```rust
let numbers = vec![1, 2, 3];
let doubled: Vec<i32> = numbers
    .iter()
    .map(|x| x * 2)
    .collect();

println!("{:?}", doubled);  // [2, 4, 6]
```

### .filter() - Keep Matching Elements

```rust
let numbers = vec![1, 2, 3, 4, 5];
let evens: Vec<i32> = numbers
    .iter()
    .filter(|x| x % 2 == 0)
    .copied()
    .collect();

println!("{:?}", evens);  // [2, 4]
```

Note: `.copied()` converts borrowed values to copies (for Copy types).

### .fold() - Accumulate a Result

```rust
let numbers = vec![1, 2, 3, 4, 5];
let sum = numbers
    .iter()
    .fold(0, |acc, x| acc + x);

println!("{}", sum);  // 15
```

`fold` takes an initial value and a function. It combines all elements into one result.

### .collect() - Gather Into a Collection

```rust
let numbers = vec![1, 2, 3];
let doubled: Vec<i32> = numbers
    .iter()
    .map(|x| x * 2)
    .collect();

println!("{:?}", doubled);  // [2, 4, 6]
```

`.collect()` gathers the iterator results into a new collection. You need to specify the type.

### .find() - Get First Matching Element

```rust
let numbers = vec![1, 2, 3, 4, 5];
let first_even = numbers
    .iter()
    .find(|x| x % 2 == 0);

println!("{:?}", first_even);  // Some(&2)
```

Returns `Option`. `None` if nothing matches.

### .any() and .all() - Boolean Checks

```rust
let numbers = vec![1, 2, 3, 4, 5];

let has_even = numbers.iter().any(|x| x % 2 == 0);
println!("{}", has_even);  // true

let all_positive = numbers.iter().all(|x| x > &0);
println!("{}", all_positive);  // true
```

## HashSets: Iterator Methods

HashSets follow the same pattern as Vectors, but remember: no order.

### .iter() - Borrow Immutably

```rust
use std::collections::HashSet;

let set: HashSet<i32> = vec![1, 2, 3].into_iter().collect();

set.iter().for_each(|x| {
    println!("{}", x);  // Order not guaranteed
});

println!("{:?}", set);  // set still exists
```

### .iter_mut() - Borrow Mutably

```rust
use std::collections::HashSet;

let mut set: HashSet<i32> = vec![1, 2, 3].into_iter().collect();

set.iter_mut().for_each(|x| {
    // Note: Modifying elements in a HashSet is dangerous
    // Can break the hash structure. Usually avoid this.
    println!("{}", x);
});
```

(In practice, you rarely modify elements in a HashSet directly.)

### .into_iter() - Consume

```rust
use std::collections::HashSet;

let set: HashSet<i32> = vec![1, 2, 3].into_iter().collect();

set.into_iter().for_each(|x| {
    println!("{}", x);
});

// println!("{:?}", set);  // ERROR! set is gone
```

## Chaining on HashSets

Same chaining works on HashSets.

```rust
use std::collections::HashSet;

let numbers: HashSet<i32> = vec![1, 2, 3, 4, 5].into_iter().collect();

let result: HashSet<i32> = numbers
    .iter()
    .filter(|x| x % 2 == 0)
    .copied()
    .collect();

println!("{:?}", result);  // {2, 4}
```

## Vec vs HashSet Iterator Performance

| Operation                  | Vec            | HashSet         |
| -------------------------- | -------------- | --------------- |
| `.iter()`                  | Fast, in order | Fast, unordered |
| `.filter()`                | O(n)           | O(n)            |
| `.find()`                  | O(n)           | O(n)            |
| Direct check `.contains()` | O(n)           | O(1)            |

For membership checks, use `.contains()` directly instead of iterating. HashSet is optimized for that.

```rust
use std::collections::HashSet;

let set: HashSet<i32> = vec![1, 2, 3].into_iter().collect();

// Good: O(1)
if set.contains(&2) {
    println!("found");
}

// Worse: O(n)
if set.iter().any(|x| x == &2) {
    println!("found");
}
```

## Practical Example: Processing User IDs

```rust
use std::collections::HashSet;

fn main() {
    let user_ids = vec![101, 102, 103, 104, 105];

    // Find all active users (assume > 100 means active)
    let active: Vec<i32> = user_ids
        .iter()
        .filter(|id| id > &&100)
        .copied()
        .collect();

    println!("Active: {:?}", active);  // [101, 102, 103, 104, 105]

    // Get unique IDs from multiple lists
    let list1: HashSet<i32> = vec![1, 2, 3].into_iter().collect();
    let list2: HashSet<i32> = vec![2, 3, 4].into_iter().collect();

    let all_users: HashSet<i32> = list1
        .iter()
        .chain(list2.iter())
        .copied()
        .collect();

    println!("All unique: {:?}", all_users);  // {1, 2, 3, 4}
}
```

## Why Iterators Matter

At first, iterators seem like extra work. But they're powerful because:

1. **Lazy evaluation** - work only happens when needed
2. **Composable** - chain multiple operations cleanly
3. **Efficient** - Rust optimizes iterator chains
4. **Expressive** - code reads like what you want to do

The `for` loop is fine for simple cases. But once you need to transform or filter data, iterators make it cleaner.

## Key Takeaway

Vectors and HashSets both support `.iter()`, `.iter_mut()`, and `.into_iter()`. Chain methods like `.map()`, `.filter()`, `.fold()` to transform data. Use `.collect()` to gather results into a new collection.

Same ownership rules as Day 1 and 2. The iterator just gives you more control and composability.
