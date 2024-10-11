'use server';
import React from 'react';
import Card from "@/components/layout/Card";
import {ServicesBanner} from "@/components/DTOs";


async function getServiceCards(page: string) {
    const res = await fetch(`${process.env.API_URL}/api/services-banner/${page}`, {cache: "no-cache"});
    if (res.status !== 200) {
        return undefined
    }
    return await res.json();
}

export default async function Services({page, lang}: { page: string, lang: string }){
    const services: ServicesBanner | undefined = await getServiceCards(page);

    if (!services) {
        return null;
    }

    return (
        <div className={'services-cont'}>
            <div className="container">
                <div className="block">
                    <div className="left">
                        <span>ALL TYPES OF SERVICES</span>
                        <p>
                            Restoration is a process of restoring the integrity of an item through the elimination
                            of defects resulting from service life, such as: chips, strokes, breaks, cracks, etc.
                            Improving and giving the item an appearance most closely resembling its original state.
                        </p>
                    </div>
                    <div className="right">
                        {services.cards.map((card, index) => (
                            <Card key={index} name={card[`name_${lang}`]}  image={card.icon} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};