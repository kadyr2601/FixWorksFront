import React from 'react';
import Link from "next/link";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import {ServiceBanner} from "@/components/HomePageDTO";
import {ContactsPageDTO} from "@/components/ContactsPageDTO";

async function GetServices() {
    const res = await fetch(`${process.env.API_URL}/home_page/services`, {cache: "no-cache"});
    return await res.json();
}
async function GetContacts() {
    const res = await fetch(`${process.env.API_URL}/contacts_page`, {cache: "no-cache"});
    if (!res.ok) return null;
    return await res.json();
}

const Footer = async ({lang}:{lang: 'en' | 'ru'}) => {
    const restorationList: ServiceBanner[] = await GetServices();
    const contacts: ContactsPageDTO | null = await GetContacts();

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
                <div className="contact column">
                    <h1>{lang == "ru" ? "Контакты" : "Contact"}</h1>
                    {contacts && contacts.phones.slice(0, 2).map((phone, index) => (
                        <Link href={`tel:${phone.phone}`} key={index}>{phone.phone}</Link>
                    ))}
                    {contacts && contacts.emails.slice(0, 1).map((email, index) => (
                        <Link href={`mailto:${email.email}`} key={index}>{email.email}</Link>
                    ))}
                </div>
                <div className="column">
                    <h1>{lang == "ru" ? "В соцсетях" : "Follow us"}</h1>
                    <Link href={'https://www.instagram.com/fixworks_uae/'} target="_blank" rel="noopener noreferrer">Instagram</Link>
                    <Link href={'https://www.tiktok.com/@fixworks_world?_t=8rWPbLYGjRJ&_r=1'} target="_blank" rel="noopener noreferrer">Tiktok</Link>
                    {/*<Link href={'https://vk.com/fixworks'} target="_blank" rel="noopener noreferrer">VK</Link>*/}
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