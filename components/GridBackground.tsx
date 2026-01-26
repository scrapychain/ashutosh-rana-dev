export default function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 opacity-[0.14]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(16,185,129,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.22) 1px, transparent 1px)',
        backgroundSize: '42px 42px',
        maskImage:
          'radial-gradient(circle at 30% 15%, rgba(0,0,0,1) 0, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
      }}
    />
  )
}
