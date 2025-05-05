/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CMC_API_KEY: process.env.CMC_API_KEY,
  },
}

module.exports = nextConfig 