import React from 'react';
import Card from "@/components/layout/Card";
import {getDictionary, Locale} from "@/app/dictionaries";
import {RestorationBanner} from "@/components/HomePageDTO";


export default async function TripleCardsBanner({services, lang}: { services: RestorationBanner[], lang: string }) {

    const dict = await getDictionary(lang as Locale);

    return (
        <div className={'cards-banner-cont'}>
            <div className="container">
                <h2>{dict.home.section1}</h2>
                <div className="cards">
                    {services.map((service, index) => (
                        <Card key={index} name={service[`name_${lang}`]} image={service.icon} lang={lang} slug={service.slug}/>
                    ))}
                </div>
            </div>
            <div className="line"></div>
        </div>
    );
};