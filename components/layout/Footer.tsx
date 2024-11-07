import React from 'react';
import Link from "next/link";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import {ServiceBanner} from "@/components/HomePageDTO";

async function GetServices() {
    const res = await fetch(`${process.env.API_URL}/home_page/services`, {cache: "no-cache"});
    return await res.json();
}

const Footer = async ({lang}:{lang: 'en' | 'ru'}) => {
    const restorationList: ServiceBanner[] = await GetServices();

    return (
        <div className={'footer-cont'}>
            <div className="line"></div>
            <div className="up container">
                <div className="column">
                    <h1>{lang == "ru" ? "Реставрация" : "Restoration"}</h1>
                    {restorationList.map((item, index) => (
                        <Link href={`/${lang}/${item.slug}`} key={index}>{item[`name_${lang}`]}</Link>
                    ))}
                </div>
                <div className="column">
                    <h1>{lang == "ru" ? "Контакты" : "Contact"}</h1>
                    <Link href={'tel:+971 (56) 506-2277'}>+971 (56) 506-2277</Link>
                    <Link href={'tel:+971 (56) 506-4241'}>+971 (56) 506-4241</Link>
                    <Link href={'mailto:info@fixworks-team.com'}>info@fixworks-team.com</Link>
                </div>
                <div className="column">
                    <h1>{lang == "ru" ? "В соцсетях" : "Follow us"}</h1>
                    <Link href={'https://www.instagram.com/fix.works/'} target="_blank" rel="noopener noreferrer">Instagram</Link>
                    <Link href={'https://vt.tiktok.com/ZSdPmaq2G/'} target="_blank" rel="noopener noreferrer">Tiktok</Link>
                    <Link href={'https://vk.com/fixworks'} target="_blank" rel="noopener noreferrer">VK</Link>
                </div>
                <div className="column">
                    <ScrollToTopButton/>
                </div>
            </div>
            <div className="down">
                <div className="container">
                    <Link href="https://t.me/kadyr2601"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={'feedback'}>
                        {lang == "ru" ? "Нашли ошибку на сайте?" : "Found a mistake or error on the site?"}
                        <HiOutlineChatBubbleLeftEllipsis color={"white"} height={40} width={40}/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;