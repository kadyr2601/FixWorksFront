'use server';
import React from 'react';
import {PageBanner, ReviewList} from "@/components/DTOs";
import SingleBanner from "@/components/layout/SingleBanner";
import Services from "@/components/Services";
import ReviewComponent from "@/components/ReviewComponent";


async function getFeedbacks() {
    const res = await fetch(`${process.env.API_URL}/api/review-list`, { cache: 'no-store' });
    return res.json();
}
async function getBanner(page: string) {
    const res = await fetch(`${process.env.API_URL}/api/page-banner/${page}`, { cache: 'no-store' });
    return res.json();
}

interface PageProps { params: { lang: string } }

export default async function Page({ params: { lang } }: PageProps) {
    const reviews: ReviewList = await getFeedbacks();

    const banner: PageBanner[] = await getBanner('reviews');
    const imageBanners = banner.filter(b => b.type === 'image');
    const videoBanners = banner.filter(b => b.type === 'video');

    return (
        <div className={'reviews-section'}>
            <h1 className={'container'}>CUSTOMER FEEDBACK</h1>

            <ReviewComponent reviews={reviews} lang={lang}/>


            {imageBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
            <Services lang={lang} page={'reviews'}/>
            {videoBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
        </div>
    );
};

