import { getDictionary, Locale } from '../dictionaries';
import TripleCardsBanner from "@/components/TripleCardsBanner";
import YouTubeEmbed from "@/components/Video";
import Main4 from "@/components/Main4";
import AboutUs from "@/components/AboutUs";
import Counter from "@/components/Counter";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import Partners from "@/components/partners";
import {PageBanner, SEOSettings} from "@/components/DTOs";
import MainBanner from "@/components/MainBanner";
import React from "react";
import {Metadata} from "next";
import {HomePageDTO} from "@/components/HomePageDTO";
import SingleBannerImage from "@/components/layout/SingleBannerImage";
import SingleBannerVideo from "@/components/layout/SingleBannerVideo";


async function getHomePage() {
    const res = await fetch(`${process.env.API_URL}/home_page`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data as HomePageDTO;
}

interface PageProps { params: { lang: 'en' | 'ru' } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const res = await fetch(`${process.env.API_URL}/service/seo/home`, {cache: "no-cache"});
    const seoData: SEOSettings = await res.json();
    return {title: seoData[`title_${params.lang}`], description: seoData[`description_${params.lang}`]}
}

export default async function Page({ params: { lang } }: PageProps) {

    const dict = await getDictionary(lang as Locale);

    const homePage = await getHomePage();
    if (!homePage) return <div>No results found.</div>;

    return (
        <>
            {homePage.main_banner && <MainBanner banner={homePage.main_banner}/>}
            {homePage.restoration_banner && <TripleCardsBanner lang={lang} services={homePage.restoration_banner}/>}
            <YouTubeEmbed videoId="0xX9YkCjlLo" lang={lang}/>
            <Main4 lang={lang}/>
            {homePage.about_us && <AboutUs props={homePage.about_us} lang={lang}/>}
            {homePage.counter_banner && <Counter lang={lang} props={homePage.counter_banner}/>}
            {homePage.single_banner_image && <SingleBannerImage props={homePage.single_banner_image} lang={lang}/>}
            {homePage.reviews_banner && <Reviews props={homePage.reviews_banner} lang={lang}/>}
            {homePage.services_banner && <Services lang={lang} props={homePage.services_banner}/>}
            {homePage.partners_banner && <Partners props={homePage.partners_banner} lang={lang}/>}
            {homePage.single_banner_video && <SingleBannerVideo props={homePage.single_banner_video} lang={lang}/>}
        </>
    );
}
