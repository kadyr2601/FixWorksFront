'use server';
import React from 'react';
import {Blog} from "@/components/DTOs";
import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

async function getBlog(slug: string) {
    const res = await fetch(`${process.env.API_URL}/api/blog/${slug}`, { cache: 'no-store' });
    return res.json();
}

interface PageProps { params: { lang: string, slug: string} }

export default async function Page({ params: { lang, slug } }: PageProps) {
    const blog: Blog = await getBlog(slug);

    if (!blog) return <div>No results found.</div>;

    const BackButton = () => <Link href={`/${lang}/blog`} replace><GoArrowLeft className={'back-icon'}/> View all Posts</Link>;

    return (
        <div className={'details container'}>
            <BackButton/>
            <h2>{blog[`title_${lang}`]}</h2>
            <div className="image">
                <Image src={blog.image} alt={blog[`title_${lang}`]} fill={true}/>
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
