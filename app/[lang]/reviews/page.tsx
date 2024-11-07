import React from 'react';
import {SEOSettings} from "@/components/DTOs";
import Services from "@/components/Services";
import ReviewComponent from "@/components/ReviewComponent";
import MainBanner from "@/components/MainBanner";
import {Metadata} from "next";
import {ReviewList, ReviewsPageDTO} from "@/components/ReviewsPageDTO";
import SingleBannerImage from "@/components/layout/SingleBannerImage";
import SingleBannerVideo from "@/components/layout/SingleBannerVideo";


async function getReviewsPage() {
    const res = await fetch(`${process.env.API_URL}/reviews_page`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}
async function getReviewList() {
    const res = await fetch(`${process.env.API_URL}/reviews_page/list`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

interface PageProps { params: { lang: 'en' | 'ru' } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const res = await fetch(`${process.env.API_URL}/service/seo/reviews`, {cache: "no-cache"});
    const seoData: SEOSettings = await res.json();
    return {title: seoData[`title_${params.lang}`], description: seoData[`description_${params.lang}`]}
}

export default async function Page({ params: { lang } }: PageProps) {
    const page_data: ReviewsPageDTO | null = await getReviewsPage();
    const reviews: ReviewList | null = await getReviewList();

    if (!page_data)  return <div>No results found.</div>;
    if (!reviews)  return <div>No results found.</div>;

    return (
        <div className={'reviews-section'}>
            {page_data.main_banner && <MainBanner banner={page_data.main_banner}/>}
            <h1 className={'container'}>{lang == "en" ? "CUSTOMER FEEDBACK" : "Все отзывы"}</h1>

            <ReviewComponent reviews={reviews} lang={lang}/>

            {page_data.single_banner_image && <SingleBannerImage props={page_data.single_banner_image} lang={lang}/>}
            {page_data.services_banner && <Services lang={lang} props={page_data.services_banner}/>}
            {page_data.single_banner_video && <SingleBannerVideo props={page_data.single_banner_video} lang={lang}/>}
        </div>
    );
};

