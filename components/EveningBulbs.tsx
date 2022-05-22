import Image from 'next/image'

const customLoader = ({ src }) => src

const EveningBulbs = () => <Image src="/evening-bulbs.jpg" layout="fill" objectFit="cover" loader={customLoader} width="100%" />

export { EveningBulbs }