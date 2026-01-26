export default function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 opacity-[0.22] mix-blend-overlay"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.03) 1px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 6px)',
      }}
    />
  )
}
