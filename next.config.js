/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    RPC_PROVIDER: process.env.RPC_PROVIDER,
    NEXT_PUBLIC_WEB3_STORAGE_API_KEY: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY
  }
}

module.exports = nextConfig
