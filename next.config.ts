import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
    images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'tfvieqghcwnhsqexspxy.supabase.co',
          },
      ]
    }
};
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl(nextConfig);
