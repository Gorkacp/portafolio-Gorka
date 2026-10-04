/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next ya comprime por defecto; en Vercel lo hace el CDN. Se deja por
  // claridad, no porque cambie algo.
  compress: true,
  // Por defecto Next responde con `X-Powered-By: Next.js`.
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;