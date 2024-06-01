/** @type {import('next').NextConfig} */
import config from "./next-i18next.config.js";
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  i18n: config.i18n,
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/**/*.wasm', './node_modules/**/*.proto'],
    },
  },
};

export default nextConfig;
