import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.URL?.split(':')[0] || 'https',
        hostname: process.env.URL?.split('//')[1]?.split(':')[0] || 'localhost',
        port: process.env.URL?.split(':')[2] || '',
      },
      {
        protocol: 'https',
        hostname: 'delicia-de-sabores.vercel.app',
      }
    ],
  },
};

export default withPayload(nextConfig);
