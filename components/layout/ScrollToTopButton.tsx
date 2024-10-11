'use client';
import React from 'react';
import Image from "next/image";
import arrow from "@/public/arrow.svg";

const ScrollToTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div onClick={scrollToTop} className="image">
            <div className="border"></div>
            <Image src={arrow} alt={'icon'} width={25} height={25}/>
        </div>
);
};

export default ScrollToTopButton;
