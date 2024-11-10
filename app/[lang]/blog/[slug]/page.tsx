import React from 'react';
import {Blog} from "@/components/BlogPageDTO";
import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import {Metadata} from "next";

async function getBlog(slug: string) {
    const res = await fetch(`${process.env.API_URL}/blogs_page/retrieve/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

interface PageProps { params: { lang: "ru" | "en", slug: string} }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const res = await fetch(`${process.env.API_URL}/blogs_page/retrieve/${params.slug}`, { cache: 'no-store' });
    const seoData: Blog = await res.json();
    return {title: seoData[`title_${params.lang}`], description: seoData[`first_paragraph_${params.lang}`]}
}


export default async function Page({ params: { lang, slug } }: PageProps) {
    const blog: Blog | null = await getBlog(slug);

    if (!blog) return <div>No results found.</div>;

    const BackButton = () => <Link href={`/${lang}/blog`} replace><GoArrowLeft className={'back-icon'}/>
        {lang == "ru" ? "К списку постов" : "View all Posts"}
        </Link>;

    return (
        <div className={'details container'}>
            <BackButton/>
            <h2>{blog[`title_${lang}`]}</h2>
            <div className="image">
                <Image src={process.env.HostName + blog.image} alt={blog[`title_${lang}`]} fill={true}/>
            </div>

            <div className="content">
                <p>{blog[`first_paragraph_${lang}`]}</p>
                <p className={'quote'}>{blog[`second_paragraph_${lang}`]}</p>
                <p>{blog[`third_paragraph_${lang}`]}</p>
            </div>
            <BackButton/>
        </div>
    );
};
