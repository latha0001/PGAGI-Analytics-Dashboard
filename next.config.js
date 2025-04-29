/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add font loader configuration with increased timeout
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'], timeout: 10000 } }
    ]
  }
};

module.exports = nextConfig;