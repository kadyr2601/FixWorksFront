import React from 'react';
import Image from 'next/image';
import {PartnerList} from "@/components/DTOs";

async function getPartners() {
    const res = await fetch(`${process.env.API_URL}/api/partner-list`, { cache: 'no-store' });
    return res.json();
}

const Partners = async () => {
    const partners: PartnerList = await getPartners();

    return (
        <div className={'container'}>
            <div className="partners-cont">
                <h2>KEY PARTNERS</h2>
                <div className="block">
                    {partners.results.map((partner, index) => (
                        <div className="column" key={index}>
                            <Image src={partner.image} alt={partner.name} fill={true}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;