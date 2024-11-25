import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.URL?.split(':')[0] || 'https', // Fallback para https
        hostname: process.env.URL?.split('//')[1]?.split(':')[0] || 'localhost', // Fallback para localhost
        port: process.env.URL?.split(':')[2] || '', // Sem porta, a menos que haja
      },
    ],
  },
};

export default withPayload(nextConfig);
