'use client'
import React, {useEffect, useState} from 'react';
import FeedbackButton from "@/components/layout/FeedbackButton";
import {BannerVideo} from "@/components/HomePageDTO";


const SingleBannerVideo = ({props, lang}:{props: BannerVideo, lang: "ru" | "en"}) => {
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
        <div className={'container'}>
            <div className="single-banner">
                <div className="info">
                    <h2>{props[`header_text_${lang}`]}</h2>
                    <FeedbackButton lang={lang}/>
                </div>
                {
                    <video width="100%" height={isMobile ? 270 : 576} src={props.video} autoPlay muted loop >
                        Your browser does not support the video tag.
                    </video>
                }
            </div>
        </div>
    );
};

export default SingleBannerVideo;