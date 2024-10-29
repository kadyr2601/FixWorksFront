import React from 'react';
import MainBanner from "@/components/MainBanner";
import SingleBanner from "@/components/layout/SingleBanner";
import {PageBanner} from "@/components/DTOs";
import contactSBanner from "@/public/contacts-Banner.jpg";

const Page = (params: { lang: string }) => {

    const banner: PageBanner = {
        id: 1,
        page: "contact",
        type: "image",
        title_ru: "Давайте работать вместе!",
        title_en: "Let's Work Together!",
        file: contactSBanner,
        button: true,
        desktop_height: 576,
        mobile_height: 270,
    };

    return (
        <div className={'contacts-page'}>
            <MainBanner pathname={"contact"}/>

            <SingleBanner props={banner} lang={params.lang}/>
        </div>
    );
};

export default Page;