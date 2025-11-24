import { getTranslations } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-primary">
          Love Vacation
        </h1>
        <p className="text-xl text-text-secondary">
          {t('home.title')}
        </p>
        <p className="text-base text-text-secondary">
          {t('home.subtitle')}
        </p>
        <div className="pt-4">
          <p className="text-sm text-text-secondary">
            {t('common.loading')}
          </p>
        </div>

        <div className="mt-8 space-y-2 text-sm text-text-secondary">
          <p>탭 테스트:</p>
          <div className="flex gap-2 justify-center">
            <span>{t('tabs.explore')}</span>
            <span>|</span>
            <span>{t('tabs.match')}</span>
            <span>|</span>
            <span>{t('tabs.message')}</span>
            <span>|</span>
            <span>{t('tabs.profile')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
