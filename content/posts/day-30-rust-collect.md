---
slug: day-30-rust-collect
title: "Day 30: Understanding collect() in Rust"
date: 2026-02-23
readTime: 12 min
category: rust
tags:
  - rust
  - beginner
  - collect
  - iterators
  - collections
excerpt: "collect() transforms iterators into collections. Learn how to collect into Vecs, HashMaps, HashSets, and more - and why the type annotation matters."
---

# Understanding collect() in Rust

You've seen `.collect()` at the end of iterator chains. It shows up constantly in Rust code. But what is it actually doing?

`collect()` takes an iterator and turns it into a collection. That's it. But understanding _how_ it works unlocks a lot of power.

Let me walk you through it.

## What Is collect()?

`collect()` is a method on iterators. It consumes the iterator and builds a collection from it.

```rust
fn main() {
    let vec: Vec<i32> = (0..5).collect();
    println!("{:?}", vec);  // [0, 1, 2, 3, 4]
}
```

The iterator `(0..5)` produces values one at a time. `.collect()` gathers them all into a `Vec<i32>`.

### Why the Type Annotation?

Rust needs to know _what kind of collection_ you want. Without the type, it doesn't know whether you want a `Vec`, a `HashSet`, or something else.

```rust
fn main() {
    // This won't compile - Rust doesn't know what to collect into
    let result = (0..5).collect();

    // This works - you're telling Rust what you want
    let result: Vec<i32> = (0..5).collect();
}
```

You can also use the turbofish syntax `::<>` to specify the type inline:

```rust
fn main() {
    let result = (0..5).collect::<Vec<i32>>();
    println!("{:?}", result);  // [0, 1, 2, 3, 4]
}
```

Both styles work. The type annotation on the variable is usually cleaner. Turbofish is useful when you're chaining methods and don't want to annotate the variable.

### How It Works Under the Hood

`collect()` works through a trait called `FromIterator`. Any type that implements `FromIterator` can be collected into.

```rust
// This is what Rust does internally when you call .collect()
// You don't need to write this yourself - it's already implemented
// for Vec, HashMap, HashSet, String, and more.
```

`Vec`, `HashMap`, `HashSet`, `String`, `BTreeMap` - they all implement `FromIterator`, which is why `.collect()` can target any of them.

## Collecting into Different Collection Types

The real power of `collect()` is that you can target different types depending on what you need.

### Vec

The most common use. Gathers values into a growable list.

```rust
fn main() {
    // From a range
    let numbers: Vec<i32> = (1..=5).collect();
    println!("{:?}", numbers);  // [1, 2, 3, 4, 5]

    // From a transformed iterator
    let doubled: Vec<i32> = (1..=5).map(|x| x * 2).collect();
    println!("{:?}", doubled);  // [2, 4, 6, 8, 10]

    // From filtered values
    let evens: Vec<i32> = (1..=10).filter(|x| x % 2 == 0).collect();
    println!("{:?}", evens);  // [2, 4, 6, 8, 10]
}
```

### HashSet

A collection of unique values. Duplicates are dropped automatically.

```rust
use std::collections::HashSet;

fn main() {
    let numbers = vec![1, 2, 2, 3, 3, 3, 4];

    // Duplicates are removed
    let unique: HashSet<i32> = numbers.into_iter().collect();
    println!("{:?}", unique);  // {1, 2, 3, 4} (order not guaranteed)
}
```

This is one of the cleanest ways to deduplicate a list in Rust.

```rust
use std::collections::HashSet;

fn main() {
    let tags = vec!["rust", "beginner", "rust", "iterator", "beginner"];

    let unique_tags: HashSet<&str> = tags.into_iter().collect();
    println!("{:?}", unique_tags);  // {"rust", "beginner", "iterator"}
}
```

### HashMap

Collecting key-value pairs into a map. Your iterator needs to produce tuples `(key, value)`.

```rust
use std::collections::HashMap;

fn main() {
    let pairs = vec![("name", "Ash"), ("lang", "Rust"), ("day", "30")];

    let map: HashMap<&str, &str> = pairs.into_iter().collect();
    println!("{:?}", map);  // {"name": "Ash", "lang": "Rust", "day": "30"}
    println!("{}", map["lang"]);  // Rust
}
```

A practical example - zipping two lists into a map:

```rust
use std::collections::HashMap;

fn main() {
    let keys = vec!["a", "b", "c"];
    let values = vec![1, 2, 3];

    let map: HashMap<&str, i32> = keys.into_iter().zip(values.into_iter()).collect();
    println!("{:?}", map);  // {"a": 1, "b": 2, "c": 3}
}
```

`.zip()` pairs up two iterators element by element. Then `.collect()` turns the pairs into a `HashMap`.

### BTreeMap

Like `HashMap`, but sorted by key. Use it when you need consistent ordering.

```rust
use std::collections::BTreeMap;

fn main() {
    let pairs = vec![(3, "three"), (1, "one"), (2, "two")];

    let map: BTreeMap<i32, &str> = pairs.into_iter().collect();
    println!("{:?}", map);  // {1: "one", 2: "two", 3: "three"} - sorted
}
```

### String

Collecting characters or string slices into a single `String`.

```rust
fn main() {
    // From a Vec of chars
    let chars = vec!['R', 'u', 's', 't'];
    let word: String = chars.into_iter().collect();
    println!("{}", word);  // Rust

    // From a Vec of string slices
    let words = vec!["hello", " ", "world"];
    let sentence: String = words.into_iter().collect();
    println!("{}", sentence);  // hello world
}
```

Transforming a string character by character:

```rust
fn main() {
    let input = "hello world";

    // Capitalize each word's first letter
    let result: String = input
        .split_whitespace()
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                None => String::new(),
                Some(first) => first.to_uppercase().to_string() + chars.as_str(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ");

    println!("{}", result);  // Hello World
}
```

## Collecting from Ranges

Ranges and `collect()` work together all the time. You saw this in Day 29 briefly - here's a deeper look.

### Basic Range to Vec

```rust
fn main() {
    let r: Vec<i32> = (0..10).collect();
    println!("{:?}", r);  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    let r_inclusive: Vec<i32> = (0..=10).collect();
    println!("{:?}", r_inclusive);  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
```

### Transforming a Range Before Collecting

```rust
fn main() {
    // Squares of numbers 1 through 5
    let squares: Vec<i32> = (1..=5).map(|x| x * x).collect();
    println!("{:?}", squares);  // [1, 4, 9, 16, 25]

    // Only odd numbers in 0..20
    let odds: Vec<i32> = (0..20).filter(|x| x % 2 != 0).collect();
    println!("{:?}", odds);  // [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

    // Step by 3, then double
    let stepped: Vec<i32> = (0..20).step_by(3).map(|x| x * 2).collect();
    println!("{:?}", stepped);  // [0, 6, 12, 18, 24, 30]
}
```

### Range to HashSet

```rust
use std::collections::HashSet;

fn main() {
    // Every even number from 0 to 20, as a set
    let evens: HashSet<i32> = (0..=20).filter(|x| x % 2 == 0).collect();
    println!("{:?}", evens);  // {0, 2, 4, 6, ...} unordered
}
```

### Range to HashMap

Pair up a range with computed values:

```rust
use std::collections::HashMap;

fn main() {
    // Map each number to its square
    let squares: HashMap<i32, i32> = (1..=5)
        .map(|x| (x, x * x))
        .collect();

    println!("{:?}", squares);  // {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
    println!("Square of 3: {}", squares[&3]);  // 9
}
```

## Handling Results with collect()

One of Rust's most useful patterns is collecting a `Vec<Result<T, E>>` into a `Result<Vec<T>, E>`. It sounds complex but it's very practical.

```rust
fn parse_numbers(strings: Vec<&str>) -> Result<Vec<i32>, std::num::ParseIntError> {
    strings.iter().map(|s| s.parse::<i32>()).collect()
}

fn main() {
    // All valid - succeeds
    let result = parse_numbers(vec!["1", "2", "3"]);
    println!("{:?}", result);  // Ok([1, 2, 3])

    // One invalid - fails
    let result = parse_numbers(vec!["1", "oops", "3"]);
    println!("{:?}", result);  // Err(ParseIntError { ... })
}
```

What's happening here: if _any_ item in the iterator is an `Err`, `collect()` short-circuits and returns that error. If _all_ items are `Ok`, you get a `Vec` of the unwrapped values.

This is much cleaner than manually checking each result.

## Practical Examples

### Building a Word Frequency Map

```rust
use std::collections::HashMap;

fn main() {
    let text = "the quick brown fox jumps over the lazy fox";

    let frequency: HashMap<&str, usize> = text
        .split_whitespace()
        .fold(HashMap::new(), |mut map, word| {
            *map.entry(word).or_insert(0) += 1;
            map
        });

    println!("{:?}", frequency);
    // {"the": 2, "fox": 2, "quick": 1, ...}
}
```

### Deduplicating and Sorting a List

```rust
use std::collections::BTreeSet;

fn main() {
    let scores = vec![85, 90, 85, 72, 90, 100, 72];

    // Deduplicate and sort in one step
    let unique_sorted: Vec<i32> = scores
        .into_iter()
        .collect::<BTreeSet<_>>()  // BTreeSet deduplicates and sorts
        .into_iter()
        .collect();

    println!("{:?}", unique_sorted);  // [72, 85, 90, 100]
}
```

### Splitting a Vec into Two Collections

```rust
fn main() {
    let numbers: Vec<i32> = (1..=10).collect();

    let (evens, odds): (Vec<i32>, Vec<i32>) = numbers
        .into_iter()
        .partition(|x| x % 2 == 0);

    println!("Evens: {:?}", evens);  // [2, 4, 6, 8, 10]
    println!("Odds: {:?}", odds);    // [1, 3, 5, 7, 9]
}
```

`.partition()` splits an iterator into two collections based on a condition. You can collect into a tuple of `Vec`s directly.

## Common Mistakes

### Forgetting the Type Annotation

```rust
fn main() {
    // Won't compile - Rust can't infer the collection type
    let result = vec![1, 2, 3].into_iter().collect();

    // Fix: annotate the type
    let result: Vec<i32> = vec![1, 2, 3].into_iter().collect();
}
```

### Collecting Without Consuming

`collect()` _consumes_ the iterator. You can't use the iterator after collecting.

```rust
fn main() {
    let iter = vec![1, 2, 3].into_iter();
    let collected: Vec<i32> = iter.collect();

    // This fails - iter was moved into collect()
    // for item in iter { ... }
}
```

If you need to use the data again, collect first, then iterate over the collected result.

### Using .iter() vs .into_iter()

```rust
fn main() {
    let numbers = vec![1, 2, 3];

    // .iter() gives references - collect into Vec<&i32>
    let refs: Vec<&i32> = numbers.iter().collect();

    // .into_iter() consumes - collect into Vec<i32>
    let owned: Vec<i32> = numbers.into_iter().collect();
}
```

Use `.into_iter()` when you want to own the values. Use `.iter()` when you only need to read them.

## collect() Quick Reference

| Target Type         | Iterator Produces | Example                                                 |
| ------------------- | ----------------- | ------------------------------------------------------- |
| `Vec<T>`            | `T`               | `(0..5).collect::<Vec<i32>>()`                          |
| `HashSet<T>`        | `T`               | `vec.into_iter().collect::<HashSet<i32>>()`             |
| `HashMap<K, V>`     | `(K, V)`          | `pairs.into_iter().collect::<HashMap<_, _>>()`          |
| `BTreeMap<K, V>`    | `(K, V)`          | `pairs.into_iter().collect::<BTreeMap<_, _>>()`         |
| `String`            | `char` or `&str`  | `chars.into_iter().collect::<String>()`                 |
| `Result<Vec<T>, E>` | `Result<T, E>`    | `items.iter().map(parse).collect::<Result<Vec<_>,_>>()` |

## Key Takeaway

`collect()` is the bridge between iterators and collections. It's always at the end of an iterator chain, and it always needs a type to know what to build.

The pattern you'll use constantly:

```rust
let result: SomeCollection<T> = some_iterator
    .map(...)
    .filter(...)
    .collect();
```

The type annotation drives everything. Change the type, change the collection. The iterator chain stays the same.

Master `collect()` and you'll write cleaner, more expressive Rust - especially when working with data transformations, filtering, and the kind of processing pipelines you'll build in ScrapyChain.
