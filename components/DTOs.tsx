import {StaticImageData} from "next/image";

export interface MainBannerDTo {
    id: number;
    page: string;
    image: string;
    desktop_height: number;
    desktop_width: string;
    mobile_height: number;
}

////////////////////////////////////////
interface ProjectSection {
    id: number;
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
    [key: string]: any;
}

export interface Project {
    id: number;
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
    image: string;
    sections: ProjectSection[];
    [key: string]: any;
}

export interface ProjectList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Project[] | null;
}

////////////////////////////////////////
interface Portfolio {
    id: number;
    title: string;
    image: string;
}

export interface PortfolioList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Portfolio[] | null;
}

////////////////////////////////////////
export interface ServiceCard {
    id: number;
    name_ru: string;
    name_en: string;
    icon: string;
    [key: string]: any;
}

export interface ServicesBanner {
    id: number;
    page: string;
    cards: ServiceCard[];
}

////////////////////////////////////////
export interface PageBanner {
    id: number;
    page: string;
    type: string;
    title_ru: string | null;
    title_en: string | null;
    file: string | StaticImageData;
    button: boolean;
    desktop_height: number;
    mobile_height: number;
    [key: string]: any;
}

////////////////////////////////////////
export interface Review {
    id: number;
    fullname: string;
    location: string;
    comment_ru: string;
    comment_en: string;
    image: string;
}
export interface ReviewList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Review[] | null;
}

////////////////////////////////////////
export interface Blog {
    id: number;
    title_ru: string;
    title_en: string;
    first_paragraph_ru: string;
    first_paragraph_en: string;
    second_paragraph_ru: string;
    second_paragraph_en: string;
    third_paragraph_ru: string;
    third_paragraph_en: string;
    image: string;
    slug: string;
    [key: string]: any;
}

export interface BlogList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Blog[] | null;
}

////////////////////////////////////////
export interface Partner {
    id: number;
    name: string;
    image: string;
}
export interface PartnerList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Partner[] | [];
}

////////////////////////////////////////
export interface RestorationListObject {
    id: number;
    name_ru: string;
    name_en: string;
    slug: string;
}
export interface RestorationList {
    count: number;
    next: string | null;
    previous: string | null;
    results: RestorationListObject[] | [];
}
interface FAQ {
    id: number;
    question_ru: string;
    question_en: string;
    answer_ru: string;
    answer_en: string;
}
interface RestorationService {
    id: number;
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
}
export interface Restoration {
    id: number;
    banner_image: string;
    desktop_height: number;
    mobile_height: number;
    desktop_width: string;
    name_ru: string;
    name_en: string;
    slug: string;
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
    seo_title_ru: string;
    seo_title_en: string;
    seo_description_ru: string;
    seo_description_en: string;
    image_before: string;
    image_after: string;
    image_title_ru: string;
    image_title_en: string;
    services_background: string;
    faqs: FAQ[] | [];
    services: RestorationService[] | [];
    [key: string]: any;
}