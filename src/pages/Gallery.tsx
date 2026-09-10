import { useState, useEffect, useCallback, useMemo } from 'react'
import { ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { albums } from '../data/gallery'

// Single grid tile. Falls back to a dashed placeholder if the image is missing,
// mirroring the pattern in HeroImage.
function Tile({ src, onOpen }: { src: string; onOpen: () => void }) {
  const [imgOk, setImgOk] = useState(true)

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-hope-50 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {imgOk ? (
        <img
          src={`/gallery/${src}`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={() => setImgOk(false)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center border-2 border-dashed border-hope-200 p-6 text-center">
          <div>
            <ImageIcon className="mx-auto h-8 w-8 text-hope-400" strokeWidth={1.5} />
            <p className="mt-2 text-sm text-hope-700">{src}</p>
          </div>
        </div>
      )}
    </button>
  )
}

export default function Gallery() {
  // Albums sorted newest first by date.
  const sorted = useMemo(
    () => [...albums].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  )
  // A flat list of every photo, so the lightbox can page through all of them.
  const allPhotos = useMemo(() => sorted.flatMap((a) => a.photos), [sorted])

  // Index into allPhotos of the photo shown in the lightbox, or null when closed.
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + allPhotos.length) % allPhotos.length)),
    [allPhotos.length],
  )
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % allPhotos.length)),
    [allPhotos.length],
  )

  // Keyboard controls while the lightbox is open.
  useEffect(() => {
    if (active === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, close, prev, next])

  const hasPhotos = allPhotos.length > 0

  return (
    <>
      <PageHeader
        eyebrow="Our work in pictures"
        title="Gallery"
        subtitle="Moments from our outreach and the communities we serve, grouped by date."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        {!hasPhotos ? (
          <p className="text-center text-slate-500">Photos are coming soon.</p>
        ) : (
          <div className="space-y-14">
            {sorted.map((album) => (
              <div key={album.date}>
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    {album.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-hope-700">
                    {album.label}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {album.photos.map((src) => (
                    <Tile
                      key={src}
                      src={src}
                      onOpen={() => setActive(allPhotos.indexOf(src))}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Previous photo"
            className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <figure className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/gallery/${allPhotos[active]}`}
              alt=""
              className="mx-auto max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {active + 1} / {allPhotos.length}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Next photo"
            className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  )
}
