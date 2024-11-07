
export interface ContactsPageDTO {
    id: number;
    main_banner: MainBanner | null;
    single_banner_image: BannerImage | null;
    emails: Email[];
    phones: Phone[];
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

export interface Email {
    id: number;
    email: string;
    description_ru: string;
    description_en: string;
}

export interface Phone {
    id: number;
    phone: string;
    description_ru: string;
    description_en: string;
}