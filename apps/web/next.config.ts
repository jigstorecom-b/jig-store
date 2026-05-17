import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // We run linting separately; don't block the build on ESLint version conflicts
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Still get type errors in the editor; just don't block production builds
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@engine/ui", "@engine/auth", "@engine/config", "@engine/database", "lucide-react"],
};

export default withPayload(nextConfig);
