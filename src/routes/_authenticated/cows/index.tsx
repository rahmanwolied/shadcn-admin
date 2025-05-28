import { createFileRoute } from '@tanstack/react-router'
import Cows from '@/features/cows'

export const Route = createFileRoute('/_authenticated/cows/')({
  component: Cows,
})
