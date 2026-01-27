import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Désactiver l'optimisation serveur pour Infomaniak
  },
  compress: true,
};

export default withBundleAnalyzer(nextConfig);
