import {getRequestConfig} from 'next-intl/server';

export const locales = ['ko', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export default getRequestConfig(async () => {
    // Static for now, we'll change this later
    const locale = defaultLocale;

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});