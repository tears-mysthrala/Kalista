/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/:lng/logo.svg',
        destination: '/logo.svg',
      },
    ]
  },
}

module.exports = nextConfig