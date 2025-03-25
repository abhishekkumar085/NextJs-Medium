import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'miro.medium.com',
      'lh3.googleusercontent.com',
    ],
  },
};

export default nextConfig;
