import Link from 'next/link'
import 'tailwindcss/tailwind.css'

export default function Talk() {
  return (
    <>
      <div className="absolute m-8 text-white prose-a:text-cyan-600 prose-a:underline hover:prose-a:text-cyan-300">
        <h1 className="text-5xl md:text-8xl mb-4">
          <span className="block animate-fade-in-down font-extrabold text-white xl:inline">Talk</span>
        </h1>
        <Link href="/talk/ben-eater-clock-module" as={process.env.BACKEND_URL + '/talk/ben-eater-clock-module'}>
          Reviewing Ben Eater's Clock Module Kit
        </Link>
      </div>
      <img src="waves.svg" className="object-cover flex h-screen w-full" />
    </>
  )
}
