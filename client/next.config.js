/** @type {import('next').NextConfig} */

const rewritesConfig = [
  {
    source: "/api/:path*",
    destination: 'http://localhost:3001/:path*',
  },
];

module.exports = {
  reactStrictMode: true,
  rewrites: async () => rewritesConfig,
};
