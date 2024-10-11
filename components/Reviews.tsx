'use client';
import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import userimg from '@/public/user.svg';
import arrow from '@/public/arrow.svg';
import arrowShort from '@/public/arrow-short.svg';


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

const Reviews = () => {

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
                <h2>Reviews</h2>
                <div className="reviewss">
                    <div className="slider-container">
                        <Slider {...settings}>
                            <div>
                                <div className="review">
                                    <p>
                                        Thank you for a job well done. The restorative girl Milena was very careful and
                                        attentive to our
                                        problem. It was necessary to remove cracks in the ceramic tiles…
                                    </p>
                                    <div className="r-info">
                                        <Image src={userimg} alt={'icon'} width={52} height={52}/>
                                        <div className="r-text">
                                            <span>Iryna</span>
                                            <p>Private person, Moscow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="review">
                                    <p>
                                        Thank you for a job well done. The restorative girl Milena was very careful and
                                        attentive to our
                                        problem. It was necessary to remove cracks in the ceramic tiles…
                                    </p>
                                    <div className="r-info">
                                        <Image src={userimg} alt={'icon'} width={52} height={52}/>
                                        <div className="r-text">
                                            <span>Iryna</span>
                                            <p>Private person, Moscow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="review">
                                    <p>
                                        Thank you for a job well done. The restorative girl Milena was very careful and
                                        attentive to our
                                        problem. It was necessary to remove cracks in the ceramic tiles…
                                    </p>
                                    <div className="r-info">
                                        <Image src={userimg} alt={'icon'} width={52} height={52}/>
                                        <div className="r-text">
                                            <span>Iryna</span>
                                            <p>Private person, Moscow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="review">
                                    <p>
                                        Thank you for a job well done. The restorative girl Milena was very careful and
                                        attentive to our
                                        problem. It was necessary to remove cracks in the ceramic tiles…
                                    </p>
                                    <div className="r-info">
                                        <Image src={userimg} alt={'icon'} width={52} height={52}/>
                                        <div className="r-text">
                                            <span>Iryna</span>
                                            <p>Private person, Moscow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="review">
                                    <p>
                                        Thank you for a job well done. The restorative girl Milena was very careful and
                                        attentive to our
                                        problem. It was necessary to remove cracks in the ceramic tiles…
                                    </p>
                                    <div className="r-info">
                                        <Image src={userimg} alt={'icon'} width={52} height={52}/>
                                        <div className="r-text">
                                            <span>Iryna</span>
                                            <p>Private person, Moscow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="review">
                                    <p>
                                        Thank you for a job well done. The restorative girl Milena was very careful and
                                        attentive to our
                                        problem. It was necessary to remove cracks in the ceramic tiles…
                                    </p>
                                    <div className="r-info">
                                        <Image src={userimg} alt={'icon'} width={52} height={52}/>
                                        <div className="r-text">
                                            <span>Iryna</span>
                                            <p>Private person, Moscow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="review">
                                    <p>
                                        Thank you for a job well done. The restorative girl Milena was very careful and
                                        attentive to our
                                        problem. It was necessary to remove cracks in the ceramic tiles…
                                    </p>
                                    <div className="r-info">
                                        <Image src={userimg} alt={'icon'} width={52} height={52}/>
                                        <div className="r-text">
                                            <span>Iryna</span>
                                            <p>Private person, Moscow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className="down">
                    <div className="left">
                        <div className="image">
                            <div className="border"></div>
                            <Image src={arrow} alt={'icon'} width={15} height={15}/>
                        </div>
                        <p>VIEW ALL REVIEWS</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
