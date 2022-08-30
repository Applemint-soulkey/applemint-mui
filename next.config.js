/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.imgur.com"],
  },
  experimental: {
    images: {
      unoptimized: true,
    }
  },
};

module.exports = nextConfig;
