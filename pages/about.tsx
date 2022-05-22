import 'tailwindcss/tailwind.css'

export default function About() {
  return (
    <>
      <div className="absolute m-8">
        <h1 className="text-5xl md:text-8xl">
          <span className="block animate-fade-in-down font-extrabold text-white xl:inline m-8">About</span>
        </h1>
        <p className="block animate-fade-in-down text-white prose-p m-8 md:text-3xl">My name is Rachel Kat and I'm a full-stack software engineer. <br /><br />
          I used to manage cross-functional development teams in medium-to-large financial institutions.<br /><br />
          Nowadays, I work in fintech startups and I tinker with this website on the weekends.</p>
      </div>
      <img src="waves.svg" className="object-cover flex h-screen w-full" />
    </>

  )
}
