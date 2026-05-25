import { useEffect, useRef } from 'react'

const DuskMountains = () => {
    const skyRef = useRef<HTMLDivElement>(null)
    const starsRef = useRef<HTMLDivElement>(null)
    const mountainsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY
            if (skyRef.current)       skyRef.current.style.transform       = `translateY(${y * 0.1}px)`
            if (starsRef.current)     starsRef.current.style.transform     = `translateY(${y * 0.2}px)`
            if (mountainsRef.current) mountainsRef.current.style.transform = `translateY(${y * 0.4}px)`
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
            <div ref={skyRef} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/sky-gradient-1920.png')" }} />
            <div ref={starsRef} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/stars-1920.png')" }} />
            <div ref={mountainsRef} className="absolute inset-0 bg-cover" style={{ backgroundImage: "url('/mountains-1920.png')", backgroundPosition: 'center 30%' }} />
        </div>
    )
}

export { DuskMountains }
