import 'tailwindcss/tailwind.css'

export default function ClockModule() {
    return (
        <div className="bg-slate-800 p-9 prose-figcaption:text-slate-400 prose-a:text-cyan-600 prose-a:underline hover:prose-a:text-cyan-300">
            <h1 className="text-5xl md:text-6xl mb-4">
                <span className="block animate-fade-in-down font-extrabold text-white xl:inline">Reviewing Ben Eater's Clock Module</span>
            </h1>
            <img src="../clock-module.jpg" className="rounded-lg md:w-1/2 m-auto" />
            <figcaption className="animate-fade-in-down text-center mt-4">
                Putting together Ben Eater's clock module was a lot of fun.
            </figcaption>
            <p className="block animate-fade-in-down text-white prose-p my-4">
                This kit was a gift from some great friends who were interested in furthering their knowledge about computers,
                and were considering <a href="https://eater.net/8bit">building an 8-bit computer from scratch</a>.
            </p>
            <p className="block font-bold text-white prose-p mb-4">
                Why you should <a href="https://eater.net/8bit/clock">buy this kit</a>
            </p>
            <ul className="block animate-fade-in-down list-disc text-white ml-5 mb-4">
                <li>If you learn best by watching videos</li>
                <li>All the ingredients are included</li>
                <li>Great conceptual overview of a computer's clock</li>
                <li>Backup components are included - handy if you burn something out from misconfiguration</li>
                <li>You want to support a great learning resource</li>
            </ul>
            <p className="block font-bold text-white prose-p mb-4">
                Why you should not buy this kit
            </p>
            <ul className="block animate-fade-in-down list-disc text-white ml-5 mb-4">
                <li>If you prefer to work off of a schematic rather than following alongside a video - at times I found myself pausing and squinting,
                    wanting to get things right before turning the power on</li>
                <li>If you have some trouble reading schematic diagrams using industry-standard symbolic representations
                    or are more used to style of Fritzing circuit diagrams, etc</li>
                <li>You want to buy the full computer project kit!</li>
            </ul>
            <p className="animate-fade-in-down text-white prose-p mb-4">
                I learn best by reading, but the video tutorials provide one of the best explanations I've heard.
                You don't just learn how to put the clock together, you learn why you need the clock to behave this way.
                His videos are still accessible even to those who have just begun to dip their toes into the subject.
            </p>
            <video src="../clock-module-demo.mov" controls className="rounded-lg md:w-1/2 m-auto"></video>
            <figcaption className="block animate-fade-in-down text-center mt-4">
                The final product and demo.
            </figcaption>
        </div>
    )
}