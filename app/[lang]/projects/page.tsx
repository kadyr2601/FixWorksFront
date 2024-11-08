import React from 'react';
import {SEOSettings} from "@/components/DTOs";
import Image from "next/image";
import projectSection from "@/public/projectSection.svg"
import Services from "@/components/Services";
import MainBanner from "@/components/MainBanner";
import {Metadata} from "next";
import {ProjectPageDTO} from "@/components/ProjectsPageDTO";
import SingleBannerImage from "@/components/layout/SingleBannerImage";
import SingleBannerVideo from "@/components/layout/SingleBannerVideo";

async function getProjectsPage() {
    const res = await fetch(`${process.env.API_URL}/projects_page`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

interface PageProps { params: { lang: 'en' | 'ru' } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const res = await fetch(`${process.env.API_URL}/service/seo/projects`, {cache: "no-cache"});
    const seoData: SEOSettings = await res.json();
    return {title: seoData[`title_${params.lang}`], description: seoData[`description_${params.lang}`]}
}

export default async function Page({ params: { lang } }: PageProps) {
    const page_data: ProjectPageDTO | null = await getProjectsPage();

    if (!page_data)  return <div>No results found.</div>;

    return (
        <div className={'projects-section'}>
            {page_data.main_banner && <MainBanner banner={page_data.main_banner}/>}
            <h1 className={'container'}>{lang == "en" ? "OUR PROJECTS" : "Проекты"}</h1>

            {page_data.project_list.map((project, index) => (
                <div className={`column container ${index % 2 !== 0 ? 'reverse' : ''}`} key={index}>
                    <div className="image">
                        <Image src={process.env.HostName + project.image} alt={project.title_en} fill={true}/>
                    </div>
                    <div className="block">
                        <div className="up">
                            <h2>{project[`title_${lang}`]}</h2>
                            <span>{project[`description_${lang}`]}</span>
                        </div>
                        <div className="down">
                            {project.sections.map((section, idx) => (
                                <div key={idx} className={'info-sec'}>
                                    <div className="dimage">
                                        <Image src={projectSection} alt={section.title_en} height={25} width={25}/>
                                    </div>
                                    <div className="text">
                                        <h4>{section[`title_${lang}`]}</h4>
                                        <p>{section[`description_${lang}`]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
            ))}

            {page_data.single_banner_image && <SingleBannerImage props={page_data.single_banner_image} lang={lang}/>}
            {page_data.services_banner && <Services lang={lang} props={page_data.services_banner}/>}
            {page_data.single_banner_video && <SingleBannerVideo props={page_data.single_banner_video} lang={lang}/>}
        </div>
    );
};
