'use client';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import logo from '@/public/logo-color.svg';
import Link from 'next/link';
import LanguageButton from "@/components/layout/LanguageButton";
import Menu from "@/components/layout/Menu";
import FeedbackModal from "@/components/Feedback";


type Lang = 'en' | 'ru';

const Header = ({lang}:{lang: Lang}) => {

    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
            <FeedbackModal isOpen={isModalOpen} onClose={closeModal} />

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

                        <div className="row">
                            <Link href={'tel:8 800 551-41-34'}>8 800 551-41-34</Link>
                            <p>Бесплатный звонок по России</p>
                        </div>
                        <div className="row">
                            <Link href={'tel:+7 906 093-17-34'}>+7 906 093-17-34</Link>
                            <p>Мобильный (дополнительный)</p>
                        </div>

                        <div className="row">
                            <Link href={'tel:+971 56 506-2277'}>+971 56 506-2277</Link>
                            <p>Дубай</p>
                        </div>

                        <div className="row">
                            <Link href={'mailto:info@fixworks.ru'}>info@fixworks.ru</Link>
                            <p>По любому вопросу реставрации</p>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Header;
