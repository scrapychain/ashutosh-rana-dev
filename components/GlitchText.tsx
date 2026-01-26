export default function GlitchText({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <span
        aria-hidden
        className="absolute inset-0 translate-x-[2px] -translate-y-[1px] opacity-20 animate-jitter"
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-[2px] translate-y-[1px] opacity-15 animate-jitter"
      >
        {text}
      </span>
    </span>
  )
}
