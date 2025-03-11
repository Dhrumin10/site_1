/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: [
            'github.com',
            'raw.githubusercontent.com',
            // Add other image domains you might use
        ],
    },
    // Enable SWC minification
    swcMinify: true,
    // Enable React strict mode for better development
    reactStrictMode: true,
    // Customize headers for security
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Add your webpack configurations here if needed
        return config;
    },
    typescript: {
        ignoreBuildErrors: false,
    },
}

module.exports = nextConfig;