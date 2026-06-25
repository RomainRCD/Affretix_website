// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.caterpillar.com' },
      { protocol: 'https', hostname: '**.liebherr.com' },
      { protocol: 'https', hostname: '**.volvoce.com' },
      { protocol: 'https', hostname: '**.komatsu.eu' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default config

// Intègre l'adaptateur OpenNext Cloudflare au serveur de dev Next (bindings locaux)
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
initOpenNextCloudflareForDev()
