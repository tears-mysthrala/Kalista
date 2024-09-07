/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr', 'eu', 'zh'],
  },
  webpack: (config, { isServer, webpack }) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      }
    })
    return config
  },
}

module.exports = nextConfig