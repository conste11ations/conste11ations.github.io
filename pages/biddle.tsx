import { useState, useRef } from 'react'
import 'tailwindcss/tailwind.css'

const MAX_GUESSES = 6

const HOUSES = [
  {
    id: 1,
    address: '47 Maple Crescent, Toronto, ON',
    beds: 3,
    baths: 2,
    sqft: 1420,
    type: 'Semi-detached',
    year: 1962,
    description: 'Charming semi-detached in a quiet east-end neighbourhood. Original hardwood floors, updated kitchen, private backyard with mature trees. Steps to the subway.',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    price: 875000,
  },
  {
    id: 2,
    address: '112 Oak Drive, Vancouver, BC',
    beds: 4,
    baths: 3,
    sqft: 2100,
    type: 'Detached',
    year: 1988,
    description: 'Spacious detached home on a large lot in East Vancouver. Open-concept main floor, gas fireplace, double garage. Mountain views from the upper deck.',
    images: [
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    ],
    price: 1650000,
  },
  {
    id: 3,
    address: '8 Elmwood Ave, Montreal, QC',
    beds: 2,
    baths: 1,
    sqft: 980,
    type: 'Condo',
    year: 2005,
    description: 'Bright corner unit in Plateau-Mont-Royal. Floor-to-ceiling windows, in-unit laundry, heated underground parking. Walk to everything.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80',
    ],
    price: 495000,
  },
  {
    id: 4,
    address: '334 Birch Street, Calgary, AB',
    beds: 5,
    baths: 4,
    sqft: 3200,
    type: 'Detached',
    year: 2014,
    description: 'Executive home in Aspen Woods with fully finished basement. Chef\'s kitchen, triple car garage, landscaped yard with pergola. Top-rated schools nearby.',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
    ],
    price: 1125000,
  },
  {
    id: 5,
    address: '22 Pine Lane, Halifax, NS',
    beds: 3,
    baths: 2,
    sqft: 1650,
    type: 'Detached',
    year: 1945,
    description: 'Classic Maritime home with updated interiors. Wraparound porch, original wainscotting, detached workshop. Walking distance to the waterfront.',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
    ],
    price: 540000,
  },
]

function getTodaysHouse() {
  const start = new Date('2024-01-01').getTime()
  const now = new Date().getTime()
  const dayIndex = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return HOUSES[dayIndex % HOUSES.length]
}

function formatPrice(n: number) {
  return '$' + n.toLocaleString('en-CA')
}

function getHint(guess: number, actual: number): { label: string; color: string; arrow: string } {
  const diff = guess - actual
  const pct = Math.abs(diff) / actual

  if (pct <= 0.01) return { label: 'Sold!', color: 'bg-green-500', arrow: '' }
  if (pct <= 0.05) return { label: diff > 0 ? 'Just over' : 'Just under', color: 'bg-lime-500', arrow: diff > 0 ? '↓' : '↑' }
  if (pct <= 0.10) return { label: diff > 0 ? 'A bit high' : 'A bit low', color: 'bg-yellow-400', arrow: diff > 0 ? '↓↓' : '↑↑' }
  if (pct <= 0.20) return { label: diff > 0 ? 'Too high' : 'Too low', color: 'bg-orange-400', arrow: diff > 0 ? '↓↓↓' : '↑↑↑' }
  return { label: diff > 0 ? 'Way too high' : 'Way too low', color: 'bg-red-500', arrow: diff > 0 ? '↓↓↓↓' : '↑↑↑↑' }
}

export default function Biddle() {
  const house = getTodaysHouse()
  const [imgIndex, setImgIndex] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [guesses, setGuesses] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const [won, setWon] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setInputValue(raw ? Number(raw).toLocaleString('en-CA') : '')
  }

  const handleGuess = () => {
    const raw = Number(inputValue.replace(/,/g, ''))
    if (!raw || raw <= 0) return

    const newGuesses = [...guesses, raw]
    setGuesses(newGuesses)
    setInputValue('')

    const hint = getHint(raw, house.price)
    if (hint.label === 'Sold!' || newGuesses.length >= MAX_GUESSES) {
      setDone(true)
      setWon(hint.label === 'Sold!')
    }

    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleGuess()
  }

  const guessesLeft = MAX_GUESSES - guesses.length

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-8 px-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">biddle</h1>
        <p className="text-slate-400 text-sm mt-1">Guess the sale price of this home</p>
      </div>

      {/* House card */}
      <div className="w-full max-w-xl bg-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-6">
        {/* Image carousel */}
        <div className="relative">
          <img
            src={house.images[imgIndex]}
            className="w-full h-64 object-cover"
            alt="House"
          />
          {house.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {house.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === imgIndex ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-5">
          <p className="font-semibold text-lg text-white">{house.address}</p>
          <div className="flex gap-4 text-slate-400 text-sm mt-1 mb-3">
            <span>{house.beds} bed</span>
            <span>{house.baths} bath</span>
            <span>{house.sqft.toLocaleString()} sqft</span>
            <span>{house.type}</span>
            <span>Built {house.year}</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{house.description}</p>
        </div>
      </div>

      {/* Guess history */}
      {guesses.length > 0 && (
        <div className="w-full max-w-xl mb-4 flex flex-col gap-2">
          {guesses.map((g, i) => {
            const hint = getHint(g, house.price)
            return (
              <div key={i} className={`flex items-center justify-between rounded-xl px-4 py-3 ${hint.color} text-white font-semibold`}>
                <span>{formatPrice(g)}</span>
                <span className="flex items-center gap-2 text-sm">
                  {hint.label} {hint.arrow}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Input */}
      {!done ? (
        <div className="w-full max-w-xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Enter your guess"
                className="w-full bg-slate-700 text-white rounded-xl pl-7 pr-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-500"
              />
            </div>
            <button
              onClick={handleGuess}
              disabled={!inputValue}
              className="bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Guess
            </button>
          </div>
          <p className="text-slate-500 text-xs mt-2 text-center">
            {guessesLeft} guess{guessesLeft !== 1 ? 'es' : ''} remaining
          </p>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-slate-800 rounded-2xl p-6 text-center">
          {won ? (
            <>
              <p className="text-3xl mb-1">🏡</p>
              <p className="text-xl font-bold text-green-400 mb-1">You got it!</p>
              <p className="text-slate-300">in {guesses.length} guess{guesses.length !== 1 ? 'es' : ''}</p>
            </>
          ) : (
            <>
              <p className="text-3xl mb-1">😬</p>
              <p className="text-xl font-bold text-red-400 mb-1">Not quite</p>
              <p className="text-slate-300">Better luck tomorrow</p>
            </>
          )}
          <p className="text-2xl font-extrabold text-white mt-4">
            Sale price: {formatPrice(house.price)}
          </p>
        </div>
      )}
    </div>
  )
}
