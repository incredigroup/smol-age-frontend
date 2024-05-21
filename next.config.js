/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['smolage.com', 'ipfs.io'],
    minimumCacheTTL: 60 * 60 * 24,

    // Disabled to avoid costs
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/phase2/:path*',
        destination: '/play/:path*',
        permanent: true,
      },
    ];
  },
  // https://github.com/tailwindlabs/headlessui/issues/2677
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.child_process = false;
    }

    let modularizeImports = null;
    config.module.rules.some((rule) =>
      rule.oneOf?.some((oneOf) => {
        modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports;
        return modularizeImports;
      }),
    );
    if (modularizeImports?.['@headlessui/react']) delete modularizeImports['@headlessui/react'];
    return config;
  },

  env: {
    GOOGLE_SERVICE_PRIVATE_KEY: process.env.GOOGLE_SERVICE_PRIVATE_KEY,
  },
};

module.exports = nextConfig;
