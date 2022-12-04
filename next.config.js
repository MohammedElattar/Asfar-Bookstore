/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.asfar.io",
        port: "/uploads/**",
      },
    ],
    domains: ["assets.asfar.io"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
