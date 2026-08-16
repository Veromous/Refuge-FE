import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

// Welcome-page hero photo. Place your image at frontend/public/hero.jpg
// (a photo of the children with books, school items and food works well).
//
// `cover` renders the image as a full-bleed background that fills its parent
// (used behind the hero text). Its fallback is a deep green wash so the hero
// still looks intentional before the photo is added.
export default function HeroImage({ cover = false }: { cover?: boolean }) {
  const [imgOk, setImgOk] = useState(true)

  if (cover) {
    return imgOk ? (
      <img
        src="/hero.jpg"
        alt="Children supported by Refuge of Hope with books and food"
        className="absolute inset-0 h-full w-full object-cover object-[center_top]"
        onError={() => setImgOk(false)}
      />
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-hope-800 to-hope-950" />
    )
  }

  // Default: a rounded card with a dashed placeholder fallback.
  if (imgOk) {
    return (
      <img
        src="/hero.jpg"
        alt="Children supported by Refuge of Hope with books and food"
        className="h-full min-h-[360px] w-full rounded-3xl object-cover shadow-lg lg:min-h-[560px]"
        onError={() => setImgOk(false)}
      />
    )
  }

  return (
    <div className="grid h-full min-h-[360px] w-full place-items-center rounded-3xl border-2 border-dashed border-hope-200 bg-hope-50 p-8 text-center lg:min-h-[560px]">
      <div>
        <ImageIcon className="mx-auto h-10 w-10 text-hope-400" strokeWidth={1.5} />
        <p className="mt-3 font-medium text-hope-700">Your hero image goes here</p>
        <p className="mt-1 text-sm text-slate-500">
          Add a photo at <code className="text-hope-700">public/hero.jpg</code>
        </p>
      </div>
    </div>
  )
}
