/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
]

module.exports = withPWA({
  reactStrictMode: false,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === 'development',
  },
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
      child_process: false,
    }

    return config
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
})
