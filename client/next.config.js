/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: { domains: ['books.google.com', 'm.media-amazon.com', ''] },
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
