// portfolio/page.tsx
import React from 'react';
import Image from "next/image";
import Services from "@/components/Services";
import Pagination from "@/components/Pagination";
import MainBanner from "@/components/MainBanner";
import SingleBannerImage from "@/components/layout/SingleBannerImage";
import SingleBannerVideo from "@/components/layout/SingleBannerVideo";
import { PortfolioList, PortfolioPageDTO } from "@/components/PortfolioPageDTO";
import { useRouter } from "next/navigation";
import {Metadata} from "next";
import {SEOSettings} from "@/components/DTOs";

async function getPortfolioPage() {
    const res = await fetch(`${process.env.API_URL}/portfolio_page`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

async function getPortfolioList(page: number = 1) {
    const res = await fetch(`${process.env.API_URL}/portfolio_page/list?page=${page}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

interface PageProps {
    params: { lang: "ru" | "en" };
    searchParams: { page?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const res = await fetch(`${process.env.API_URL}/service/seo/portfolio`, {cache: "no-cache"});
    const seoData: SEOSettings = await res.json();
    return {title: seoData[`title_${params.lang}`], description: seoData[`description_${params.lang}`]}
}

export default async function Page({ params: { lang }, searchParams }: PageProps) {
    const currentPage = Number(searchParams.page) || 1;
    const page_data: PortfolioPageDTO | null = await getPortfolioPage();
    const portfolio: PortfolioList | null = await getPortfolioList(currentPage);

    if (!page_data || !portfolio) return <div>No results found.</div>;

    return (
        <div className="portfolio-section">
            {page_data.main_banner && <MainBanner banner={page_data.main_banner}/>}
            <h1 className="container">{lang === "en" ? "Portfolio" : "Портфолио"}</h1>
            <div className="result">
                <div className="grid container">
                    {portfolio.results.map((portfolioItem, index) => (
                        <div className="block" key={index}>
                            <div className="image">
                                <Image src={portfolioItem.image} alt={portfolioItem[`title_${lang}`]} fill={true} />
                            </div>
                            <h1 className="title">{portfolioItem[`title_${lang}`]}</h1>
                        </div>
                    ))}
                </div>
                {portfolio.count > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalItems={portfolio.count}
                        itemsPerPage={20}
                        lang={lang}
                    />
                )}
            </div>

            {page_data.single_banner_image && <SingleBannerImage props={page_data.single_banner_image} lang={lang}/>}
            {page_data.services_banner && <Services lang={lang} props={page_data.services_banner}/>}
            {page_data.single_banner_video && <SingleBannerVideo props={page_data.single_banner_video} lang={lang}/>}
        </div>
    );
}
