---
slug: day-19-rust-hashmap
title: "Day 19: Understanding HashMap in Rust"
date: 2026-02-12
readTime: 11 min
category: rust
tags:
  - rust
  - beginner
  - hashmap
  - collections
  - key-value
excerpt: "HashMap lets you store key-value pairs and look them up instantly. Essential for blockchain state, accounts, and caching."
---

# Understanding HashMap in Rust

You know Vec (ordered list) and HashSet (unique values). Now comes HashMap: a key-value store.

Think of it like a dictionary. You look up a word (key) and get its definition (value). In blockchain, you look up an address (key) and get the account balance (value).

HashMap is fast. Looking up a value by key is O(1) instead of O(n).

## Creating a HashMap

```rust
use std::collections::HashMap;

fn main() {
    let mut accounts = HashMap::new();

    // Add key-value pairs
    accounts.insert("alice", 1000);
    accounts.insert("bob", 500);
    accounts.insert("charlie", 750);

    println!("{:?}", accounts);
    // {"alice": 1000, "bob": 500, "charlie": 750}
}
```

Import `HashMap` from `std::collections`. Create one with `new()`. Add pairs with `insert()`.

### Creating With Initial Values

```rust
use std::collections::HashMap;

fn main() {
    let mut balances = HashMap::from([
        ("alice", 1000),
        ("bob", 500),
        ("charlie", 750),
    ]);

    println!("{:?}", balances);
}
```

Or convert from a Vec:

```rust
use std::collections::HashMap;

fn main() {
    let pairs = vec![
        ("alice", 1000),
        ("bob", 500),
        ("charlie", 750),
    ];

    let balances: HashMap<&str, i32> = pairs.into_iter().collect();
    println!("{:?}", balances);
}
```

## Looking Up Values

### Using `get()`

`get()` returns `Option`. Safe, doesn't panic.

```rust
use std::collections::HashMap;

fn main() {
    let mut balances = HashMap::new();
    balances.insert("alice", 1000);

    match balances.get("alice") {
        Some(balance) => println!("Alice has: {}", balance),
        None => println!("Alice not found"),
    }

    match balances.get("bob") {
        Some(balance) => println!("Bob has: {}", balance),
        None => println!("Bob not found"),
    }
}
```

Output:

```
Alice has: 1000
Bob not found
```

### Using Indexing `[]`

Direct access. Panics if key doesn't exist.

```rust
use std::collections::HashMap;

fn main() {
    let mut balances = HashMap::new();
    balances.insert("alice", 1000);

    println!("{}", balances["alice"]);  // 1000
    println!("{}", balances["bob"]);    // PANIC!
}
```

Use `[]` only when you're certain the key exists.

### Using `contains_key()`

Check if a key exists.

```rust
use std::collections::HashMap;

fn main() {
    let mut balances = HashMap::new();
    balances.insert("alice", 1000);

    if balances.contains_key("alice") {
        println!("Alice is in the map");
    } else {
        println!("Alice not found");
    }
}
```

## Modifying Values

### Updating a Value

```rust
use std::collections::HashMap;

fn main() {
    let mut balances = HashMap::new();
    balances.insert("alice", 1000);

    // Update existing key
    balances.insert("alice", 1500);
    println!("{:?}", balances);  // {"alice": 1500}
}
```

`insert()` overwrites the old value.

### Using `entry()` for Conditional Updates

```rust
use std::collections::HashMap;

fn main() {
    let mut balances = HashMap::new();
    balances.insert("alice", 1000);

    // Add only if key doesn't exist
    balances.entry("alice").or_insert(500);
    balances.entry("bob").or_insert(500);

    println!("{:?}", balances);
    // {"alice": 1000, "bob": 500}
    // alice wasn't changed (already existed)
    // bob was set to 500 (didn't exist)
}
```

### Incrementing a Value

```rust
use std::collections::HashMap;

fn main() {
    let mut balances = HashMap::new();
    balances.insert("alice", 1000);

    // Increment alice's balance
    *balances.entry("alice").or_insert(0) += 100;
    println!("{:?}", balances);  // {"alice": 1100}
}
```

The `*` dereferences the mutable reference so you can modify it.

## Removing Values

```rust
use std::collections::HashMap;

fn main() {
    let mut balances = HashMap::new();
    balances.insert("alice", 1000);
    balances.insert("bob", 500);

    // Remove and return value
    let removed = balances.remove("alice");
    println!("{:?}", removed);  // Some(1000)
    println!("{:?}", balances); // {"bob": 500}

    // Remove non-existent key
    let not_there = balances.remove("charlie");
    println!("{:?}", not_there); // None
}
```

`remove()` returns `Option`. If key exists, returns `Some(value)`. If not, returns `None`.

## Iterating Over HashMap

### Iterate Over Key-Value Pairs

```rust
use std::collections::HashMap;

fn main() {
    let mut balances = HashMap::new();
    balances.insert("alice", 1000);
    balances.insert("bob", 500);
    balances.insert("charlie", 750);

    for (address, balance) in &balances {
        println!("{}: {}", address, balance);
    }
}
```

Use `&balances` to borrow. Without `&`, you'd move the map.

### Iterate Over Keys Only

```rust
use std::collections::HashMap;

fn main() {
    let balances = HashMap::from([
        ("alice", 1000),
        ("bob", 500),
    ]);

    for address in balances.keys() {
        println!("Address: {}", address);
    }
}
```

### Iterate Over Values Only

```rust
use std::collections::HashMap;

fn main() {
    let balances = HashMap::from([
        ("alice", 1000),
        ("bob", 500),
    ]);

    for balance in balances.values() {
        println!("Balance: {}", balance);
    }
}
```

## Practical Blockchain Example: Account State

```rust
use std::collections::HashMap;

#[derive(Debug)]
struct Account {
    balance: u64,
    nonce: u64,
}

fn main() {
    let mut state = HashMap::new();

    // Initialize accounts
    state.insert("alice", Account { balance: 1000, nonce: 0 });
    state.insert("bob", Account { balance: 500, nonce: 0 });

    // Check balance
    match state.get("alice") {
        Some(account) => println!("Alice balance: {}", account.balance),
        None => println!("Account not found"),
    }

    // Update balance
    if let Some(account) = state.get_mut("alice") {
        account.balance -= 100;
        account.nonce += 1;
    }

    println!("{:?}", state);
}
```

Output:

```
Alice balance: 1000
{"alice": Account { balance: 900, nonce: 1 }, "bob": Account { balance: 500, nonce: 0 }}
```

This is real blockchain code. The state is a HashMap of addresses to accounts.

## HashMap vs Vec vs HashSet

| Feature      | Vec           | HashMap         | HashSet       |
| ------------ | ------------- | --------------- | ------------- |
| **Storage**  | Ordered list  | Key-value pairs | Unique values |
| **Access**   | By index O(1) | By key O(1)     | By value O(1) |
| **Search**   | O(n)          | O(1)            | O(1)          |
| **Use case** | Ordered data  | State, caching  | Membership    |
| **Memory**   | Compact       | More overhead   | More overhead |

For blockchain state (accounts, balances), HashMap is perfect.

## Common HashMap Operations

### Check If Empty

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();

    if map.is_empty() {
        println!("Map is empty");
    }

    map.insert("key", "value");
    println!("Length: {}", map.len());
}
```

### Clear All Entries

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::from([("a", 1), ("b", 2)]);

    map.clear();
    println!("{:?}", map);  // {}
}
```

### Merge Two HashMaps

```rust
use std::collections::HashMap;

fn main() {
    let mut map1 = HashMap::from([("a", 1), ("b", 2)]);
    let map2 = HashMap::from([("c", 3), ("d", 4)]);

    // Extend with another map
    map1.extend(map2);
    println!("{:?}", map1);  // {"a": 1, "b": 2, "c": 3, "d": 4}
}
```

## Key Types: What Can Be a Key?

Keys need to implement `Hash` and `Eq`. Most built-in types work:

```rust
use std::collections::HashMap;

fn main() {
    // String keys
    let mut by_string = HashMap::new();
    by_string.insert("alice", 1000);

    // Integer keys
    let mut by_int = HashMap::new();
    by_int.insert(1, "first");
    by_int.insert(2, "second");

    // Tuple keys
    let mut by_tuple = HashMap::new();
    by_tuple.insert((1, 2), "point");

    // Custom types need #[derive(Hash, Eq, PartialEq)]
    #[derive(Hash, Eq, PartialEq)]
    struct Addr(String);

    let mut by_custom = HashMap::new();
    by_custom.insert(Addr("alice".to_string()), 1000);
}
```

## Ownership with HashMap

HashMap takes ownership of keys and values.

```rust
use std::collections::HashMap;

fn main() {
    let key = String::from("alice");
    let value = 1000;

    let mut map = HashMap::new();
    map.insert(key, value);

    // key and value are now owned by the HashMap
    // println!("{}", key);    // ERROR! key was moved
    // println!("{}", value);  // ERROR! value was moved

    // But you can still access them through the map
    println!("{}", map["alice"]);  // 1000
}
```

Use references if you want to keep ownership:

```rust
use std::collections::HashMap;

fn main() {
    let key = "alice";
    let value = 1000;

    let mut map = HashMap::new();
    map.insert(key, value);

    // key and value are still accessible (references, not moved)
    println!("{}", key);    // alice
    println!("{}", value);  // 1000
}
```

## Why HashMap Matters for Blockchain

In blockchain, you need fast state lookups:

1. **Accounts** - Look up by address, get balance
2. **Transactions** - Look up by hash, check status
3. **Contracts** - Look up by address, get code
4. **Caching** - Store computed values

HashMap gives you O(1) lookups. Without it, checking every account's balance would be O(n).

For ScrapyChain, you'll use HashMap to store:

- Account balances by address
- Account nonces (transaction counts)
- Cached block hashes
- Pending transactions

## Key Takeaway

HashMap is your go-to for key-value storage. Use it for state, caching, and lookups. It's fast (O(1)) and integrates well with Rust's ownership system.

For blockchain, think of HashMap as your "database." Everything from accounts to transactions goes in here.

You now have three collection types:

- **Vec** - ordered list
- **HashSet** - unique values
- **HashMap** - key-value pairs

Master all three, and you can build anything.
