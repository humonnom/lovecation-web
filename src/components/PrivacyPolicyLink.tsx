'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface PrivacyPolicyLinkProps {
  textBefore?: string;
  linkText?: string;
  textAfter?: string;
  fontSize?: string;
  align?: 'left' | 'center' | 'right';
}

const links = {
  ko: "https://pear-capricorn-258.notion.site/Lovecation-2a488780379980e8bca2c9f9a8da544a?pvs=73",
  ja: "https://pear-capricorn-258.notion.site/2a8887803799800b82cce9b288519841?pvs=74"
};

export const PrivacyPolicyLink = ({
  textBefore = "",
  textAfter = "",
  fontSize = "text-xs",
  align = "center",
}: PrivacyPolicyLinkProps) => {
  const t = useTranslations();
  const locale = useLocale();

  const handleClick = () => {
    const url = locale === "ko" ? links.ko : links.ja;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  return (
    <div className={`flex items-center ${alignClass} ${fontSize}`}>
      {textBefore && <span className="text-text-secondary">{textBefore}</span>}
      <button
        onClick={handleClick}
        className={`text-primary underline font-medium hover:opacity-80 transition-opacity ${fontSize}`}
      >
        {t('common.privacyPolicy')}
      </button>
      {textAfter && <span className="text-text-secondary">{textAfter}</span>}
    </div>
  );
};
