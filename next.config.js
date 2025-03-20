/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "https://gwinnettpsychiatry.com/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
