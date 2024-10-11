import React from 'react';
import {PageBanner, ProjectList} from "@/components/DTOs";
import Image from "next/image";
import projectSection from "@/public/projectSection.svg"
import SingleBanner from "@/components/layout/SingleBanner";
import Services from "@/components/Services";

async function getProjects() {
    const res = await fetch(`${process.env.API_URL}/api/project-list`, { cache: 'no-store' });
    return res.json();
}
async function getBanner(page: string) {
    const res = await fetch(`${process.env.API_URL}/api/page-banner/${page}`, { cache: 'no-store' });
    return res.json();
}

interface PageProps { params: { lang: string } }

export default async function Page({ params: { lang } }: PageProps) {
    const projects: ProjectList = await getProjects();

    const banner: PageBanner[] = await getBanner('projects');
    const imageBanners = banner.filter(b => b.type === 'image');
    const videoBanners = banner.filter(b => b.type === 'video');

    if (!projects || !projects.results) {
        return <div>No results found.</div>;
    }

    return (
        <div className={'projects-section'}>
            <h1 className={'container'}>OUR PROJECTS</h1>
            {projects.results.map((project, index) => (
                <div className={`column container ${index % 2 !== 0 ? 'reverse' : ''}`} key={index}>
                    <div className="image">
                        <Image src={project.image} alt={project.title_en} fill={true}/>
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
                                        <h3>{section[`title_${lang}`]}</h3>
                                        <p>{section[`description_${lang}`]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
            ))}

            {imageBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
            <Services lang={lang} page={'projects'}/>
            {videoBanners.map(b => <SingleBanner key={b.id} props={b} lang={lang}/>)}
        </div>
    );
};
