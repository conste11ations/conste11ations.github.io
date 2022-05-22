import 'tailwindcss/tailwind.css'

export default function Code() {
  return (
    <>
      <div className="absolute m-8">
        <h1 className="text-5xl md:text-8xl">
          <span className="block animate-fade-in-down font-extrabold text-white xl:inline m-8">Code</span>
        </h1>
        <p className="block animate-fade-in-down text-white prose-p m-8 md:text-3xl">Coming soon!</p>
      </div>
      <img src="waves.svg" className="object-cover flex h-screen w-full" />
    </>
  )
}
