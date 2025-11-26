'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import { Locale } from '@/i18n/request';
import { KoreanFlag, JapaneseFlag } from './flags';

const localeConfig = {
  ko: {
    flag: KoreanFlag,
    label: '한국어',
  },
  ja: {
    flag: JapaneseFlag,
    label: '日本語',
  },
};

export function LocaleSwitcher() {
  const params = useParams();
  const locale = params.locale as Locale;
  const router = useRouter();
  const pathname = usePathname();

  // Show the OTHER locale (the one to switch TO)
  const newLocale: Locale = locale === 'ko' ? 'ja' : 'ko';

  const switchLocale = () => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPathname);
  };

  const config = localeConfig[newLocale];
  const Flag = config.flag;

  return (
    <button
      onClick={switchLocale}
      className="flex flex-row items-center bg-white px-3.5 py-2 rounded-[20px] shadow-sm gap-1.5 active:opacity-70 transition-opacity"
    >
      <Flag size={24} />
      <span className="text-sm text-[#333] font-semibold">{config.label}</span>
    </button>
  );
}
