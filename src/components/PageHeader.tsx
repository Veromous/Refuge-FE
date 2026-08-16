interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

// Simple banner used at the top of inner pages.
export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-b from-hope-50 to-white">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        {eyebrow && (
          <span className="inline-block rounded-full bg-hope-100 px-4 py-1 text-sm font-medium text-hope-700">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
