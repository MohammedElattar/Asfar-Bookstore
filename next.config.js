/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["assets.asfar.io", "localhost"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
