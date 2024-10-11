'use client';
import React, {useState} from 'react';
import Image from "next/image";
import flagEn from "@/public/flag-en.svg";
import Link from "next/link";
import flagRu from "@/public/flag-ru.svg";


const LanguageButton = ({lang}:{lang: string}) => {
    const [opened, setOpened] = useState(false);

    const handleToggle = () => {
        setOpened(!opened);
    };


    return (
        <div className="lang">
            {lang === 'en' ? <div className={'show'} onClick={handleToggle}>
                    <Image alt={'flagEn'}
                           src={flagEn}
                           height={17}
                           width={17}
                    />English</div>
                :
                <div className={'show'} onClick={handleToggle}>
                    <Image alt={'flagRu'}
                           src={flagRu}
                           height={17}
                           width={17}
                    />Русский</div>
            }
            {
                opened &&
                <div className="opened">
                    <Link href={'/ru'} className={'c11'}>
                        <Image alt={'flagRu'} src={flagRu} height={17} width={17}/>Русский
                    </Link>
                    <Link href={'/en'} className={'c22'}>
                        <Image alt={'flagEn'} src={flagEn} height={17} width={17}/>English
                    </Link>

                </div>
            }
        </div>
    );
};

export default LanguageButton;