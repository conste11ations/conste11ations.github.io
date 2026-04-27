import { useState, useRef } from 'react'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { MAX_GUESSES, CITIES } from '../lib/biddle/constants'
import { getTodaysHouse, getHint, formatPrice } from '../lib/biddle/game'
import houses from '../data/houses.json'

function CityPicker({ onSelect }: { onSelect: (city: string) => void }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">biddle</h1>
      <p className="text-slate-400 mb-10">Choose a city and start guessing house prices!</p>
      <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
        {CITIES.map(city => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="bg-slate-800 hover:bg-teal-700 text-white font-semibold text-lg py-4 rounded-2xl transition-colors shadow-md"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Biddle() {
  const [city, setCity] = useState<string | null>(null)
  const [imgIndex, setImgIndex] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [guesses, setGuesses] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const [won, setWon] = useState(false)
  const [descExpanded, setDescExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  if (!city) {
    if (CITIES.length === 1) {
      setCity(CITIES[0])
      return null
    }
    return <CityPicker onSelect={setCity} />
  }

  const house = getTodaysHouse(houses as any, city)
  const displayImages = house.images

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

  const resetCity = () => {
    setCity(null)
    setGuesses([])
    setDone(false)
    setWon(false)
    setInputValue('')
    setImgIndex(0)
    setDescExpanded(false)
  }

  return (
    <>
    <Head>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4564824503296156"
        crossOrigin="anonymous"
      />
    </Head>
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-8 px-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">biddle</h1>
        <p className="text-slate-400 text-sm mt-1">
          {`Guess the sale price of this home in ${city}. `}
          <button onClick={resetCity} className="text-teal-400 underline hover:text-teal-300">
            Change city
          </button>
        </p>
      </div>

      {/* House card */}
      <div className="w-full max-w-xl bg-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-6">
        <div className="relative">
          <img src={displayImages[imgIndex]} className="w-full h-80 object-cover" alt="House" />
          {displayImages.length > 1 && (
            <>
              <button
                onClick={() => setImgIndex((imgIndex - 1 + displayImages.length) % displayImages.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              >
                ‹
              </button>
              <button
                onClick={() => setImgIndex((imgIndex + 1) % displayImages.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              >
                ›
              </button>
              <span className="absolute bottom-2 right-3 text-white/70 text-xs">{imgIndex + 1} / {displayImages.length}</span>
            </>
          )}
        </div>
        <div className="p-5">
          <div className="flex gap-4 text-slate-400 text-sm mb-3">
            <span>{house.beds} bed</span>
            <span>{house.baths} bath</span>
            <span>{typeof house.sqft === 'number' ? house.sqft.toLocaleString() : house.sqft} sqft</span>
            <span>{house.type}</span>
            <span>Built {house.year}</span>
          </div>
          <div className="relative">
            <p
              className="text-slate-300 text-sm leading-relaxed"
              style={descExpanded ? undefined : { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {house.description}
            </p>
            {!descExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-800 to-transparent" />
            )}
          </div>
          <button
            onClick={() => setDescExpanded(v => !v)}
            className="text-teal-400 hover:text-teal-300 text-xs mt-2"
          >
            {descExpanded ? 'Show less' : 'Show more'}
          </button>
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
                <span className="flex items-center gap-2 text-sm">{hint.label} {hint.arrow}</span>
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
            List price: {formatPrice(house.price)}
          </p>
          <p className="text-slate-400 text-sm mt-1">{house.address}</p>
        </div>
      )}

      {/* Ko-fi */}
      <div className="mt-8 mb-4">
        <a href="https://ko-fi.com/F2F21YIAWI" target="_blank" rel="noopener noreferrer">
          <img height="36" style={{ border: '0px', height: '36px' }} src="https://storage.ko-fi.com/cdn/kofi1.png?v=6" alt="Buy Me a Coffee at ko-fi.com" />
        </a>
      </div>
    </div>
    </>
  )
}
