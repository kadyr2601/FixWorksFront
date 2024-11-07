import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://fixworks-team.com',
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: 'https://fixworks-team.com/en',
                    ru: 'https://fixworks-team.com/ru',
                },
            },
        },
    ]
}