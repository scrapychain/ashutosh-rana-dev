---
slug: day-14-rust-file-io
title: "Day 14: File I/O and Input/Output"
date: 2026-02-07
readTime: 11 min
category: rust
tags:
  - rust
  - beginner
  - file-io
  - input-output
  - practical
excerpt: "Learn to read and write files, work with stdin/stdout, and handle I/O errors. Essential for any real program and critical for blockchain nodes."
---

# File I/O and Input/Output in Rust

Up until now, you've been working with data in memory. But real programs need to:

- Read configuration files
- Save state to disk
- Log events
- Accept user input
- Write results to output

This is where I/O (Input/Output) comes in.

File I/O in Rust is straightforward, but it's full of error cases. That's why you learn it after mastering error handling.

## Why File I/O Matters for Blockchain

Before we dive in, understand why this is critical:

**Blockchain Nodes Need I/O:**

- Read blockchain data from disk (the ledger is huge)
- Save state changes to persistent storage
- Read configuration (RPC endpoints, validator keys)
- Log transactions and blocks
- Accept commands from users

**Without proper I/O:**

- Your node loses data when it restarts
- State gets corrupted
- You have no audit trail
- Debugging is impossible

Sloppy I/O handling has caused real blockchain bugs. This matters.

## Reading a File

The simplest operation: read an entire file into memory.

```rust
use std::fs;

fn main() {
    let contents = fs::read_to_string("data.txt")
        .expect("Failed to read file");

    println!("{}", contents);
}
```

`fs::read_to_string()` returns a `Result`. If it fails, `.expect()` panics with your message.

This works for small files. For large files, it's wasteful.

## Better: Handle the Error Properly

Instead of `.expect()`, use proper error handling.

```rust
use std::fs;

fn read_file(path: &str) -> Result<String, String> {
    fs::read_to_string(path)
        .map_err(|e| format!("Failed to read {}: {}", path, e))
}

fn main() {
    match read_file("data.txt") {
        Ok(contents) => println!("{}", contents),
        Err(e) => eprintln!("Error: {}", e),
    }
}
```

Now you know what went wrong and can respond.

## Writing to a File

Create or overwrite a file with content.

```rust
use std::fs;

fn main() {
    let data = "Hello, blockchain!";

    fs::write("output.txt", data)
        .expect("Failed to write file");

    println!("File written");
}
```

`fs::write()` takes a path and content, creates the file, and writes.

With error handling:

```rust
use std::fs;

fn write_file(path: &str, contents: &str) -> Result<(), String> {
    fs::write(path, contents)
        .map_err(|e| format!("Failed to write {}: {}", path, e))
}

fn main() {
    match write_file("output.txt", "Hello, blockchain!") {
        Ok(()) => println!("File written"),
        Err(e) => eprintln!("Error: {}", e),
    }
}
```

## Appending to a File

Add content to the end of a file without erasing it.

```rust
use std::fs::OpenOptions;
use std::io::Write;

fn main() {
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open("log.txt")
        .expect("Failed to open file");

    writeln!(file, "New log entry").expect("Failed to write");
}
```

`OpenOptions` gives you control over how to open the file:

- `.create(true)` - create if it doesn't exist
- `.append(true)` - add to end, don't overwrite
- `.open()` - actually open it

Then `writeln!()` writes to the file.

## Reading Line by Line

For large files, read line by line instead of loading everything into memory.

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let file = File::open("transactions.txt")
        .expect("Failed to open file");

    let reader = BufReader::new(file);

    for line in reader.lines() {
        match line {
            Ok(line) => println!("Line: {}", line),
            Err(e) => eprintln!("Error reading line: {}", e),
        }
    }
}
```

`BufReader` buffers the input, making reading efficient. You iterate through lines one at a time. Memory usage stays constant even for huge files.

This is how blockchain nodes read the ledger without running out of RAM.

## Reading User Input (stdin)

Accept input from the user.

```rust
use std::io;

fn main() {
    println!("Enter your address:");

    let mut input = String::new();
    io::stdin().read_line(&mut input)
        .expect("Failed to read line");

    let address = input.trim();
    println!("You entered: {}", address);
}
```

`io::stdin().read_line()` reads a line from the terminal. `trim()` removes the newline at the end.

With error handling:

```rust
use std::io;

fn get_user_input(prompt: &str) -> Result<String, String> {
    println!("{}", prompt);

    let mut input = String::new();
    io::stdin().read_line(&mut input)
        .map_err(|e| format!("Failed to read input: {}", e))?;

    Ok(input.trim().to_string())
}

fn main() {
    match get_user_input("Enter transaction amount:") {
        Ok(amount) => println!("Amount: {}", amount),
        Err(e) => eprintln!("Error: {}", e),
    }
}
```

## Writing to stdout and stderr

- `stdout` is for normal output
- `stderr` is for errors and diagnostics

```rust
use std::io::{self, Write};

fn main() {
    println!("Normal output");
    eprintln!("Error message");

    // Or write directly
    let stdout = io::stdout();
    writeln!(stdout.lock(), "Direct stdout").unwrap();

    let stderr = io::stderr();
    writeln!(stderr.lock(), "Direct stderr").unwrap();
}
```

In production, errors go to `stderr` so they don't mix with program output.

## Practical Example: Reading a Blockchain Log

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

#[derive(Debug)]
struct BlockLog {
    height: u64,
    hash: String,
    timestamp: u64,
}

fn parse_block_line(line: &str) -> Result<BlockLog, String> {
    let parts: Vec<&str> = line.split(',').collect();

    if parts.len() != 3 {
        return Err(String::from("Invalid format"));
    }

    let height = parts[0].parse::<u64>()
        .map_err(|_| String::from("Invalid height"))?;
    let hash = parts[1].to_string();
    let timestamp = parts[2].parse::<u64>()
        .map_err(|_| String::from("Invalid timestamp"))?;

    Ok(BlockLog { height, hash, timestamp })
}

fn load_blocks(path: &str) -> Result<Vec<BlockLog>, String> {
    let file = File::open(path)
        .map_err(|e| format!("Failed to open file: {}", e))?;

    let reader = BufReader::new(file);
    let mut blocks = Vec::new();

    for (line_num, line) in reader.lines().enumerate() {
        let line = line.map_err(|e| format!("Read error: {}", e))?;

        match parse_block_line(&line) {
            Ok(block) => blocks.push(block),
            Err(e) => {
                eprintln!("Error parsing line {}: {}", line_num + 1, e);
                continue;  // Skip bad lines
            }
        }
    }

    Ok(blocks)
}

fn main() {
    match load_blocks("blocks.log") {
        Ok(blocks) => {
            println!("Loaded {} blocks", blocks.len());
            for block in blocks {
                println!("{:?}", block);
            }
        }
        Err(e) => eprintln!("Failed to load blocks: {}", e),
    }
}
```

Example file content (`blocks.log`):

```
1,hash001,1000
2,hash002,2000
3,hash003,3000
```

This reads a blockchain log, parses each line, handles errors gracefully.

## Checking if File Exists

Before reading, check if the file exists.

```rust
use std::path::Path;

fn main() {
    if Path::new("config.txt").exists() {
        println!("Config file found");
    } else {
        println!("Config file not found");
    }
}
```

## Creating Directories

Sometimes you need to create directories.

```rust
use std::fs;

fn main() {
    fs::create_dir_all("data/blockchain/blocks")
        .expect("Failed to create directories");
}
```

`create_dir_all()` creates the entire path, including parent directories.

## Practical Example: Configuration File

```rust
use std::fs;

#[derive(Debug)]
struct Config {
    rpc_port: u16,
    data_dir: String,
    validator_key: String,
}

fn load_config(path: &str) -> Result<Config, String> {
    let contents = fs::read_to_string(path)
        .map_err(|e| format!("Failed to read config: {}", e))?;

    // Simple parsing (in real code, use serde/JSON)
    let mut config = Config {
        rpc_port: 8545,
        data_dir: String::from("./data"),
        validator_key: String::new(),
    };

    for line in contents.lines() {
        if line.starts_with("rpc_port=") {
            let port_str = &line[9..];
            config.rpc_port = port_str.parse()
                .map_err(|_| String::from("Invalid port"))?;
        }
        if line.starts_with("data_dir=") {
            config.data_dir = line[9..].to_string();
        }
        if line.starts_with("validator_key=") {
            config.validator_key = line[14..].to_string();
        }
    }

    Ok(config)
}

fn main() {
    match load_config("node.conf") {
        Ok(config) => {
            println!("Config loaded: {:?}", config);
        }
        Err(e) => eprintln!("Config error: {}", e),
    }
}
```

Example config file (`node.conf`):

```
rpc_port=8545
data_dir=/var/blockchain
validator_key=0xabcd1234
```

## I/O Error Patterns

| Situation              | Pattern                    |
| ---------------------- | -------------------------- |
| **Read small file**    | `fs::read_to_string()`     |
| **Read large file**    | `BufReader` + loop         |
| **Write small file**   | `fs::write()`              |
| **Append to file**     | `OpenOptions` + `writeln!` |
| **User input**         | `io::stdin().read_line()`  |
| **Error logging**      | `eprintln!()`              |
| **Check existence**    | `Path::exists()`           |
| **Create directories** | `fs::create_dir_all()`     |

## Why I/O Errors Happen

I/O is the messiest part of programming:

- **File doesn't exist** - user gave wrong path
- **Permission denied** - no read/write access
- **Disk full** - can't write
- **Corrupted file** - data is malformed
- **Timeout** - network I/O is slow
- **Encoding issues** - file is in wrong format

You must handle all of these.

## Best Practices

1. **Always handle errors** - never `.unwrap()` file operations in production
2. **Use descriptive messages** - include the path and operation in error messages
3. **Log what happened** - write to `stderr` for diagnostics
4. **Validate input** - check file exists before reading
5. **Close files properly** - Rust does this automatically, but be aware
6. **Use `BufReader` for large files** - don't load everything into memory
7. **Test error cases** - what if the file is missing? Corrupted?

## Why This Matters for Blockchain Nodes

A blockchain node is basically:

1. Read ledger from disk
2. Validate new transactions
3. Update state
4. Write to disk
5. Repeat

I/O is happening constantly. Sloppy I/O means:

- Data corruption
- Lost transactions
- State inconsistency
- Node crash on restart

Good I/O means:

- Persistent, reliable state
- Proper error recovery
- Audit trail
- Can debug issues

## Key Takeaway

File I/O in Rust is safe and explicit. Use `fs` for simple operations. Use `BufReader` for large files. Handle errors. Use `stderr` for diagnostics.

I/O is where theory meets reality. Perfect code doesn't matter if you lose your data. Learn I/O properly and your blockchain nodes will be reliable.
