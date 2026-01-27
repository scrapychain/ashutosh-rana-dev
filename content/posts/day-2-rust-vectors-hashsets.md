---
slug: day-2-rust-vectors-hashsets
title: "Day 2: Vectors and HashSets"
date: 2026-01-26
readTime: 7 min
category: rust
tags:
  - rust
  - beginner
  - collections
  - vectors
  - hashsets
excerpt: "Collections let you store multiple values. Vec is ordered. HashSet is unique. Both follow the ownership rules from Day 1, they own their data, you borrow from them."
---

# Rust Collections: Vectors and HashSets

Now that you understand ownership, references, and borrowing from Day 1, it's time to use those concepts with actual data structures.

Today: **collections**. Ways to store multiple values.

The two most useful are:

- **Vec** (Vector) - ordered list, like an array that grows
- **HashSet** - unique values only, like a set in math

Both follow the same ownership rules: they own their data, you borrow from them.

---

## Vectors (Vec<T>): Ordered Lists

A **Vector** is a growable, ordered list. All values must be the same type.

Think of it as an array that can expand as you add more elements. You can add to the end, remove from the end, or insert/remove at specific positions.

### Creating Vectors

```rust
fn main() {
    // Empty vector (need type hint)
    let mut numbers: Vec<i32> = Vec::new();

    // With initial values (type is inferred)
    let fruits = vec!["apple", "banana", "orange"];

    // With capacity (preallocate space for performance)
    let mut scores: Vec<i32> = Vec::with_capacity(100);
}
```

The `vec!` macro is the quick way. If you use `Vec::new()`, you usually need to specify the type.

### Adding and Removing Elements

```rust
fn main() {
    let mut numbers = vec![1, 2, 3];

    // Add to end
    numbers.push(4);
    println!("{:?}", numbers);  // [1, 2, 3, 4]

    // Remove from end (returns Option)
    let last = numbers.pop();
    println!("{:?}", last);     // Some(4)
    println!("{:?}", numbers);  // [1, 2, 3]

    // Insert at specific position
    numbers.insert(1, 10);
    println!("{:?}", numbers);  // [1, 10, 2, 3]

    // Remove at position
    numbers.remove(1);
    println!("{:?}", numbers);  // [1, 2, 3]
}
```

- `push()` - add to end (fast)
- `pop()` - remove from end (fast)
- `insert()` - add at position (slow if list is big)
- `remove()` - remove at position (slow if list is big)

### Accessing Elements

```rust
fn main() {
    let fruits = vec!["apple", "banana", "orange"];

    // Indexing (panics if out of bounds)
    println!("{}", fruits[0]);  // "apple"

    // Using .get() (returns Option, safer)
    match fruits.get(1) {
        Some(fruit) => println!("{}", fruit),  // "banana"
        None => println!("not found"),
    }

    // Out of bounds with .get() is safe
    if let Some(fruit) = fruits.get(10) {
        println!("{}", fruit);
    } else {
        println!("no fruit at index 10");  // This prints
    }
}
```

Use `fruits[0]` for quick access if you know the index exists. Use `.get()` when you're not sure, it returns `Option` instead of panicking.

### Iterating: Where Ownership Matters

This is where Day 1 concepts come into play.

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4];

    // Borrow immutably (read only)
    for num in &numbers {
        println!("{}", num);
    }
    println!("{:?}", numbers);  // Still works! We borrowed.

    // Borrow mutably (can modify)
    let mut scores = vec![10, 20, 30];
    for score in &mut scores {
        *score += 5;  // dereference (*) then modify
    }
    println!("{:?}", scores);  // [15, 25, 35]

    // Move (take ownership)
    let names = vec!["alice", "bob"];
    for name in names {
        println!("{}", name);
    }
    // names is gone now. We moved it.
    // println!("{:?}", names);  // ERROR!
}
```

Key difference:

- `for num in &numbers` - borrows, vector still exists after loop
- `for num in numbers` - moves, vector is consumed

---

## HashSets (HashSet<T>): Unique Values

A **HashSet** stores unique values with no guaranteed order.

If you add a duplicate, it's ignored. Use this when you care about "does this exist?" not "what order is it in?"

### Creating HashSets

```rust
use std::collections::HashSet;

fn main() {
    // Empty HashSet
    let mut tags: HashSet<String> = HashSet::new();

    // From a vector
    let numbers = vec![1, 2, 3, 2, 1];
    let unique: HashSet<i32> = numbers.into_iter().collect();
    println!("{:?}", unique);  // {1, 2, 3} (order undefined)
}
```

The `.into_iter().collect()` pattern converts any collection to any other collection. Rust figures out what you want from the type.

### Adding and Removing

```rust
use std::collections::HashSet;

fn main() {
    let mut colors = HashSet::new();

    // insert() returns true if new, false if duplicate
    println!("{}", colors.insert("red"));    // true (new)
    println!("{}", colors.insert("blue"));   // true (new)
    println!("{}", colors.insert("red"));    // false (already there)

    // remove() returns true if was there
    println!("{}", colors.remove("red"));    // true
    println!("{}", colors.remove("red"));    // false (already gone)

    println!("{:?}", colors);  // {"blue"}
}
```

### Checking Membership (The Main Use Case)

```rust
use std::collections::HashSet;

fn main() {
    let allowed_users = HashSet::from(["alice", "bob", "charlie"]);

    let login = "alice";
    if allowed_users.contains(login) {
        println!("Access granted");
    } else {
        println!("Access denied");
    }
}
```

This is where HashSets shine: **fast "does this exist?" checks**. It's O(1) instead of O(n).

### Iterating Over HashSets

```rust
use std::collections::HashSet;

fn main() {
    let numbers: HashSet<i32> = vec![1, 2, 3].into_iter().collect();

    // Borrow immutably
    for num in &numbers {
        println!("{}", num);
    }
    println!("{:?}", numbers);  // Still there

    // Move
    for num in numbers {
        println!("{}", num);
    }
    // numbers is gone
}
```

Same pattern as Vec: `&set` to borrow, no `&` to move.

### Set Operations

```rust
use std::collections::HashSet;

fn main() {
    let set1: HashSet<i32> = vec![1, 2, 3].into_iter().collect();
    let set2: HashSet<i32> = vec![2, 3, 4].into_iter().collect();

    // Union: all elements from both
    let union: HashSet<_> = set1.union(&set2).copied().collect();
    println!("{:?}", union);  // {1, 2, 3, 4}

    // Intersection: common elements
    let common: HashSet<_> = set1.intersection(&set2).copied().collect();
    println!("{:?}", common);  // {2, 3}

    // Difference: in set1 but not set2
    let diff: HashSet<_> = set1.difference(&set2).copied().collect();
    println!("{:?}", diff);  // {1}
}
```

These operations are useful in real code: checking permissions, finding common data, etc.

---

## Vec or HashSet? When to Use Each

| Feature         | Vec                                    | HashSet                           |
| --------------- | -------------------------------------- | --------------------------------- |
| **Order**       | Guaranteed (insertion order)           | No order                          |
| **Duplicates**  | Allowed                                | Not allowed                       |
| **Access**      | By index: `vec[0]`                     | By value: `.contains()`           |
| **Performance** | O(1) index access, O(n) search         | O(1) lookup                       |
| **Use when**    | You care about order, or need indexing | You only care if something exists |

**Rule of thumb:**

- **Vec** = "I need a list in a specific order"
- **HashSet** = "I need to check if something is in this group"

---

## Collections and Ownership (Day 1 Review)

Collections follow the same ownership rules as any other data:

```rust
fn print_vec(v: &Vec<i32>) {
    // Borrow immutably
    for num in v {
        println!("{}", num);
    }
}

fn add_to_vec(v: &mut Vec<i32>) {
    // Borrow mutably
    v.push(999);
}

fn consume_vec(v: Vec<i32>) {
    // Take ownership
    println!("Consuming {} numbers", v.len());
}

fn main() {
    let mut numbers = vec![1, 2, 3];

    print_vec(&numbers);          // Borrow immutably
    add_to_vec(&mut numbers);     // Borrow mutably
    println!("{:?}", numbers);    // Still own it

    consume_vec(numbers);         // Move ownership
    // println!("{:?}", numbers); // ERROR! numbers was moved
}
```

The key insight: collections own their data. When you pass them to functions, use:

- `&Vec<T>` to borrow (read only)
- `&mut Vec<T>` to borrow and modify
- `Vec<T>` to move ownership

---

## Practical Example: Tracking Unique Tags

```rust
use std::collections::HashSet;

fn main() {
    let mut tags = HashSet::new();

    let article_tags = vec!["rust", "programming", "blockchain", "rust"];

    // Add unique tags
    for tag in article_tags {
        tags.insert(tag);
    }

    println!("Found {} unique tags", tags.len());  // 3

    if tags.contains("rust") {
        println!("This article mentions Rust");
    }

    // Remove a tag
    tags.remove("blockchain");
    println!("Tags: {:?}", tags);  // {"rust", "programming"}
}
```

This is real code you'd write: deduplicating data and checking membership.

---

## Moving Forward

You now understand the two most common collections in Rust. Both apply the ownership rules from Day 1. In real projects, you'll use Vec the most (ordered data is common), but you'll reach for HashSet whenever you need fast membership checks.
