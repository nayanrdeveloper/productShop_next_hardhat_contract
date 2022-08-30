/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NEXT_PUBLIC_PRIVATE_KEY: process.env.NEXT_PUBLIC_PRIVATE_KEY,
    NEXT_PUBLIC_RPC_PROVIDER: process.env.NEXT_PUBLIC_RPC_PROVIDER,
    NEXT_PUBLIC_WEB3_STORAGE_API_KEY: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY
  }
}

module.exports = nextConfig
