'use server';
import React from 'react';
import {PageBanner, PortfolioList} from "@/components/DTOs";
import Image from "next/image";
import SingleBanner from "@/components/layout/SingleBanner";
import Services from "@/components/Services";
import Pagination from "@/components/Pagination";
import MainBanner from "@/components/MainBanner";


async function getPortfolio() {
    const res = await fetch(`${process.env.API_URL}/api/portfolio-list`, { cache: 'no-store' });
    return res.json();
}
async function getBanner(page: string) {
    const res = await fetch(`${process.env.API_URL}/api/page-banner/${page}`, { cache: 'no-store' });
    return res.json();
}

interface PageProps { params: { lang: string } }

export default async function Page({ params: { lang } }: PageProps) {
    const portfolio: PortfolioList = await getPortfolio();

    const banner: PageBanner[] = await getBanner('portfolio');
    const imageBanners = banner.filter(b => b.type === 'image');
    const videoBanners = banner.filter(b => b.type === 'video');

    if (!portfolio || !portfolio.results) {
        return <div>No results found.</div>;
    }
    return (
        <div className={'portfolio-section'}>
            <MainBanner pathname={"portfolio"}/>
            <h1 className={'container'}>Portfolio</h1>
            <div className="result">
                <div className="grid container">
                    {portfolio.results.map((portfolio, index) => (
                        <div className={'block'} key={index}>
                            <div className="image">
                                <Image src={portfolio.image} alt={portfolio.title} fill={true}/>
                            </div>
                            <h1 className={'title'}>{portfolio.title}</h1>
                        </div>
                    ))}
                </div>
                {portfolio.count > 0 && (
                    <Pagination currentPage={1} totalItems={portfolio.count} itemsPerPage={20} lang={lang}/>
                )}
            </div>

            {imageBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
            <Services lang={lang} page={'portfolio'}/>
            {videoBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
        </div>
    );
};
