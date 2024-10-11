'use client';
import React, {useEffect, useState} from 'react';
import FeedbackButton from "@/components/layout/FeedbackButton";
import Image from "next/image";
import {PageBanner} from "@/components/DTOs";


const SingleBanner = ({props, lang}:{props: PageBanner, lang: string}) => {
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

    const getFileType = (file: string) => {
        const fileType = file.split('.').pop();
        switch (fileType) {
            case 'mp4':
                return 'video';
            case 'webm':
                return 'video';
            case 'ogg':
                return 'video';
            case 'jpg':
                return 'image';
            case 'jpeg':
                return 'image';
            case 'png':
                return 'image';
            case 'gif':
                return 'image';
            case 'svg':
                return 'image';
            case 'webp':
                return 'image';
        }
        return 'video';
    }


    return (
        <div className={'container'}>
            <div className="single-banner">
                <div className="info">
                    <h2>{props[`title_${lang}`]}</h2>
                    {props.button && <FeedbackButton/>}
                </div>
                {props.type === "image" ?
                    <div className={'image'} style={{height: isMobile ? props.mobile_height: props.desktop_height}}>
                        <Image src={props.file} alt={'Single-Banner'} fill={true}/>
                    </div> :
                props.type === "video" && getFileType(props.file) === 'video' ?
                    <video
                        width="100%"
                        height={isMobile ? props.mobile_height : props.desktop_height}
                        src={props.file}
                        autoPlay
                        muted
                        loop
                    >
                        Your browser does not support the video tag.
                    </video> :
                    <div className={'image'} style={{height: isMobile ? props.mobile_height : props.desktop_height}}>
                        <Image src={props.file} alt={'Single-Banner'} fill={true}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default SingleBanner;