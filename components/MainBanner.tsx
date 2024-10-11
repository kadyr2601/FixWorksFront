'use client';
import React, { useState, useEffect } from 'react';
import { MainBannerDTo } from "@/components/DTOs";
import Image from "next/image";

const getPathBanner = (pathname: string, lang: string): string | null => {
    const pathMap: Record<string, string> = {
        [`/${lang}`]: '/api/main-banner/home',
        [`/${lang}/projects`]: '/api/main-banner/projects',
        [`/${lang}/portfolio`]: '/api/main-banner/portfolio',
        [`/${lang}/reviews`]: '/api/main-banner/reviews',
        [`/${lang}/blog`]: '/api/main-banner/blog',
        [`/${lang}/contact`]: '/api/main-banner/contact',
    };
    if (pathMap[pathname]) return pathMap[pathname];
    if (pathname.startsWith(`/${lang}/portfolio`)) return '/api/main-banner/portfolio';

    return null;
};

const MainBanner = ({ pathname, lang }: { pathname: string, lang: string }) => {
    const [banner, setBanner] = useState<MainBannerDTo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenWidth = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
        };
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);

    useEffect(() => {
        const bannerPath = getPathBanner(pathname, lang);
        if (!bannerPath) {
            setLoading(false);
            return;
        }

        const fetchBanner = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.API_URL}${bannerPath}`);
                const data = await res.json();
                console.log("PSADSAD")
                setBanner(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load banner');
                setLoading(false);
            }
        };

        fetchBanner();
    }, [pathname, lang]);

    if (error) return <div style={{ textAlign: 'center' }}>Failed to load banner.</div>;

    if (loading) {
        return (
            <div className="header-banner skeleton">
                <div className="skeleton-banner"></div>
            </div>
        );
    }

    if (!banner) return null;

    return (
        <div className="header-banner" style={{ height: isMobile ? `${banner.mobile_height}px` : `${banner.desktop_height}px` }}>
            {banner.image && <Image src={banner.image} alt={'banner'} fill={true} />}
        </div>
    );
};

export default MainBanner;
