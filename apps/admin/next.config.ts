import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://bucket-2w6800.s3.ap-northeast-2.amazonaws.com/**')],
  },
};

export default nextConfig;
