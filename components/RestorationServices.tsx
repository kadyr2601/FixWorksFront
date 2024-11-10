'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {RestorationService} from "@/components/DTOs";
import Slider from "react-slick";
import arrowShort from "@/public/arrow-short.svg";

interface Params {
    services_background: string;
    services: RestorationService[];
}
const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <div className="arrow-l" onClick={onClick}>
            <Image src={arrowShort} alt="Prev" width={18} height={18} />
        </div>
    );
};

const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <div className="arrow-r" onClick={onClick}>
            <Image src={arrowShort} alt="Next" width={18} height={18} />
        </div>
    );
};

const RestorationServices = ({services, lang}: {services: Params, lang: "ru" | "en"}) => {
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

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: isMobile ? 1 : 4,
        slidesToScroll: isMobile? 1: 1,
        autoplay: false,
        speed: 1000,
        autoplaySpeed: 1000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,

    };

    return (
        <div className="section-c">
            <div className="image">
                <Image src={`${process.env.HostName}${services.services_background}`} alt="image" fill={true}/>
                <div className="reviews-s container">
                    <h2>{lang == 'ru' ? "Услуги" : "Services"}</h2>
                    <Slider {...settings}>
                        {services.services.map((item, index) => (
                            <div key={index}>
                                <div className="review-b">
                                    <h3>{item[`title_${lang}`]}</h3>
                                    <p>{item[`description_${lang}`]}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        </div>
    );
};

export default RestorationServices;