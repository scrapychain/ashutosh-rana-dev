export default function Prose({ html }: { html: string }) {
  return (
    <div
      className="prose prose-invert max-w-none prose-headings:tracking-widest prose-headings:text-emerald-200 prose-p:text-emerald-100/80 prose-li:text-emerald-100/80 prose-strong:text-emerald-100 prose-code:text-emerald-200 prose-code:bg-black/60 prose-code:border prose-code:border-emerald-400/25 prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-l-emerald-400/50 prose-blockquote:text-emerald-100/75"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
