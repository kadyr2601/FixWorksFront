import React from 'react';
import Card from "@/components/layout/Card";
import {ServiceBanner} from "@/components/HomePageDTO";
import {getDictionary, Locale} from "@/app/dictionaries";


export default async function Services({props, lang}: { props: ServiceBanner[], lang: "ru" | "en" }){
    const t = await getDictionary(lang as Locale);
    return (
        <div className={'services-cont'}>
            <div className="container">
                <div className="block">
                    <div className="left">
                        <span>{t.home.services_title}</span>
                       <p>{t.home.services_subtitle}</p>
                    </div>
                    <div className="right">
                        {props.map((card, index) => (
                            <Card key={index} name={card[`name_${lang}`]} image={card.icon} lang={lang} slug={card.slug}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};