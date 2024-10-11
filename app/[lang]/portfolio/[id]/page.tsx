'use server';
import React from 'react';
import {PageBanner, PortfolioList} from "@/components/DTOs";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import SingleBanner from "@/components/layout/SingleBanner";
import Services from "@/components/Services";


async function getPortfolio(page: string) {
    const res = await fetch(`${process.env.API_URL}/api/portfolio-list?page=${page}`, { cache: 'no-store' });
    return res.json();
}
async function getBanner(page: string) {
    const res = await fetch(`${process.env.API_URL}/api/page-banner/${page}`, { cache: 'no-store' });
    return res.json();
}


interface PageProps { params: { lang: string, id: string} }

export default async function Page({ params: { lang, id } }: PageProps) {
    const portfolio: PortfolioList = await getPortfolio(id);

    const banner: PageBanner[] = await getBanner('portfolio');
    const imageBanners = banner.filter(b => b.type === 'image');
    const videoBanners = banner.filter(b => b.type === 'video');

    if (!portfolio || !portfolio.results) {
        return <div>No results found.</div>;
    }
    return (
        <div className={'portfolio-section'}>
            <h1 className={'container'}>OUR PROJECTS</h1>
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
                    <Pagination currentPage={parseInt(id)} totalItems={portfolio.count} itemsPerPage={20} lang={lang}/>
                )}
            </div>

            {imageBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
            <Services lang={lang} page={'portfolio'}/>
            {videoBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
        </div>
    );
};
