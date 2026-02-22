---
slug: day-29-rust-ranges
title: "Day 29: Understanding Range Types in Rust"
date: 2026-02-20
readTime: 10 min
category: rust
tags:
  - rust
  - beginner
  - ranges
  - iteration
  - loops
excerpt: "Ranges represent sequences of values. Learn the different range types and how to use them for loops, slicing, and collections."
---

# Understanding Range Types in Rust

You've used ranges in loops without thinking about it. `for i in 0..10` is a range. But ranges are more powerful than that.

A range represents a sequence of values. It's a type. It has methods. You can do things with it.

Let me show you what ranges actually are.

## What Is a Range?

A range is a type that represents a sequence of values from a start to an end.

```rust
fn main() {
    let r = 0..10;  // Range from 0 to 10 (exclusive)
    println!("{:?}", r);  // 0..10
}
```

The range itself isn't printed as individual numbers. It's the range object. But you can iterate through it.

---

## Importing Range Types from std

Range types are part of the Rust standard library in `std::ops`. Most of the time you don't need to explicitly import them because they're in the **prelude** (automatically imported).

But if you want to be explicit about it:

```rust
use std::ops::Range;
use std::ops::RangeInclusive;
use std::ops::RangeFrom;
use std::ops::RangeTo;
use std::ops::RangeToInclusive;
use std::ops::RangeFull;

fn main() {
    let r: Range<i32> = 0..10;
    println!("{:?}", r);  // 0..10
}
```

You don't usually do this because ranges work without explicit imports:

```rust
fn main() {
    // No import needed, this works automatically
    for i in 0..10 {
        println!("{}", i);
    }
}
```

### Range Types Available in std::ops

| Type                 | Syntax        | Example  | Use                               |
| -------------------- | ------------- | -------- | --------------------------------- |
| **Range**            | `start..end`  | `0..10`  | Exclusive range                   |
| **RangeInclusive**   | `start..=end` | `0..=10` | Inclusive range                   |
| **RangeFrom**        | `start..`     | `5..`    | From start to end (unbounded)     |
| **RangeTo**          | `..end`       | `..10`   | From beginning to end (unbounded) |
| **RangeToInclusive** | `..=end`      | `..=10`  | From beginning to end (inclusive) |
| **RangeFull**        | `..`          | `..`     | Full range (all values)           |

### When You Might Need to Import

Import Range types when:

1. **Type annotations** - You want to explicitly type a parameter

```rust
use std::ops::Range;

fn process_range(r: Range<i32>) {
    for i in r {
        println!("{}", i);
    }
}

fn main() {
    process_range(5..15);
}
```

2. **Pattern matching** - Matching on range types

```rust
use std::ops::Range;

fn check_range(r: Range<i32>) {
    match r.start() {
        0 => println!("Starts at zero"),
        _ => println!("Starts elsewhere"),
    }
}
```

### Practical Example with Explicit Imports

You might explicitly import and type range parameters in functions:

```rust
use std::ops::RangeInclusive;

struct DataProcessor {
    data: Vec<u64>,
}

impl DataProcessor {
    fn get_data_in_range(&self, range: RangeInclusive<usize>) -> Vec<u64> {
        self.data
            .iter()
            .enumerate()
            .filter(|(i, _)| range.contains(&i))
            .map(|(_, &value)| value)
            .collect()
    }
}

fn main() {
    let processor = DataProcessor {
        data: vec![100, 101, 102, 103, 104, 105],
    };

    let values = processor.get_data_in_range(1..=4);
    println!("{:?}", values);  // [101, 102, 103, 104]
}
```

In most cases, you don't need to import. But when writing functions that take ranges as parameters or doing type-heavy code, explicit imports make your intent clear.

---

## Range Types in Rust

There are several range types depending on whether the end is inclusive or exclusive.

### Exclusive Range (Start..End)

Includes start, excludes end.

```rust
fn main() {
    for i in 0..5 {
        println!("{}", i);  // 0, 1, 2, 3, 4 (NOT 5)
    }
}
```

Output:

```
0
1
2
3
4
```

### Inclusive Range (Start..=End)

Includes both start and end.

```rust
fn main() {
    for i in 0..=5 {
        println!("{}", i);  // 0, 1, 2, 3, 4, 5
    }
}
```

Output:

```
0
1
2
3
4
5
```

### Full Range (..)

All values. Usually used for slicing.

```rust
fn main() {
    let vec = vec![1, 2, 3, 4, 5];

    // Get all elements
    let all = &vec[..];
    println!("{:?}", all);  // [1, 2, 3, 4, 5]
}
```

### Open-Ended Ranges

Start without end, or end without start.

```rust
fn main() {
    let vec = vec![1, 2, 3, 4, 5];

    // From index 2 to end
    let from_two = &vec[2..];
    println!("{:?}", from_two);  // [3, 4, 5]

    // From start to index 3 (exclusive)
    let to_three = &vec[..3];
    println!("{:?}", to_three);  // [1, 2, 3]

    // From start to index 3 (inclusive)
    let to_three_inc = &vec[..=3];
    println!("{:?}", to_three_inc);  // [1, 2, 3, 4]
}
```

## Range Methods

Ranges have methods you can use.

### .start() and .end()

Get the start and end values.

```rust
fn main() {
    let r = 5..15;

    println!("Start: {}", r.start());  // 5
    println!("End: {}", r.end());      // 15
}
```

### .contains()

Check if a value is in the range.

```rust
fn main() {
    let r = 5..15;

    println!("{}", r.contains(&10));  // true
    println!("{}", r.contains(&20));  // false
    println!("{}", r.contains(&5));   // true (start is included)
    println!("{}", r.contains(&15));  // false (end is excluded)
}
```

### .count()

Count how many values are in the range.

```rust
fn main() {
    let r1 = 0..10;
    println!("{}", r1.count());  // 10

    let r2 = 0..=10;
    println!("{}", r2.count());  // 11

    let r3 = 5..5;
    println!("{}", r3.count());  // 0 (empty range)
}
```

### .step_by()

Iterate with a step (skip values).

```rust
fn main() {
    for i in (0..10).step_by(2) {
        println!("{}", i);  // 0, 2, 4, 6, 8
    }
}
```

### .rev()

Reverse the range.

```rust
fn main() {
    for i in (0..5).rev() {
        println!("{}", i);  // 4, 3, 2, 1, 0
    }
}
```

### .collect()

Convert range to a Vec.

```rust
fn main() {
    let vec: Vec<i32> = (0..5).collect();
    println!("{:?}", vec);  // [0, 1, 2, 3, 4]
}
```

### .map()

Transform each value in the range.

```rust
fn main() {
    let doubled: Vec<i32> = (0..5)
        .map(|x| x * 2)
        .collect();

    println!("{:?}", doubled);  // [0, 2, 4, 6, 8]
}
```

### .filter()

Keep only values that match a condition.

```rust
fn main() {
    let evens: Vec<i32> = (0..10)
        .filter(|x| x % 2 == 0)
        .collect();

    println!("{:?}", evens);  // [0, 2, 4, 6, 8]
}
```

## Using Ranges with Loops

### Simple Loop

```rust
fn main() {
    for i in 0..5 {
        println!("{}", i);
    }
}
```

### Loop with Enumerate

Get both index and value.

```rust
fn main() {
    let vec = vec!["a", "b", "c"];

    for (i, val) in vec.iter().enumerate() {
        println!("{}: {}", i, val);  // 0: a, 1: b, 2: c
    }
}
```

### Nested Loops with Ranges

```rust
fn main() {
    for i in 0..3 {
        for j in 0..3 {
            println!("({}, {})", i, j);
        }
    }
}
```

Output:

```
(0, 0)
(0, 1)
(0, 2)
(1, 0)
(1, 1)
(1, 2)
(2, 0)
(2, 1)
(2, 2)
```

## Using Ranges with Slicing

Ranges are perfect for slicing collections.

```rust
fn main() {
    let vec = vec![10, 20, 30, 40, 50];

    let slice1 = &vec[1..4];      // [20, 30, 40]
    let slice2 = &vec[..2];       // [10, 20]
    let slice3 = &vec[3..];       // [40, 50]
    let slice4 = &vec[..];        // [10, 20, 30, 40, 50]

    println!("{:?}", slice1);
    println!("{:?}", slice2);
    println!("{:?}", slice3);
    println!("{:?}", slice4);
}
```

## Practical Example: Processing Ranges

```rust
fn main() {
    let start = 10;
    let end = 20;

    // Check if value is in range
    let range = start..=end;
    if range.contains(&15) {
        println!("15 is in range");
    }

    // Get all values in range and process them
    for value in (start..=end).step_by(2) {
        println!("Processing value {}", value);
    }

    // Count values in range
    println!("Total values: {}", (start..=end).count());

    // Process values in reverse (latest first)
    for value in (start..=end).rev().take(5) {
        println!("Latest value: {}", value);
    }
}
```

Output:

```
15 is in range
Processing value 10
Processing value 12
Processing value 14
... (every 2nd value)
Total values: 11
Latest value: 20
Latest value: 19
Latest value: 18
Latest value: 17
Latest value: 16
```

This pattern is useful anywhere you need to work with sequences: iterating, filtering, checking bounds.

## Common Range Operations

```rust
fn main() {
    let r = 5..15;

    // Check if empty
    if r.is_empty() {
        println!("Range is empty");
    }

    // Get length
    let len = r.count();
    println!("Length: {}", len);

    // Convert to vector
    let vec: Vec<i32> = r.collect();
    println!("As vec: {:?}", vec);

    // Check containment
    println!("Contains 10: {}", r.contains(&10));

    // Combine with other methods
    let result: Vec<i32> = (0..20)
        .filter(|x| x % 2 == 0)      // even numbers
        .map(|x| x * 2)               // double them
        .take(5)                      // first 5
        .collect();

    println!("Result: {:?}", result);  // [0, 4, 8, 12, 16]
}
```

## Range Type Comparison

| Type           | Example  | Start    | End      | Use Case                     |
| -------------- | -------- | -------- | -------- | ---------------------------- |
| **Exclusive**  | `0..10`  | Included | Excluded | Loops, slicing (most common) |
| **Inclusive**  | `0..=10` | Included | Included | When you need the end value  |
| **Full**       | `..`     | All      | All      | Slice entire collection      |
| **From Start** | `..10`   | Start    | Excluded | Slice from beginning         |
| **To End**     | `5..`    | Value    | End      | Slice to end                 |

## Why Ranges Matter

Ranges are everywhere in Rust:

1. **Loops** - `for i in 0..10`
2. **Slicing** - `&vec[1..5]`
3. **Pattern matching** - `match x { 0..10 => ... }`
4. **Iterators** - `(0..100).filter(...)`
5. **Function parameters** - Functions taking range types
6. **Data processing** - Filtering, mapping, transforming sequences

## Key Takeaway

Ranges represent sequences of values. They're lazy (don't compute until used), efficient, and composable with other iterator methods.

Use exclusive ranges by default. Use inclusive when you need the end value. Chain `.map()`, `.filter()`, `.step_by()` to process ranges efficiently.

Ranges are simple but powerful. Master them and your code becomes cleaner and more expressive.
