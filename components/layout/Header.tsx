'use client';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import logo from '@/public/logo-color.svg';
import Link from 'next/link';
import LanguageButton from "@/components/layout/LanguageButton";
import Menu from "@/components/layout/Menu";
import {usePathname} from "next/navigation";
import MainBanner from "@/components/MainBanner";



const Header = ({lang}:{lang: string}) => {

    const pathname = usePathname();

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

    return (
        <div className={'header-cont'}>

            <div className="header-top">
                <div className="block">
                    <Link href={`/${lang}`}>
                        <Image alt={'logo'} className={'img'} src={logo} width={isMobile ? 136:159} height={isMobile ? 29:36} />
                    </Link>
                    <LanguageButton lang={lang}/>
                </div>
                <div className="block">
                    <div className={`feedback-btn`} style={{display: isMobile ? "none": ''}}>get in touch</div>
                    <Menu active={menuActive} toggleMenu={toggleMenu} />
                </div>
            </div>

            <MainBanner pathname={pathname} lang={lang}/>


            {menuActive &&
                <div className="header-menu-open">
                    <div className="up container">
                        <div className="links">
                        <Link href={`/${lang}/projects`} onClick={toggleMenu}>Projects</Link>
                        <Link href={`/${lang}/portfolio`} onClick={toggleMenu}>Portfolio</Link>
                        <Link href={`/${lang}/reviews`} onClick={toggleMenu}>Reviews</Link>
                        <Link href={`/${lang}/blog`} onClick={toggleMenu}>Blog</Link>
                        <Link href={`/${lang}/contact`} onClick={toggleMenu}>Contact</Link>
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
                {/*<div className="down container">*/}
                {/*    <Card head={"Industrial restoration"} image={img2} height={200}/>*/}
                {/*    <Card head={"Custom-tailored restoration"} image={img3} height={200}/>*/}
                {/*    <Card head={"Museum restoration"} image={img4} height={200}/>*/}
                {/*</div>*/}
            </div>
            }
        </div>
    );
};

export default Header;
