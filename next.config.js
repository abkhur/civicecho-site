/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // any other Next config you need…
}

// Wrap with the MDX plugin so that .mdx files under /app become pages:
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

module.exports = withMDX({
  ...nextConfig,
  // Treat .mdx alongside your TS/JS page files:
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx']
})
