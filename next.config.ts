import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Allow images from public/ to be served without an external domain config
    unoptimized: false,
  },
}

export default nextConfig
