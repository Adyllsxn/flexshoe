import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.*',
        pathname: '/uploads/**',
      },
    ],
    // Desabilitar verificação de IP privado para desenvolvimento
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === 'development', // Opcional: desabilita otimização em dev
  },
};

export default nextConfig;