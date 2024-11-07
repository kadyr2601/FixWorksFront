import React from 'react';
import Image from "next/image";
import {AboutUsDTO} from "@/components/HomePageDTO";

const AboutUs = async ({props, lang}: { props: AboutUsDTO, lang: "ru" | "en" }) => {
    return (
        <div className={'container'}>
            <div className="about-cont">
                <div className="left">
                    <Image src={props.image} alt="About Us" fill={true}/>
                </div>

                <div className="right">
                    <h3>{props[`header_text_${lang}`]}</h3>
                    <p>{props[`text_${lang}`]}</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;