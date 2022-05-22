import Image from 'next/image'

const customLoader = ({ src }) => src

const DuskMountains = () => {
    return (
        <div className="relative [display:flex] [justify-content:center] [align-items:center] [height:100%] [transform-style:preserve-3d] [z-index:-1]">
            {/* <Image src="/sky-gradient-1920.png" objectFit="cover" loader={customLoader} width="100%" height="100%"
                className="[transform:translateZ(-200px)_scale(4)] [position:absolute] [z-index:-1]" />
            <Image src="/stars-1920.png" objectFit="cover" loader={customLoader} width="100%" height="100%"
                className="[transform:translateZ(-100px)_scale(2)] [position:absolute] [z-index:-1]" />
            <Image src="/mountains-1920.png" objectFit="cover" loader={customLoader} width="100%" height="100%"
                className="[transform:translateZ(-50px)_scale(1.5)] [position:absolute] [z-index:-1]" /> */}
            <img src="sky-gradient-1920.png" className="w-full h-full z--1 object-cover [transform:translateZ(-200px)_scale(3)] absolute" />
            <img src="stars-1920.png" className="w-full h-full z--1 object-cover [transform:translateZ(-100px)_scale(2)] absolute" />
            <img src="mountains-1920.png" className="w-full h-full z--1 object-cover [transform:translateZ(-50px)_scale(1.5)] absolute" />
        </div>
    )
}

export { DuskMountains }