/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_WEATHER_API_KEY: 'demo',
    NEXT_PUBLIC_NEWS_API_KEY: 'demo',
    NEXT_PUBLIC_FINANCE_API_KEY: 'demo',
  },
};

module.exports = nextConfig;