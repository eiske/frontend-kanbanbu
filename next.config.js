// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    transpilePackages: [
        '@ant-design',
        'antd',
        'rc-util',
        'rc-pagination',
        'rc-picker'
    ],
}

module.exports = nextConfig
