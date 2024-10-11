import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en-US', 'en', 'ru', 'ru-RU'];

function getLocale(request: NextRequest) {
    const acceptLanguage = request.headers.get('accept-language') || '';

    const foundLocale = locales.find(locale => acceptLanguage.includes(locale));

    return foundLocale || 'en';
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    const locale = getLocale(request);
    const url = new URL(`/${locale}${pathname}`, request.url);

    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        '/((?!_next).*)',
    ],
};
