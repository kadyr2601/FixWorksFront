import { MainBannerDTo } from "@/components/DTOs";
import MainBannerClient from "@/components/MainBannerClient";


async function GetBanner(pathname:string) {
    const res = await fetch(`${process.env.API_URL}/api/main-banner/${pathname}`, {cache: "no-cache"});
    return await res.json();
}

export default async function MainBanner({ pathname }: { pathname: string}) {

    const banner: MainBannerDTo = await GetBanner(pathname);

    if (!banner) return null;

    return <MainBannerClient banner={banner}/>
};
