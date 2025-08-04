import Image from 'next/image'
import { SimpleLayout } from '@/components/SimpleLayout'

const photos = [
  {
    src: '/images/photography/akshit.jpeg',
    alt: "akshit's room and akshit",
    caption: "akshit's room and akshit",
  },
    {
    src: '/images/photography/album_cover.jpeg',
    alt: 'gave album cover vibes',
    caption: 'gave album cover vibes',
  },
    {
    src: '/images/photography/auto.jpeg',
    alt: 'an auto in the rain in iiit campus',
    caption: 'an auto in the rain in iiit campus',
  },
    {
    src: '/images/photography/bags.jpeg',
    alt: 'bags outside the library',
    caption: 'bags outside the library',
  },
    {
    src: '/images/photography/guest_house.jpeg',
    alt: 'guest house and way to devids after rain ',
    caption: 'guest house and way to devids after rain ',
  },
    {
    src: '/images/photography/nilgiri.jpeg',
    alt: 'nilgiri building new cover pic?',
    caption: 'nilgiri building new cover pic?',
  },
    {
    src: '/images/photography/random.jpeg',
    alt: 'reckless and full of wrecks',
    caption: 'reckless and full of wrecks',
  },
  {
    src: '/images/photography/worker_1.jpeg',
    alt: 'construction of the new acad block',
    caption: 'construction of the new acad block',
  },
  {
    src: '/images/photography/gokarna.png',
    alt: 'an old shore in gokarna',
    caption: 'an old shore in gokarna',
  },
  {
    src: '/images/photography/vodarevu.png',
    alt: 'first time seeing the sea at vodarevu',
    caption: 'first time seeing the sea at vodarevu',
  },
  {
    src: '/images/photography/hampta_pass.png',
    alt: 'pretty horse around one of the camps on my hampta pass trek',
    caption: 'pretty horse around one of the camps on my hampta pass trek',
  },
  {
    src: '/images/photography/chirala.jpg',
    alt: 'a pretty scene while walking down the chirala beach',
    caption: 'a pretty scene while walking down the chirala beach',
  },
  {
    src: '/images/photography/jharipani.jpg',
    alt: 'a mossy waterfall in jharipani, mussoorie',
    caption: 'a mossy waterfall in jharipani, mussoorie',
  },
  {
    src: '/images/photography/monki.png',
    alt: 'monkey enjoying sunrise',
    caption: 'monkey enjoying sunrise',
  },
  {
    src: '/images/photography/aunty.jpg',
    alt: 'woman in the mountains carrying logs on her shoulder',
    caption: 'woman in the mountains carrying logs on her shoulder',
  },
  {
    src: '/images/photography/piggo.jpg',
    alt: 'bokeh with angry birds pigoo',
    caption: 'bokeh with angry birds pigoo',
  },

]


function PhotoItem({ src, alt, caption }) {
  return (
    <div className="relative w-full mb-4 break-inside-avoid overflow-hidden rounded-xl shadow-lg group">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-auto object-contain"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <p className="text-white text-sm text-center px-4">{caption}</p>
      </div>
    </div>
  )
}


export default function PhotographyPage() {
  return (
    <SimpleLayout
      title="Photography"
      intro="A glimpse into the world through my lens. Hover over the images for context."
    >
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo, index) => (
          <PhotoItem key={index} {...photo} />
        ))}
      </div>
    </SimpleLayout>
  )
}
