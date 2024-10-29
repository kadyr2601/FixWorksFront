import type { Metadata } from "next";
import "../globals.scss";
import "../projects.scss";
import "../portfolio.scss";
import "../fonts.css";
import "../reviews.scss";
import "../blog.scss";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ru' }];
}

export const metadata: Metadata = {
    title: "FIXWORKS",
    description: "Industrial, сustom-tailored and museum restoration. We are an experienced restoration company, our customers are hotels, offices, etc.",
};

type Lang = 'en' | 'ru';

export default function RootLayout({children, params}: {
    children: React.ReactNode;
    params: { lang: Lang };
}) {
    return (
        <html lang={params.lang}>
        <head>
            <link rel="stylesheet" type="text/css" charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </head>
        <body>
        <Header lang={params.lang}/>
        {children}
        <Footer lang={params.lang}/>
        </body>
        </html>
    );
}
