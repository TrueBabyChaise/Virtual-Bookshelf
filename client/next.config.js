/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/api/', destination: 'http://localhost:3001/api' },
        { source: '/api/:path*', destination: 'http://localhost:3001/api/:path*' },
      ],
    };
  },
  trailingSlash: true,
};
