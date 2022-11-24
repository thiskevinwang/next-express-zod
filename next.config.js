/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: '/api/(.*)', destination: '/api' }];
  },
};
module.exports = config;
