// Gallery photos for Refuge of Hope Association, grouped by date.
//
// To add a NEW batch of photos:
//   1. Drop the image files into `frontend/public/gallery/`.
//   2. Add a new album block at the TOP of the list below (newest first),
//      with the date the photos are from and their file names.
// The Gallery page shows each album under its date heading.
export interface GalleryAlbum {
  /** ISO date (YYYY-MM-DD) — used to keep albums in order, newest first. */
  date: string
  /** Human-friendly date shown under the title, e.g. '7 September 2026'. */
  label: string
  /** The big message/story for this batch, shown as a heading above the photos. */
  title: string
  /** File names inside `public/gallery/` (served from `/gallery/<name>`). */
  photos: string[]
}

export const albums: GalleryAlbum[] = [
  {
    date: '2026-09-07',
    label: '7 September 2026',
    title: 'The children are saying thank you for your support',
    photos: [
      'photo-01.jpg',
      'photo-02.jpg',
      'photo-03.jpg',
      'photo-04.jpg',
      'photo-05.jpg',
      'photo-06.jpg',
      'photo-07.jpg',
      'photo-08.jpg',
      'photo-09.jpg',
      'photo-10.jpg',
      'photo-11.jpg',
      'photo-12.jpg',
      'photo-13.jpg',
      'photo-14.jpg',
      'photo-15.jpg',
      'photo-16.jpg',
    ],
  },
]
