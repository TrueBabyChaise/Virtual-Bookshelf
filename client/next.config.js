/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/api/', destination: 'http://api:3001/api' },
        { source: '/api/:path*', destination: 'http://api:3001/api/:path*' },
      ],
    };
  },
  trailingSlash: true,
};
