import 'tailwindcss/tailwind.css'

export default function BuildingBiddle() {
    return (
        <div className="min-h-screen bg-slate-800 p-9 prose-figcaption:text-slate-400 prose-a:text-cyan-600 prose-a:underline hover:prose-a:text-cyan-300">
            <h1 className="text-5xl md:text-6xl mb-4">
                <span className="block animate-fade-in-down font-extrabold text-white xl:inline">
                    Building Biddle
                </span>
            </h1>
            <p className="block animate-fade-in-down text-slate-400 prose-p mb-8">
                A daily house price guessing game, a standup ritual, and a data licensing rabbit hole.
            </p>

            <h2 className="text-2xl font-bold text-white mb-3">How it started</h2>
            <p className="block animate-fade-in-down text-white prose-p mb-4">
                My team at <a href="https://www.dialogue.co">Dialogue Health Technologies</a> stumbled
                across a game where you guess the sale price of a house from listing photos. It was fun.
                We played it at standup a few times. The problem was it only had US listings, and
                guessing the prices of housing in cities outside our own (Toronto & Montréal) didn't feel as relatable.
            </p>
            <p className="block animate-fade-in-down text-white prose-p mb-4">
                So I built one. <a href="/biddle">Biddle</a> shows you information about a house (that I manually curate for now): photos, beds, baths, square
                footage, year built, and a description. Then you get 6 guesses to land on the sale price.
                Each guess tells you how far off you are.
            </p>
            <p className="block animate-fade-in-down text-white prose-p mb-4">
                How far off can you be? Well, the game includes properties that sold for anywhere from $200k to $20M. So I figured
                a percentage-based hint system would be best. Guessing $1M on a $1.2M house is pretty good, but guessing $400k on a $600k house is not.
                The hints tell you how far off your guess is as a percentage of the actual price (the boundaries are 5% higher/lower).
            </p>
            <p className="block animate-fade-in-down text-white prose-p mb-4">
                Building the game was the easy part.
            </p>
            <h2 className="text-2xl font-bold text-white mb-3 mt-8">Then I tried to get the data</h2>
            <p className="block animate-fade-in-down text-white prose-p mb-4">
                Canadian real estate listing data is controlled by CREA (Canadian Real Estate
                Association) and through the MLS system. Access requires being a licensed realtor or
                going through an approved data vendor. I found <a href="https://www.repliers.com">Repliers</a>,
                which seemed like the most developer-friendly option in the Canadian market. They had
                an API, docs, the whole thing. Then I read the terms.
            </p>
            <p className="block animate-fade-in-down text-white prose-p mb-4">
                The restrictions aren't really Repliers' fault - they're passing down CREA and MLS
                board rules. The short version: you can only use MLS data if you're a licensed real
                estate professional, or if you're a developer building something exclusively for one.
                Building an independent product on top of MLS data isn't allowed. There's no hobbyist
                exception. Their entry plan starts at $199/month and doesn't include real listings
                anyway - just sandbox data.
            </p>
            <p className="block animate-fade-in-down text-white prose-p mb-4">
                From what I can tell Repliers used to be more accessible to independent developers,
                but the MLS licensing constraints have tightened over time. They seem to have pivoted
                toward serving real estate brokerages and the vendors hired by them, which makes sense
                as a business - that's where the money is. As a hobbyist you're just not the customer.
            </p>

            <h2 className="text-2xl font-bold text-white mb-3 mt-8">Montreal is even harder</h2>
            <p className="block animate-fade-in-down text-white prose-p mb-4">
                Adding Montreal was part of the original goal. Quebec listings don't run through the national
                MLS system at all - they're managed by <a href="https://www.centris.ca">Centris</a>,
                which is Quebec's own real estate board platform. Centris requires individual brokerage
                authorization rather than a unified feed. There's no historical sold data, only active
                listings. Getting anything useful out of it as an independent developer is essentially
                a dead end.
            </p>
            <p className="block animate-fade-in-down text-white prose-p mt-8">
                In the meantime — <a href="/biddle">play Biddle here</a>.
            </p>
        </div>
    )
}
