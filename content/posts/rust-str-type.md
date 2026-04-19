---
slug: rust-str-type
title: "Understanding the str Type in Rust"
date: 2026-02-25
readTime: 9 min
category: rust
tags:
  - rust
  - beginner
  - strings
  - str
  - string-slices
excerpt: "str is a primitive type representing a slice of UTF-8 text. Learn what it is, how to use it, and the methods available."
---

# Understanding the str Type in Rust

`str` is a **primitive type**. It represents a slice of UTF-8 encoded text. You never work with `str` directly, only with references to it: `&str`.

Think of it like this: `str` is unsized text data. `&str` is a reference to that data.

## What Is str?

`str` is an unsized type. That means its size isn't known at compile time.

```rust
fn main() {
    let text = "hello";  // Type is &'static str

    // You can't do this:
    // let x: str = "hello";  // ERROR! str is unsized

    // You have to use a reference:
    let x: &str = "hello";   // OK
}
```

Because `str` is unsized, you always use it through a reference: `&str`.

## String Literals Are &str

Every string literal in your code is a `&str`:

```rust
fn main() {
    let literal = "hello";  // Type: &str (specifically &'static str)
    println!("{}", literal);
}
```

The string `"hello"` is hardcoded into your binary. It's `&'static str` - a static reference to string data that lives for the entire program.

## What Does &str Look Like?

A `&str` is a reference containing:

- A pointer to the string data
- The length of the string in bytes

```rust
fn main() {
    let text = "hello";

    // A &str contains:
    // - pointer to "hello" in binary
    // - length: 5

    println!("{}", text.len());  // 5
}
```

## Methods on str

### .len()

Get the length in bytes (not characters).

```rust
fn main() {
    let text = "hello";
    println!("{}", text.len());  // 5

    let emoji = "😀";
    println!("{}", emoji.len());  // 4 (emoji is 4 bytes)
}
```

### .is_empty()

Check if the string is empty.

```rust
fn main() {
    let empty = "";
    let full = "hello";

    println!("{}", empty.is_empty());  // true
    println!("{}", full.is_empty());   // false
}
```

### .contains()

Check if string contains a substring.

```rust
fn main() {
    let text = "hello world";

    println!("{}", text.contains("world"));     // true
    println!("{}", text.contains("xyz"));       // false
}
```

### .starts_with() and .ends_with()

```rust
fn main() {
    let text = "hello world";

    println!("{}", text.starts_with("hello"));  // true
    println!("{}", text.ends_with("world"));    // true
}
```

### .trim()

Remove whitespace from start and end.

```rust
fn main() {
    let text = "  hello world  ";
    println!("'{}'", text.trim());  // 'hello world'
    println!("'{}'", text.trim_start());  // 'hello world  '
    println!("'{}'", text.trim_end());    // '  hello world'
}
```

### .split()

Split string by separator.

```rust
fn main() {
    let text = "hello,world,rust";

    for part in text.split(",") {
        println!("{}", part);  // hello, world, rust
    }
}
```

### .chars()

Iterate over characters (properly handles UTF-8).

```rust
fn main() {
    let text = "hello";

    for c in text.chars() {
        println!("{}", c);  // h, e, l, l, o
    }
}
```

### .bytes()

Iterate over bytes.

```rust
fn main() {
    let text = "hello";

    for b in text.bytes() {
        println!("{}", b);  // 104, 101, 108, 108, 111
    }
}
```

### .to_uppercase() and .to_lowercase()

```rust
fn main() {
    let text = "Hello World";

    println!("{}", text.to_uppercase());   // HELLO WORLD
    println!("{}", text.to_lowercase());   // hello world
}
```

### .replace()

Replace occurrences of a substring.

```rust
fn main() {
    let text = "hello world";
    let replaced = text.replace("world", "Rust");
    println!("{}", replaced);  // hello Rust
}
```

### .find()

Find position of substring.

```rust
fn main() {
    let text = "hello world";

    match text.find("world") {
        Some(pos) => println!("Found at position: {}", pos),  // Found at position: 6
        None => println!("Not found"),
    }
}
```

## Slicing str

Use ranges to slice strings.

```rust
fn main() {
    let text = "hello world";

    let hello = &text[0..5];     // "hello"
    let world = &text[6..];      // "world"
    let all = &text[..];         // "hello world"

    println!("{}", hello);
    println!("{}", world);
    println!("{}", all);
}
```

Warning: Slicing must respect UTF-8 boundaries. Slicing in the middle of a multi-byte character will panic.

```rust
fn main() {
    let emoji = "😀hello";

    // This is safe
    let part = &emoji[4..];     // "hello"
    println!("{}", part);

    // This panics - slicing in middle of emoji
    // let bad = &emoji[0..2];  // PANIC!
}
```

## Using &str in Functions

Functions usually take `&str` for string parameters because it works with both string literals and borrowed strings (you'll learn about String later).

```rust
fn print_text(text: &str) {
    println!("{}", text);
}

fn get_first_word(text: &str) -> &str {
    match text.find(' ') {
        Some(pos) => &text[..pos],
        None => text,
    }
}

fn main() {
    print_text("hello");           // Pass literal

    let first = get_first_word("hello world");
    println!("{}", first);         // hello
}
```

## Practical Example: Parsing Data

```rust
fn parse_host_port(config: &str) -> Result<(&str, &str), &str> {
    match config.split(':').collect::<Vec<_>>().as_slice() {
        [host, port] => Ok((host, port)),
        _ => Err("Expected format: host:port"),
    }
}

fn main() {
    match parse_host_port("localhost:8080") {
        Ok((host, port)) => println!("Host: {}, Port: {}", host, port),
        Err(e) => println!("Error: {}", e),
    }
}
```

Output: `Host: localhost, Port: 8080`

## The Lifetime 'static

When you see `&'static str`, it means the reference is valid for the entire program lifetime.

```rust
fn main() {
    let literal: &'static str = "hello";  // Valid for entire program

    // String literals are always 'static because they're in the binary
}
```

String literals are `&'static str` because they're hardcoded into the binary and never freed.

## str vs &str

Important distinction:

```rust
fn main() {
    // str is the type
    // &str is a reference to that type

    let text = "hello";
    // text has type &str (not str)

    // You can't have a variable of type str
    // let x: str = "hello";  // ERROR!
}
```

## Key Methods Summary

| Method           | What It Does       | Example                             |
| ---------------- | ------------------ | ----------------------------------- |
| `.len()`         | Length in bytes    | `"hello".len()` → 5                 |
| `.is_empty()`    | Check if empty     | `"".is_empty()` → true              |
| `.contains()`    | Check substring    | `"hello".contains("ell")` → true    |
| `.starts_with()` | Check prefix       | `"hello".starts_with("hel")` → true |
| `.trim()`        | Remove whitespace  | `"  hi  ".trim()` → "hi"            |
| `.split()`       | Split by separator | `"a,b,c".split(',')` → iterator     |
| `.chars()`       | Iterate characters | `"hi".chars()` → 'h', 'i'           |
| `.find()`        | Find substring     | `"hello".find("ll")` → Some(2)      |
| `.replace()`     | Replace substring  | `"hi".replace("i", "ey")` → "hey"   |

## Key Takeaway

`str` is a primitive type representing UTF-8 text. You always use it through a reference: `&str`.

- **String literals** are `&'static str`
- **Slice str** with ranges: `&text[0..5]`
- **Use &str** for function parameters
- **Methods on &str** for examining and working with text

`str` is read-only by nature. For building and modifying text, you'll use `String` (tomorrow). For now, master reading and using `&str`.
