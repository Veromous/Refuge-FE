// Events for Refuge of Hope Association.
//
// The Events page automatically splits these into "Upcoming" and "Past" using
// the `date` field compared to today, so you only maintain one list.
//
// To add an event:
//   1. (Optional) Drop any photos into `frontend/public/gallery/`.
//   2. Add an entry below with its date, place, a short description, and the
//      photo file names. Order does not matter; the page sorts by date.
export interface EventItem {
  /** ISO date (YYYY-MM-DD) of the event. Used to sort and to decide
   *  whether the event is upcoming or past. */
  date: string
  /** Human-friendly date shown on the card, e.g. '7 September 2026'. */
  dateLabel: string
  /** Short event name, e.g. 'Back to School Supplies Drive'. */
  title: string
  /** Where it happens / happened. */
  location: string
  /** A sentence or two on what the event is and its impact. */
  description: string
  /** File names inside `public/gallery/` to show with the event. Optional. */
  photos?: string[]
}

export const events: EventItem[] = [
  {
    date: '2026-09-07',
    dateLabel: '7 September 2026',
    title: 'Back to School Supplies Drive',
    location: 'Valley of Excellence Nursery and Primary School, Ndzah',
    description:
      'We visited pupils at the start of the school year and shared books, backpacks and other school materials, so that no child would be kept from learning for lack of supplies. The joy on their faces said it all.',
    photos: ['photo-08.jpg', 'photo-06.jpg', 'photo-01.jpg', 'photo-11.jpg'],
  },
]
