'use client';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import logo from '@/public/logo-color.svg';
import Link from 'next/link';
import LanguageButton from "@/components/layout/LanguageButton";
import Menu from "@/components/layout/Menu";
import FeedbackModal from "@/components/Feedback";
import {ContactsPageDTO} from "@/components/ContactsPageDTO";


type Lang = 'en' | 'ru';

const Header = ({lang}:{lang: Lang}) => {

    const [contacts, setContacts] = useState<ContactsPageDTO | null>(null);
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {setMenuActive(!menuActive);};

    useEffect(() => {
        if (menuActive) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [menuActive]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenWidth = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
        };
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);

    useEffect(() => {
        const fetchContactsPage = async () => {
            const res = await fetch(`${process.env.API_URL}/contacts_page`, { cache: 'no-store' });
            if (res.ok) {
                const data: ContactsPageDTO = await res.json();
                setContacts(data);
            }
        };

        fetchContactsPage();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {setIsModalOpen(true);};
    const closeModal = () => {setIsModalOpen(false);};

    const feedbackBtnName = lang === 'en' ? 'get in touch' : 'связаться';
    const links: Record<Lang, { projects: string; portfolio: string; reviews: string; blog: string; contact: string }> = {
        en: {
            projects: 'Projects',
            portfolio: 'Portfolio',
            reviews: 'Reviews',
            blog: 'Blog',
            contact: 'Contact',
        },
        ru: {
            projects: 'Проекты',
            portfolio: 'Портфолио',
            reviews: 'Отзывы',
            blog: 'Блог',
            contact: 'Контакты',
        },
    };


    return (
        <div className={'header-cont'}>
            <FeedbackModal isOpen={isModalOpen} onClose={closeModal} lang={lang}/>

            <div className="header-top">
                <div className="block">
                    <Link href={`/${lang}`}>
                        <Image alt={'logo'} className={'img'} src={logo} width={isMobile ? 136:159} height={isMobile ? 29:36} />
                    </Link>
                    <LanguageButton lang={lang}/>
                </div>
                <div className="block">
                    <div className={`feedback-btn`} onClick={openModal} style={{display: isMobile ? "none": ''}}>{feedbackBtnName}</div>
                    <Menu active={menuActive} toggleMenu={toggleMenu} />
                </div>
            </div>

            {menuActive &&
                <div className="header-menu-open">
                    <div className="up container">
                        <div className="links">
                        <Link href={`/${lang}/projects`} onClick={toggleMenu}>{links[`${lang}`].projects}</Link>
                        <Link href={`/${lang}/portfolio`} onClick={toggleMenu}>{links[`${lang}`].portfolio}</Link>
                        <Link href={`/${lang}/reviews`} onClick={toggleMenu}>{links[`${lang}`].reviews}</Link>
                        <Link href={`/${lang}/blog`} onClick={toggleMenu}>{links[`${lang}`].blog}</Link>
                        <Link href={`/${lang}/contact`} onClick={toggleMenu}>{links[`${lang}`].contact}</Link>
                    </div>
                    <div className="info">
                        {contacts && contacts.phones.map((phone, index) => (
                            <div className="row" key={index}>
                                <Link href={`tel:${phone.phone}`}>{phone.phone}</Link>
                                <p>{phone[`description_${lang}`]}</p>
                            </div>
                        ))}
                        {contacts && contacts.emails.map((email, index) => (
                            <div className="row" key={index}>
                                <Link href={`mailto:${email.email}`} style={{textTransform: "none"}}>{email.email}</Link>
                                <p>{email[`description_${lang}`]}</p>
                            </div>
                        ))}
                    </div>
                </div>

                    <div className="down container">

                    </div>
            </div>
            }
        </div>
    );
};

export default Header;
