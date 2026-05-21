import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
    qualities: [75, 80, 100],
  },
  transpilePackages: ['paynow'],
  turbopack: {
    root: path.join(__dirname),
  },
}

export default nextConfig
