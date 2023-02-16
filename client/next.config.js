/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: { domains: ['books.google.com', 'm.media-amazon.com', 'pictures.abebooks.com'] },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/api/', destination: `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL: 'https://api.satellite-bookshelf.com/api'}` },
        { source: '/api/:path*', destination: `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL: 'https://api.satellite-bookshelf.com/api'}/:path*` },
      ],
    };
  },
  trailingSlash: true,
};
