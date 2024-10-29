'use server';
import React from 'react';
import {PageBanner, BlogList} from "@/components/DTOs";
import Image from "next/image";
import SingleBanner from "@/components/layout/SingleBanner";
import Services from "@/components/Services";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import MainBanner from "@/components/MainBanner";


async function getBlogList() {
    const res = await fetch(`${process.env.API_URL}/api/blog-list`, { cache: 'no-store' });
    return res.json();
}
async function getBanner(page: string) {
    const res = await fetch(`${process.env.API_URL}/api/page-banner/${page}`, { cache: 'no-store' });
    return res.json();
}

interface PageProps { params: { lang: string } }

export default async function Page({ params: { lang } }: PageProps) {
    const blog: BlogList = await getBlogList();

    const banner: PageBanner[] = await getBanner('blog');
    const imageBanners = banner.filter(b => b.type === 'image');
    const videoBanners = banner.filter(b => b.type === 'video');

    if (!blog || !blog.results) return <div>No results found.</div>;

    return (
        <div className={'blog-section'}>
            <MainBanner pathname={"blog"}/>
            <h1 className={'container'}>Blog</h1>
            <div className="result">
                <div className="grid container">
                    {blog.results.map((obj, index) => (
                        <Link href={`/${lang}/blog/${obj.slug}`} className={'block'} key={index} replace>
                            <div className="image">
                                <Image src={obj.image} alt={obj.title_en} fill={true}/>
                            </div>
                            <h1 className={'title'}>{obj[`title_${lang}`]}</h1>
                            <p>{obj[`first_paragraph_${lang}`]}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {imageBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
            <Services lang={lang} page={'blog'}/>
            {videoBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
        </div>
    );
};
