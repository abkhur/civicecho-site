/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  ...nextConfig,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
})
