// Dependency-free Rust syntax highlighter.
// Single-pass tokenizer: every character of the input is preserved (matched
// tokens are classified, the gaps between them are emitted verbatim), so the
// output always reproduces the source exactly. It can only mis-color, never
// drop or scramble code. Palette is tuned for high contrast on pure black.

const KEYWORDS = new Set([
  'as', 'async', 'await', 'break', 'const', 'continue', 'crate', 'dyn', 'else',
  'enum', 'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop',
  'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self', 'static',
  'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use', 'where', 'while',
])

const PRIMITIVES = new Set([
  'i8', 'i16', 'i32', 'i64', 'i128', 'isize',
  'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
  'f32', 'f64', 'bool', 'char', 'str', 'String',
])

const CONSTS = new Set(['Some', 'None', 'Ok', 'Err', 'true', 'false', 'Self'])

// Token color classes: all light on black except comments (intentionally dim).
const COLOR = {
  comment: 'text-emerald-200/40 italic',
  string: 'text-amber-200',
  attr: 'text-emerald-400/70',
  lifetime: 'text-orange-300',
  macro: 'text-teal-300',
  number: 'text-orange-300',
  keyword: 'text-emerald-300 font-medium',
  type: 'text-cyan-300',
  const: 'text-cyan-300',
  plain: 'text-emerald-100/90',
} as const

const TOKEN_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])')|(#!?\[[^\]]*\])|('[a-z_][a-zA-Z0-9_]*)|\b([A-Za-z_][A-Za-z0-9_]*)\s*!|\b(0x[0-9a-fA-F_]+|0b[01_]+|\d[\d_]*(?:\.\d+)?(?:[iuf](?:8|16|32|64|128|size))?)\b|\b([A-Za-z_][A-Za-z0-9_]*)\b/g

type Token = { className: string; value: string }

function classify(m: RegExpExecArray): keyof typeof COLOR {
  if (m[1] !== undefined) return 'comment'
  if (m[2] !== undefined) return 'string'
  if (m[3] !== undefined) return 'attr'
  if (m[4] !== undefined) return 'lifetime'
  if (m[5] !== undefined) return 'macro'
  if (m[6] !== undefined) return 'number'
  const word = m[7]
  if (word !== undefined) {
    if (KEYWORDS.has(word)) return 'keyword'
    if (CONSTS.has(word)) return 'const'
    if (PRIMITIVES.has(word) || /^[A-Z]/.test(word)) return 'type'
  }
  return 'plain'
}

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  let m: RegExpExecArray | null
  TOKEN_RE.lastIndex = 0
  while ((m = TOKEN_RE.exec(code)) !== null) {
    if (m.index > last) {
      tokens.push({ className: COLOR.plain, value: code.slice(last, m.index) })
    }
    tokens.push({ className: COLOR[classify(m)], value: m[0] })
    last = m.index + m[0].length
    if (m[0].length === 0) TOKEN_RE.lastIndex++ // guard against zero-width loops
  }
  if (last < code.length) {
    tokens.push({ className: COLOR.plain, value: code.slice(last) })
  }
  return tokens
}

export default function RustCode({ code }: { code: string }) {
  const tokens = tokenize(code)
  return (
    <pre className="whitespace-pre-wrap break-words p-4 text-[13px] leading-relaxed sm:text-sm">
      <code className="font-mono">
        {tokens.map((t, i) => (
          <span key={i} className={t.className}>
            {t.value}
          </span>
        ))}
      </code>
    </pre>
  )
}
