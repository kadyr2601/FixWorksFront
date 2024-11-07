import { MainBannerDTo } from "@/components/DTOs";
import MainBannerClient from "@/components/MainBannerClient";

export default async function MainBanner({ banner }: { banner: MainBannerDTo}) {

    if (!banner) return null;

    return <MainBannerClient banner={banner}/>
};
