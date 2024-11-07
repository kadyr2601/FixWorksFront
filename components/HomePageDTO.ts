export interface HomePageDTO {
    id: number;
    main_banner: MainBanner | null;
    about_us: AboutUsDTO | null;
    single_banner_image: BannerImage | null;
    single_banner_video: BannerVideo | null;
    restoration_banner: RestorationBanner[];
    counter_banner: CounterBanner[];
    reviews_banner: ReviewBanner[];
    services_banner: ServiceBanner[];
    partners_banner: PartnerBanner[];
}

export interface MainBanner {
    id: number;
    image: string;
    desktop_height: number;
    desktop_width: string;
    mobile_height: number;
}

export interface AboutUsDTO {
    id: number;
    image: string;
    header_text_ru: string;
    header_text_en: string;
    text_ru: string;
    text_en: string;
}

export interface BannerImage {
    id: number;
    image: string;
    header_text_ru: string;
    header_text_en: string;
    [key: string]: any;
}

export interface BannerVideo {
    id: number;
    video: string;
    header_text_ru: string;
    header_text_en: string;
    [key: string]: any;
}

export interface CounterBanner {
    id: number;
    number: number;
    text_ru: string;
    text_en: string;
}

export interface PartnerBanner {
    id: number;
    name: string;
    image: string;
}

export interface RestorationBanner {
    id: number;
    name_ru: string;
    name_en: string;
    icon: string;
    slug: string;
    [key: string]: any;
}

export interface ReviewBanner {
    id: number;
    fullname: string;
    location: string;
    comment_ru: string;
    comment_en: string;
    image: string;
    [key: string]: any;
}
export interface ServiceBanner {
    id: number;
    name_ru: string;
    name_en: string;
    icon: string;
    slug: string;
    [key: string]: any;
}