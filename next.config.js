
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/media/**',
            },
        ],
    },
    env: {
        API_URL: "http://127.0.0.1:8000",
        HostName: "localhost:3000"
    },
}

module.exports = nextConfig
