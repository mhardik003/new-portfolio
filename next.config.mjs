import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    outputFileTracingIncludes: {
      '/articles/*': ['./src/app/articles/**/*.mdx'],
    },
  },

  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/mhardik003', // replace with your GitHub
        permanent: true,
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/mhardik003', // replace with LinkedIn
        permanent: true,
      },
      {
        source: '/resume',
        destination: 'https://drive.google.com/file/d/1m3oXrEpFwdDaTj1w0uONXwGs5C-9dFaw/view?usp=sharing', // or a Google Drive/Notion link
        permanent: true,
      },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
