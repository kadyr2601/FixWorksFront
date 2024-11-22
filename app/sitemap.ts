import type { MetadataRoute } from 'next'
import {HomePageDTO} from "@/components/HomePageDTO";


async function getHomePage() {
    const res = await fetch(`${process.env.API_URL}/home_page`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const services: HomePageDTO | null = await getHomePage();
    const staticPages = [
        {
            url: 'https://fixworks-team.com/en',
            lastModified: new Date(),
        },
        {
            url: 'https://fixworks-team.com/ru',
            lastModified: new Date(),
        },

        {
            url: 'https://fixworks-team.com/en/projects',
            lastModified: new Date(),
        },
        {
            url: 'https://fixworks-team.com/ru/projects',
            lastModified: new Date(),
        },

        {
            url: 'https://fixworks-team.com/en/portfolio',
            lastModified: new Date(),
        },
        {
            url: 'https://fixworks-team.com/ru/portfolio',
            lastModified: new Date(),
        },

        {
            url: 'https://fixworks-team.com/en/reviews',
            lastModified: new Date(),
        },
        {
            url: 'https://fixworks-team.com/ru/reviews',
            lastModified: new Date(),
        },

        {
            url: 'https://fixworks-team.com/en/blog',
            lastModified: new Date(),
        },
        {
            url: 'https://fixworks-team.com/ru/blog',
            lastModified: new Date(),
        },

        {
            url: 'https://fixworks-team.com/en/contact',
            lastModified: new Date(),
        },
        {
            url: 'https://fixworks-team.com/ru/contact',
            lastModified: new Date(),
        },
    ]

    if (!services) {
        return staticPages;
    }

    const servicesPages = services?.restoration_banner.map((service: { slug: string }) => ({
        url: `https://fixworks-team.com/en/${service.slug}`,
        lastModified: new Date(),
        alternates: {
            languages: {
                en: `https://fixworks-team.com/en/${service.slug}`,
                ru: `https://fixworks-team.com/ru/${service.slug}`,
            },
        },
    }));

    return [...staticPages, ...servicesPages];
}