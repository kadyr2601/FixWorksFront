'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import {MainBannerDTo} from "@/components/DTOs";
import arrow from "@/public/arrow.svg";

export default function MainBannerHomePage ({ banner, lang}: { banner: MainBannerDTo, lang: "en" | "ru" }) {
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

    const scrollToSection = () => {
        const targetSection = document.getElementById("target-section");
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="header-banner zoomIn" style={{
                height: isMobile ? `${banner.mobile_height}px` : `${banner.desktop_height}px`,
                width: isMobile ? '100%' : `${banner.desktop_width}%`,
                position: 'relative',
            }}
        >
            <Image src={process.env.HostName + banner.image} alt={'banner'} fill={true}/>
            <div className="container">

                <div className="header-text">
                    <h1>{lang == "ru" ? "Выбирая лучшее" : "Choosing the best"}</h1>
                    <p>{lang == "ru" ? "Сложно переоценить важность выбора при создании чего-то ценного вместе"
                        :
                        "It is difficult to overestimate the importance of choice when creating something valuable together."}
                    </p>
                    <div className="down" onClick={scrollToSection}>
                        <div className="left">
                            <div className="image">
                                <div className="border"></div>
                                <Image src={arrow} alt={'icon'} width={9} height={9}/>
                            </div>
                            <p className={'title'}>
                                {lang == "en" ? "More" : "Узнать больше"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
