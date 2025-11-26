'use client';

import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Compass, Heart, MessageCircle, User } from 'lucide-react';
import {Z_INDEX} from "@/constants/zIndex";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  labelKey: string;
}

export const BottomNav = () => {
  const pathname = usePathname();
  const t = useTranslations('tabs');

  const navItems: NavItem[] = [
    {
      name: 'Explore',
      href: '/',
      icon: Compass,
      labelKey: 'explore',
    },
    {
      name: 'Match',
      href: '/matches',
      icon: Heart,
      labelKey: 'match',
    },
    {
      name: 'Message',
      href: '/messages',
      icon: MessageCircle,
      labelKey: 'message',
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      labelKey: 'profile',
    },
  ];

  const isActive = (href: string) => {
    // Remove locale prefix from pathname for comparison
    const pathWithoutLocale = pathname.replace(/^\/(ko|ja)/, '');
    return pathWithoutLocale === href || pathWithoutLocale.startsWith(href + '/');
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] max-w-screen-md mx-auto ${Z_INDEX.BOTTOM_NAV}`}>
      <div className="mx-auto max-w-screen-md py-2 px-5 h-[70px] flex flex-row">
        {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center py-2 transition-colors"
          >
            <Icon
              size={28}
              className={active ? 'text-primary mb-0.5' : 'text-[#666] mb-0.5'}
            />
            <span
              className={`text-xs font-semibold ${
                active ? 'text-primary' : 'text-[#666]'
              }`}
            >
              {t(item.labelKey)}
            </span>
          </Link>
        );
      })}
      </div>
    </nav>
  );
};
