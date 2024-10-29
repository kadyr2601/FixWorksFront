'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import {MainBannerDTo} from "@/components/DTOs";

export default function MainBannerClient ({ banner }: { banner: MainBannerDTo}) {
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

    return (
        <div className="header-banner" style={{
                height: isMobile ? `${banner.mobile_height}px` : `${banner.desktop_height}px`,
                width: isMobile ? '100%' : `${banner.desktop_width}%`,
                position: 'relative',
            }}
        >
            <Image src={banner.image} alt={'banner'} fill={true}/>
        </div>
    );
};
