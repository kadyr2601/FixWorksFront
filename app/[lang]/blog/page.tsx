// portfolio/page.tsx
import React from 'react';
import Image from "next/image";
import Services from "@/components/Services";
import MainBanner from "@/components/MainBanner";
import SingleBannerImage from "@/components/layout/SingleBannerImage";
import SingleBannerVideo from "@/components/layout/SingleBannerVideo";
import {BlogList, BlogPageDTO} from "@/components/BlogPageDTO";
import BlogPagination from "@/components/BlogPagination";
import Link from "next/link";
import {Metadata} from "next";
import {SEOSettings} from "@/components/DTOs";

async function getPortfolioPage() {
    const res = await fetch(`${process.env.API_URL}/blogs_page`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

async function getPortfolioList(page: number = 1) {
    const res = await fetch(`${process.env.API_URL}/blogs_page/list?page=${page}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

interface PageProps {
    params: { lang: "ru" | "en" };
    searchParams: { page?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const res = await fetch(`${process.env.API_URL}/service/seo/blog`, {cache: "no-cache"});
    const seoData: SEOSettings = await res.json();
    return {title: seoData[`title_${params.lang}`], description: seoData[`description_${params.lang}`]}
}


export default async function Page({ params: { lang }, searchParams }: PageProps) {
    const currentPage = Number(searchParams.page) || 1;
    const page_data: BlogPageDTO | null = await getPortfolioPage();
    const blogs: BlogList | null = await getPortfolioList(currentPage);

    if (!page_data || !blogs) return <div>No results found.</div>;

    return (
        <div className="blog-section">
            {page_data.main_banner && <MainBanner banner={page_data.main_banner}/>}
            <h1 className="container">{lang === "en" ? "Blog" : "Блог"}</h1>
            <div className="result">
                <div className="grid container">
                    {blogs.results.map((blog, index) => (
                        <Link href={`/${lang}/blog/${blog.slug}`} className="block" key={index}>
                            <div className="image">
                                <Image src={blog.image} alt={blog[`title_${lang}`]} fill={true} />
                            </div>
                            <h1 className="title">{blog[`title_${lang}`]}</h1>
                            <p>{blog[`first_paragraph_${lang}`]}</p>
                        </Link>
                    ))}
                </div>
                {blogs.count > 0 && (
                    <BlogPagination
                        currentPage={currentPage}
                        totalItems={blogs.count}
                        itemsPerPage={20}
                        lang={lang}
                    />
                )}
            </div>

            {page_data.single_banner_image && <SingleBannerImage props={page_data.single_banner_image} lang={lang}/>}
            {page_data.services_banner && <Services lang={lang} props={page_data.services_banner}/>}
            {page_data.single_banner_video && <SingleBannerVideo props={page_data.single_banner_video} lang={lang}/>}
        </div>
    );
}
