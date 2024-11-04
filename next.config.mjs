import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.URL.split(':')[0],
        hostname: process.env.URL.split('//')[1].split(':')[0],
        port: process.env.URL.split(':')[2],
      },
    ],
  }
}

export default withPayload(nextConfig)
