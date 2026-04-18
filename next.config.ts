// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.caterpillar.com' },
      { protocol: 'https', hostname: '**.liebherr.com' },
      { protocol: 'https', hostname: '**.volvoce.com' },
      { protocol: 'https', hostname: '**.komatsu.eu' },
    ],
  },
}

export default config
