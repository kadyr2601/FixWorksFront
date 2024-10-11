import { getDictionary, Locale } from '../dictionaries';
import TripleCardsBanner from "@/components/TripleCardsBanner";
import YouTubeEmbed from "@/components/Video";
import Main4 from "@/components/Main4";
import AboutUs from "@/components/AboutUs";
import Counter from "@/components/Counter";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import Partners from "@/components/partners";
import SingleBanner from "@/components/layout/SingleBanner";
import {PageBanner} from "@/components/DTOs";


async function getBanner(page: string) {
    const res = await fetch(`${process.env.API_URL}/api/page-banner/${page}`, { cache: 'no-store' });
    return res.json();
}

interface PageProps { params: { lang: string } }

export default async function Page({ params: { lang } }: PageProps) {

    // const dict = await getDictionary(lang as Locale);

    const banner: PageBanner[] = await getBanner('home');
    const imageBanners = banner.filter(b => b.type === 'image');
    const videoBanners = banner.filter(b => b.type === 'video');

    return (
        <>
            <TripleCardsBanner lang={lang} page={'home'}/>
            <YouTubeEmbed videoId="0xX9YkCjlLo"/>
            <Main4/>
            <AboutUs/>
            <Counter/>
            {imageBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
            <Reviews/>
            <Services lang={lang} page={'home'}/>
            <Partners/>
            {videoBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
        </>
    );
}
