import {StaticImageData} from "next/image";

export interface SEOSettings {
    id: number;
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
}

export interface MainBannerDTo {
    id: number;
    image: string;
    desktop_height: number;
    desktop_width: string;
    mobile_height: number;
}

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

export interface RestorationService {
    id: number;
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
    [key: string]: any;
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