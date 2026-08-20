// The funds a donor can direct a gift toward. The `id` values must match the
// DonationCause enum in the backend (prisma/schema.prisma).
import { HandHeart, Cross, Church } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type CauseId = 'GENERAL' | 'EVANGELISM' | 'CHURCH_SUPPORT'

export interface Cause {
  id: CauseId
  label: string
  Icon: LucideIcon
  // Short line shown inside the donation selector.
  short: string
  // Fuller description used on the "What We Do" gospel section.
  description: string
}

export const causes: Cause[] = [
  {
    id: 'GENERAL',
    label: 'Where it’s needed most',
    Icon: HandHeart,
    short: 'Relief across education, agriculture and health.',
    description:
      'Let us put your gift wherever the need is greatest: a meal, a lesson, a harvest, a healing.',
  },
  {
    id: 'EVANGELISM',
    label: 'Evangelism & Soul Winning',
    Icon: Cross,
    short: 'Carry the Gospel to those yet to hear it.',
    description:
      'Fund outreaches, Bibles and mission trips that carry the Good News to homes, streets and villages that have never heard it. Every gift becomes a seed of the Gospel.',
  },
  {
    id: 'CHURCH_SUPPORT',
    label: 'Support a Growing Church',
    Icon: Church,
    short: 'Stand with upcoming servants of Christ.',
    description:
      'Stand with growing churches and faithful, upcoming servants of Christ who have laid down everything for the Gospel, helping them keep the doors open and the message alive.',
  },
]

// The default fund when a donor does not pick one.
export const defaultCauseId: CauseId = 'GENERAL'
