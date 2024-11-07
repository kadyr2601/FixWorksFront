
export interface ReviewsPageDTO {
    id: number;
    main_banner: MainBanner | null;
    single_banner_image: BannerImage | null;
    single_banner_video: BannerVideo | null;
    services_banner: ServiceBanner[];
}

export interface MainBanner {
    id: number;
    image: string;
    desktop_height: number;
    desktop_width: string;
    mobile_height: number;
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

export interface ServiceBanner {
    id: number;
    name_ru: string;
    name_en: string;
    icon: string;
    slug: string;
    [key: string]: any;
}

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
    results: Review[];
}