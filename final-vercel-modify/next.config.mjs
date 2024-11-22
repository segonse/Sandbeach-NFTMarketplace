/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["aqua-immense-possum-858.mypinata.cloud"],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: isDev
              ? "script-src 'self' 'unsafe-eval'" // 允许开发环境使用 'unsafe-eval'
              : "script-src 'self'", // 生产环境中禁止 'unsafe-eval'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
