/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.alpha-orbital.com",
        pathname: "/assets/images/post_img/**",
      },
    ],
  },
};

module.exports = nextConfig
