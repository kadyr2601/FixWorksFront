import {Restoration, MainBannerDTo} from "@/components/DTOs";
import MainBanner from "@/components/MainBanner";
import React from "react";
import MainBannerClient from "@/components/MainBannerClient";

async function RestorationRetrieve(slug:string) {
    const res = await fetch(`${process.env.API_URL}/api/restoration/${slug}`, {cache: "no-cache"});
    return await res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
    const restoration: Restoration = await RestorationRetrieve(params.slug)

    if (!restoration) return <div>404</div>

    const banner: MainBannerDTo = {
        id:1,
        page:'',
        image:restoration.banner_image,
        desktop_height:restoration.desktop_height,
        desktop_width:`${restoration.desktop_width}`,
        mobile_height:restoration.mobile_height
    }

    return (
        <div className="restoration-section">
            <MainBannerClient banner={banner}/>
        </div>
    )
}