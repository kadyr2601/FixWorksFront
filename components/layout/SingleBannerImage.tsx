'use client';
import React, {useEffect, useState} from 'react';
import FeedbackButton from "@/components/layout/FeedbackButton";
import Image from "next/image";
import {BannerImage} from "@/components/HomePageDTO";


const SingleBannerImage = ({props, lang}:{props: BannerImage, lang: string}) => {
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
                    {/*{props.button && <FeedbackButton/>}*/}
                </div>
                {
                    <div className={'image'} style={{height: isMobile ? "268px" : "330px"}}>
                        <Image src={props.image} alt={'Single-Banner'} fill={true}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default SingleBannerImage;