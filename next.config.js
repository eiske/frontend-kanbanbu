/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        dirs: ["src"],
    },
    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
