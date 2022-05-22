import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import { DuskMountains } from '../components/DuskMountains'
import Nav from '../components/Nav'

export default function Home() {
  return (
    <>
      <div className="h-screen overflow-y-auto overflow-x-hidden [perspective:100px]">
        <Nav />
        <DuskMountains />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none">
          {/* <h1 className="prose-xl lg:prose-xl">Heading</h1> */}
          <h1 className="text-5xl md:text-8xl">
            <span className="block animate-fade-in-down font-extrabold text-white xl:inline">conste11ations</span>
            <span className="block animate-fade-in-up text-2xl md:text-4xl text-teal-400 xl:inline">.github.io</span>
          </h1>
        </div>
        <div className="md:grid grid-cols-4">
          <Link href="/about" as={process.env.BACKEND_URL + '/about'}>
            <div className="flex h-48 bg-indigo-900 hover:bg-teal-700 drop-shadow-xl">
              <h1 className="m-auto z-50 font-extrabold text-white text-4xl">
                About
              </h1>
            </div>
          </Link>
          <Link href="/talk" as={process.env.BACKEND_URL + '/talk'}>
            <div className="flex h-48 bg-indigo-800 hover:bg-teal-700 drop-shadow-xl">
              <h1 className="m-auto font-extrabold text-white text-4xl">
                Talk
              </h1>
            </div>
          </Link>
          <Link href="/code" as={process.env.BACKEND_URL + '/code'}>
            <div className="flex h-48 bg-indigo-700 hover:bg-teal-700 drop-shadow-xl">
              <h1 className="m-auto font-extrabold text-white text-4xl">
                Code
              </h1>
            </div>
          </Link>
          <Link href="/contact" as={process.env.BACKEND_URL + '/contact'}>
            <div className="flex h-48 bg-indigo-600 hover:bg-teal-700 drop-shadow-xl">
              <h1 className="m-auto font-extrabold text-white text-4xl">
                Contact
              </h1>
            </div>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-teal-600 to-blue-900 h-screen justify-center align-center">
          <Link href="/about" as={process.env.BACKEND_URL + '/about'}>
            <p className="prose text-white">Last updated 2022</p>
          </Link>
        </div>
      </div>
    </>
  )
}
