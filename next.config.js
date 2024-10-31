
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                // protocol: 'http',
                // hostname: '127.0.0.1',
                // port: '8000',
                // pathname: '/media/**',

                protocol: 'http',
                hostname: '185.185.69.163',
                port: '',
                pathname: '/media/**',
            },
        ],
    },
    env: {
        // API_URL: "http://127.0.0.1:8000",
        // HostName: "localhost:3000"
        API_URL: "http://185.185.69.163",
        HostName: "http://185.185.69.163:3000"
    },
}

module.exports = nextConfig
