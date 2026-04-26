import 'tailwindcss/tailwind.css'

export default function Privacy() {
  return (
    <>
      <div className="relative m-8 max-w-2xl pb-16">
        <h1 className="text-5xl md:text-8xl">
          <span className="block animate-fade-in-down font-extrabold text-white xl:inline m-8 whitespace-nowrap">Privacy Policy</span>
        </h1>
        <div className="block animate-fade-in-down text-white m-8 md:text-lg space-y-6">
          <p className="text-slate-400 text-sm">Last updated: April 2026</p>

          <p>This website (<strong>rachelkat.com</strong>) is a personal site. I take your privacy seriously and collect as little as possible.</p>

          <div>
            <h2 className="text-xl font-bold text-teal-400 mb-2">What I collect</h2>
            <p>This site uses <strong>Google Analytics</strong> to understand how many people visit and which pages they view. This may collect:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-slate-300">
              <li>Pages visited and time spent</li>
              <li>General location (country/city level)</li>
              <li>Browser and device type</li>
              <li>Referring website</li>
            </ul>
            <p className="mt-2 text-slate-300">This data is aggregated and anonymous. I cannot identify individual visitors.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-teal-400 mb-2">Cookies</h2>
            <p className="text-slate-300">Google Analytics sets cookies to distinguish returning visitors. These cookies do not store personal information.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-teal-400 mb-2">Advertising</h2>
            <p className="text-slate-300">This site may display ads served by <strong>Google AdSense</strong>. Google may use cookies to show ads based on your prior visits to this or other websites. You can opt out via <a href="https://www.google.com/settings/ads" className="text-teal-400 underline hover:text-teal-300">Google's ad settings</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-teal-400 mb-2">Third-party links</h2>
            <p className="text-slate-300">This site links to external websites. I am not responsible for their privacy practices.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-teal-400 mb-2">Contact</h2>
            <p className="text-slate-300">Questions? Reach out via <a href="https://github.com/conste11ations" className="text-teal-400 underline hover:text-teal-300">GitHub</a>.</p>
          </div>
        </div>
      </div>
      <img src="circles.svg" className="fixed inset-0 object-cover w-full h-full -z-10" />
    </>
  )
}
