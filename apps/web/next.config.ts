import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/types', '@repo/design-system', '@repo/auth'],
  turbopack: {},
}

export default nextConfig
