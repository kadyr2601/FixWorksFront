import {Restoration, MainBannerDTo} from "@/components/DTOs";
import React from "react";
import MainBannerClient from "@/components/MainBannerClient";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import Link from "next/link";


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

    return (
        <div className="restoration">
            <div className="update-notice">
                <h3>Еще чуть-чуть!</h3>
                <p>Наши разработчики 🦸‍♂️ 🦸‍♂️ сейчас работают в режиме "кофе + клавиатура". Скоро здесь будет нечто крутое – не
                    нервничайте, а лучше держите палец на F5!</p>
                <Link href={'/'} className="back">Выйти</Link>
            </div>
            {/*<MainBannerClient banner={banner}/>*/}
            {/*<div className="section-a"></div>*/}

            {/*<div className="section-b container">*/}
            {/*    <div className="images">*/}
            {/*        <div className="image">*/}
            {/*            <Image src={restoration.image_before} alt={'before'} fill={true}/>*/}
            {/*        </div>*/}

            {/*        <div className="image">*/}
            {/*            <Image src={restoration.image_after} alt={'after'} fill={true}/>*/}
            {/*        </div>*/}

            {/*        <h3>{restoration[`image_title_${params.lang}`]}</h3>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="faq-section container">*/}
            {/*    <h2>{params.lang == "en" ? "faq" : "Часто задаваемые вопросы" }</h2>*/}

            {/*    <div className="faq-cont">*/}
            {/*        {restoration.faqs.map((faq, i) => (*/}
            {/*            <div key={i} className="faq">*/}
            {/*                <div className="title">*/}
            {/*                    <h4>{faq[`question_${params.lang}`]}</h4>*/}
            {/*                    <FaPlus className={'iconPlus'}/>*/}
            {/*                    <FaMinus className={'iconMinus'}/>*/}
            {/*                </div>*/}
            {/*                <p className={'answer'}>{faq[`answer_${params.lang}`]}</p>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}