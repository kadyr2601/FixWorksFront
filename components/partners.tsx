import React from 'react';
import Image from 'next/image';
import {PartnerBanner} from "@/components/HomePageDTO";

const Partners = async ({props, lang}: {props: PartnerBanner[], lang: "ru" | "en"}) => {
    return (
        <div className={'container'}>
            <div className="partners-cont">
                <h2>{lang == "en" ? "KEY PARTNERS" : "Ключевые Партнёры"}</h2>
                <div className="block">
                    {props.map((partner, index) => (
                        <div className="column" key={index}>
                            <Image src={process.env.HostName + partner.image} alt={partner.name} fill={true}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;