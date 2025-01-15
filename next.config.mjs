import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 6000
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    webpackMemoryOptimizations: true
  },
});
