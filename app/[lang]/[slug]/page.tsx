import {Restoration, MainBannerDTo} from "@/components/DTOs";
import React from "react";
import MainBannerClient from "@/components/MainBannerClient";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import Arrow from "@/public/arrow-round.svg";
import FeedbackButton from "@/components/layout/FeedbackButton";
import RestorationServices from "@/components/RestorationServices";
import Link from "next/link";
import {GoArrowLeft} from "react-icons/go";
import {Metadata} from "next";


export async function generateMetadata({ params }: { params: { slug: string, lang: "ru" | "en" } }): Promise<Metadata> {
    const res = await fetch(`${process.env.API_URL}/restoration_page/retrieve/${params.slug}`, { cache: 'no-store' });
    const seoData: Restoration = await res.json();
    return {title: seoData[`title_${params.lang}`], description: seoData[`seo_description_${params.lang}`]}
}

async function RestorationRetrieve(slug:string) {
    const res = await fetch(`${process.env.API_URL}/restoration_page/retrieve/${slug}`, {cache: "no-cache"});
    if (!res.ok) return null;
    return await res.json();
}

export default async function Page({ params }: { params: { slug: string, lang: "ru" | "en" } }) {
    const restoration: Restoration | null = await RestorationRetrieve(params.slug)

    if (!restoration) return <div>404</div>

    const banner: MainBannerDTo = {
        id:1,
        image:restoration.banner_image,
        desktop_height:restoration.desktop_height,
        desktop_width:`${restoration.desktop_width}`,
        mobile_height:restoration.mobile_height
    }

    const BackButton = () => <Link href={`/${params.lang}`} replace><GoArrowLeft className={'back-icon'}/>
        {params.lang == "ru" ? "На главную страницу" : "Go to main page"}
    </Link>;

    return (
        <div className="restoration">
            <MainBannerClient banner={banner}/>
            <div className="section-a">
                <div className="container">
                    <div className="left">
                        <BackButton/>
                        <h1>{restoration[`name_${params.lang}`]}</h1>
                        <FeedbackButton lang={params.lang}/>
                    </div>
                    <div className="right">
                        <h3>{restoration[`title_${params.lang}`]}</h3>
                        <p>{restoration[`description_${params.lang}`]}</p>
                    </div>
                </div>
            </div>

            <div className="section-b container">
                <div className="left">
                    <div className="image">
                        <Image src={`${process.env.HostName}${restoration.image_before}`} alt="before" fill={true}/>
                    </div>
                    <div className="arrow-cont">
                        <div className="arrow">
                            <Image src={Arrow} alt="arrow" fill={true}/>
                        </div>
                    </div>
                    <FeedbackButton lang={params.lang}/>
                </div>
                <div className="right">
                    <h3 className="result-title">{restoration[`image_title_${params.lang}`]}</h3>

                    <div className="image">
                        <Image src={`${process.env.HostName}${restoration.image_after}`} alt="after" fill={true}/>
                    </div>
                </div>
            </div>

            <RestorationServices services={restoration} lang={params.lang} />


            <div className="faq-section container">
                <h2>{params.lang == "en" ? "faq" : "Часто задаваемые вопросы"}</h2>
                <FAQ restoration={restoration} params={params}/>
            </div>
        </div>
    )
}