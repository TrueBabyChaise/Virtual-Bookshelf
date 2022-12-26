/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: { domains: ['books.google.com', 'm.media-amazon.com', 'pictures.abebooks.com'] },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/api/', destination: 'https://api.satellite-bookshelf.com/api' },
        { source: '/api/:path*', destination: 'https://api.satellite-bookshelf.com/:path*' },
      ],
    };
  },
  trailingSlash: true,
};
