'use server';
import React from 'react';
import Card from "@/components/layout/Card";
import {ServicesBanner} from "@/components/DTOs";

async function getServiceCards(page: string) {
    const res = await fetch(`${process.env.API_URL}/api/services-banner/${page}`, {cache: "no-cache"});
    return await res.json();
}

export default async function TripleCardsBanner({page, lang}: { page: string, lang: string }) {
    const services: ServicesBanner = await getServiceCards(page);

    return (
        <div className={'cards-banner-cont'}>
            <div className="container">
                <h1>With us you can</h1>
                <div className="cards">
                    {services.cards.map((card, index) => (
                        <Card key={index} name={card[`name_${lang}`]}  image={card.icon} />
                    ))}
                </div>
            </div>
            <div className="line"></div>
        </div>
    );
};