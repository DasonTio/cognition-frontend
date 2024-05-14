/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      // // Basic redirect
      // {
      //   source: "/record",
      //   destination: "/",
      //   permanent: true,
      // },
      // {
      //   source: "/record",
      //   destination: "/",
      //   permanent: true,
      // },
      // // Wildcard path matching
      // {
      //   source: "/blog/:slug",
      //   destination: "/news/:slug",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
