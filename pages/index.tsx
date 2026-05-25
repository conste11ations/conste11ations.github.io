import Link from 'next/link'
import { useEffect, useRef } from 'react'
import 'tailwindcss/tailwind.css'
import { DuskMountains } from '../components/DuskMountains'
import Nav from '../components/Nav'

const IRC_MESSAGES = [
  { ts: '22:47', user: '*** conste11ations', text: 'has joined #contact', system: true },
  { ts: '22:47', user: 'conste11ations', text: 'hey, what\'s up?' },
  { ts: '22:52', user: '*** conste11ations', text: 'is away (afk)', system: true },
]

function IrcChat() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const lines = section.querySelectorAll<HTMLElement>('.irc-line')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lines.forEach((line, i) => {
            setTimeout(() => line.classList.add('visible'), i * 400)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="relative h-screen bg-black flex flex-col justify-center px-8 md:px-24 font-mono">
      <div className="border border-gray-600 rounded max-w-2xl w-full">
        {/* Title bar */}
        <div className="bg-gray-800 text-gray-400 text-xs px-3 py-1 border-b border-gray-600 select-none">
          #contact — conste11ations.github.io IRC
        </div>
        {/* Messages */}
        <div className="p-4 space-y-2">
          {IRC_MESSAGES.map((msg, i) => (
            <div key={i} className="irc-line text-sm md:text-base leading-relaxed">
              <span className="text-gray-500 mr-3">[{msg.ts}]</span>
              {msg.system ? (
                <span className="text-gray-400 italic">{msg.user} {msg.text}</span>
              ) : (
                <>
                  <span className="text-teal-400">&lt;{msg.user}&gt;</span>
                  <span className="text-gray-200 ml-2">{msg.text}</span>
                </>
              )}
            </div>
          ))}
        </div>
        {/* Input bar */}
        <div className="border-t border-gray-600 px-3 py-2 flex items-center text-sm text-gray-500 select-none">
          <span className="mr-2">&gt;</span>
          <span className="w-2 h-4 bg-gray-500 animate-pulse inline-block" />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <nav className="fixed right-0 m-8 z-50">
        <Link href="https://www.github.com/conste11ations">
          <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="animate-bounce octicon octicon-mark-github v-align-middle">
            <path fill="#fff" fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </Link>
      </nav>

      {/* Section 1: Hero */}
      <div className="relative h-screen overflow-hidden bg-black">
        <DuskMountains />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none">
          <h1 className="text-5xl md:text-8xl">
            <span className="block animate-fade-in-down font-extrabold text-white xl:inline">conste11ations</span>
            <span className="block animate-fade-in-up text-2xl md:text-4xl text-teal-400 xl:inline">.github.io</span>
          </h1>
        </div>
      </div>

      {/* Nav cards */}
      <div className="md:grid md:grid-cols-3">
        <Link href="/about" as={process.env.BACKEND_URL + '/about'}>
          <div className="flex h-20 bg-indigo-900 hover:bg-teal-700 drop-shadow-xl">
            <h2 className="m-auto font-extrabold text-white text-2xl">About</h2>
          </div>
        </Link>
        <Link href="/talk" as={process.env.BACKEND_URL + '/talk'}>
          <div className="flex h-20 bg-indigo-800 hover:bg-teal-700 drop-shadow-xl">
            <h2 className="m-auto font-extrabold text-white text-2xl">Talk</h2>
          </div>
        </Link>
        <Link href="/contact" as={process.env.BACKEND_URL + '/contact'}>
          <div className="flex h-20 bg-indigo-600 hover:bg-teal-700 drop-shadow-xl">
            <h2 className="m-auto font-extrabold text-white text-2xl">Contact</h2>
          </div>
        </Link>
      </div>

      {/* Section 2: About */}
      <div className="relative h-screen">
        <div className="absolute m-8 z-10">
          <h1 className="text-5xl md:text-8xl">
            <span className="block animate-fade-in-down font-extrabold text-white xl:inline m-8">About</span>
          </h1>
          <p className="block animate-fade-in-down text-white prose-p m-8 md:text-3xl">My name is Rachel Kat and I&apos;m a full-stack software engineer. <br /><br />
            I used to manage cross-functional development teams in medium-to-large financial institutions.<br /><br />
            Nowadays, I work in fintech startups and I tinker with this website on the weekends.</p>
        </div>
        <img src="waves.svg" className="object-cover flex h-screen w-full" />
      </div>

      {/* Section 3: Talk */}
      <div className="relative h-screen">
        <div className="absolute m-8 z-10 text-white prose-a:text-cyan-600 prose-a:underline hover:prose-a:text-cyan-300">
          <h1 className="text-5xl md:text-8xl mb-4">
            <span className="block animate-fade-in-down font-extrabold text-white xl:inline">Talk</span>
          </h1>
          <Link href="/talk/ben-eater-clock-module" as={process.env.BACKEND_URL + '/talk/ben-eater-clock-module'}>
            Reviewing Ben Eater&apos;s Clock Module Kit
          </Link>
        </div>
        <img src="waves.svg" className="object-cover flex h-screen w-full" />
      </div>

{/* Section 4: Contact */}
      <IrcChat />
    </>
  )
}
