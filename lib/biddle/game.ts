import { House } from './types'
import { CORRECT_THRESHOLD } from './constants'

export function getTodaysHouse(houses: House[], city: string): House {
  const cityHouses = houses.filter(h => h.city === city)
  const start = new Date('2024-01-01').getTime()
  const now = new Date().getTime()
  const dayIndex = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return cityHouses[dayIndex % cityHouses.length]
}

export function formatPrice(n: number): string {
  return '$' + n.toLocaleString('en-CA')
}

export interface Hint {
  label: string
  color: string
  arrow: string
}

export function getHint(guess: number, actual: number): Hint {
  const diff = guess - actual
  const pct = Math.abs(diff) / actual

  if (Math.abs(diff) <= CORRECT_THRESHOLD) return { label: 'Sold!', color: 'bg-green-500', arrow: '' }
  if (pct <= 0.05) return { label: diff > 0 ? 'Just over' : 'Just under', color: 'bg-lime-500', arrow: diff > 0 ? '↓' : '↑' }
  if (pct <= 0.10) return { label: diff > 0 ? 'A bit high' : 'A bit low', color: 'bg-yellow-400', arrow: diff > 0 ? '↓↓' : '↑↑' }
  if (pct <= 0.20) return { label: diff > 0 ? 'Too high' : 'Too low', color: 'bg-orange-400', arrow: diff > 0 ? '↓↓↓' : '↑↑↑' }
  return { label: diff > 0 ? 'Way too high' : 'Way too low', color: 'bg-red-500', arrow: diff > 0 ? '↓↓↓↓' : '↑↑↑↑' }
}
