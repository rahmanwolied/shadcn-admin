import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { UserStatus } from './schema'

export type CowCategories = 'gold' | 'platinum' | 'silver'

export const callTypes = new Map<UserStatus, string>([
  ['old', 'bg-green-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['new', 'bg-red-300/40 border-neutral-300'],
])

export const cowTypes = new Map<CowCategories, string>([
  ['platinum', 'bg-green-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['silver', 'bg-red-300/40 border-neutral-300'],
  ['gold', 'bg-yellow-300/40 border-yellow-300'],
])

export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: IconUsersGroup,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: IconCash,
  },
] as const
