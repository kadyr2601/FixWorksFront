'use client';
import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import arrow from '@/public/arrow.svg';
import arrowShort from '@/public/arrow-short.svg';
import {ReviewBanner} from "@/components/HomePageDTO";
import {useRouter} from "next/navigation";

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

const Reviews = ({props, lang}:{props: ReviewBanner[], lang: "ru" | "en"}) => {

    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    const handleRedirectReviews = () => {
        router.push('/reviews');
    }

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
        infinite: false,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: isMobile? 1: 3,
        autoplay: false,
        speed: 1000,
        autoplaySpeed: 1000,
        cssEase: 'ease',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,

    };

    return (
        <div className="container">
            <div className="reviews-cont">
                <h2>{lang == "en" ? "Reviews" : "Отзывы"}</h2>
                <div className="reviewss">
                    <div className="slider-container">
                        <Slider {...settings}>
                            {props.map((item, index) => (
                                <div key={index}>
                                    <div className="review-b">
                                        <p>{item[`comment_${lang}`]}</p>
                                        <div className="r-info">
                                            <Image src={process.env.HostName + item.image} alt={'icon'} width={52} height={52}/>
                                            <div className="r-text">
                                                <span>{item.fullname}</span>
                                                <p>{item.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="down">
                    <div className="left">
                        <div className="image">
                            <div className="border"></div>
                            <Image src={arrow} alt={'icon'} width={15} height={15}/>
                        </div>
                        <p onClick={handleRedirectReviews} style={{cursor: "pointer"}}>
                            {lang == "en" ? "VIEW ALL REVIEWS" : "ВСЕ ОТЗЫВЫ"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
