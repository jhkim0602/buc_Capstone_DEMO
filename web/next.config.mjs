/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "date-fns",
      "@mantine/core",
      "@mantine/hooks",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-tooltip",
    ],
  },
};

export default nextConfig;
