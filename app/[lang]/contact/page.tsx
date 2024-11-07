import React from 'react';
import MainBanner from "@/components/MainBanner";
import {SEOSettings} from "@/components/DTOs";
import FeedbackButton from "@/components/layout/FeedbackButton";
import mail from "@/public/mail.svg";
import phone from "@/public/phone.svg";
import Image from "next/image";
import {ContactsPageDTO} from "@/components/ContactsPageDTO";
import SingleBannerImage from "@/components/layout/SingleBannerImage";
import {Metadata} from "next";

async function getContactsPage() {
    const res = await fetch(`${process.env.API_URL}/contacts_page`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

interface PageProps { params: { lang: "ru" | "en" } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const res = await fetch(`${process.env.API_URL}/service/seo/contact`, {cache: "no-cache"});
    const seoData: SEOSettings = await res.json();
    return {title: seoData[`title_${params.lang}`], description: seoData[`description_${params.lang}`]}
}


export default async function Page({ params: { lang } }: PageProps) {

    const page_data: ContactsPageDTO | null = await getContactsPage();

    if (!page_data)  return <div>No results found.</div>;

    return (
        <div className={'contacts-page'}>
            {page_data.main_banner && <MainBanner banner={page_data.main_banner}/>}
            <div className="data">
                <div className="column">
                    <h1>{lang == "en" ? "Contact us" : "Свяжитесь с нами"}</h1>
                    <FeedbackButton lang={lang} />
                </div>
                <div className="column-b">
                    <div className="row">
                        <div className="up">
                            <div className="image">
                                <Image src={mail} alt={'mail icon'} fill={true}/>
                            </div>
                            <h4>{lang == 'en' ? "Email" : "Электронная почта"}</h4>
                        </div>
                        <div className="down">
                            {page_data.emails.map((email, index) => (
                                <div key={index}>
                                    <h4>{email.email}</h4>
                                    <p>{lang == "en" ? email.description_en : email.description_ru}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="row">
                        <div className="up">
                            <div className="image">
                                <Image src={phone} alt={'phone icon'} fill={true}/>
                            </div>
                            <h4>{lang == "ru" ? "Контактные телефоны": "Contact phones"}</h4>
                        </div>
                        <div className="down">
                            {page_data.phones.map((phone, index) => (
                                <div key={index}>
                                    <h4>{phone.phone}</h4>
                                    <p>{lang == "en" ? phone.description_en : phone.description_ru}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {page_data.single_banner_image && <SingleBannerImage props={page_data.single_banner_image} lang={lang}/>}
        </div>
    );
};

