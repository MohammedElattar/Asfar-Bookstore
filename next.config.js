/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["assets.asfar.io"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
