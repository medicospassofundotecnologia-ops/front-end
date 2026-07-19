import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clinicadopulmao.med.br',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
