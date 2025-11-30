'use client';

import Image from 'next/image';
import { CheckCircle, Heart, ListFilter, Sparkles, Star, Zap } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useHeader } from '@/lib/providers/HeaderProvider';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { DevelopmentBanner } from '@/components/DevelopmentBanner';
import { BouncingSpeechBubble } from '@/components/common/BouncingSpeechBubble';
import { AvatarWithSkeleton } from '@/components/common/AvatarWithSkeleton';

interface RecentMatch {
  id: number;
  name: string;
  image: string;
  isNew?: boolean;
}

interface Conversation {
  id: number;
  user: {
    name: string;
    image: string;
  };
  lastMessage: string;
  timestamp: string;
  isOnline?: boolean;
  unreadCount?: number;
  isPinned?: boolean;
  isNew?: boolean;
}

const mockRecentMatches: RecentMatch[] = [
  {
    id: 1,
    name: 'Sakura',
    image:
      'https://tfvieqghcwnhsqexspxy.supabase.co/storage/v1/object/public/profile-images/sample2.jpg',
    isNew: true,
  },
  {
    id: 2,
    name: 'Yui',
    image:
      'https://tfvieqghcwnhsqexspxy.supabase.co/storage/v1/object/public/profile-images/sample4.jpg',
  },
  {
    id: 3,
    name: 'Sato',
    image:
      'https://tfvieqghcwnhsqexspxy.supabase.co/storage/v1/object/public/profile-images/sample1.jpg',
  },
];

const getMockConversations = (
  t: (key: string, values?: Record<string, unknown>) => string
): Conversation[] => [
  {
    id: 1,
    user: mockRecentMatches[0],
    lastMessage: '',
    timestamp: t('minutesAgo', { minutes: 15 }),
    isOnline: true,
    isPinned: false,
    isNew: true,
  },
  {
    id: 2,
    user: mockRecentMatches[1],
    lastMessage: '今日は夕方にキムチチャーハンを作って食べるつもりです。',
    timestamp: t('minutesAgo', { minutes: 7 }),
    isOnline: false,
    isPinned: true,
    isNew: false,
  },
  {
    id: 3,
    user: mockRecentMatches[2],
    lastMessage: '지금 퇴근하고 있어요~',
    timestamp: t('minutesAgo', { minutes: 1 }),
    unreadCount: 4,
    isOnline: true,
    isNew: false,
  },
];

// const toBase64 = (str: string) =>
//     typeof window === 'undefined'
//         ? Buffer.from(str).toString('base64')
//         : window.btoa(str);

// const shimmerHtmlString = renderToString(
//     <SkeletonImageSVG w={bounds.width} h={bounds.height} />,
// );
export default function ChatListPage() {
  const { setHeader } = useHeader();
  const t = useTranslations('chat');
  const title = t('title');
  const subtitle = t('subtitle');
  const mockConversations = getMockConversations(
    t as (key: string, values?: Record<string, unknown>) => string
  );
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setHeader(title, subtitle);
  }, [title, subtitle, setHeader]);

  // 페이지 진입 1초 후 힌트 말풍선 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 bg-[#FDFDFD] flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-5">
          <DevelopmentBanner />
        </div>

        {/* Recent Matches Section */}
        <div className="mb-5">
          <div className="flex overflow-x-auto px-5 gap-4 no-scrollbar py-2">
            {mockRecentMatches.map((match) => (
              <button
                key={match.id}
                className="flex flex-col items-center flex-shrink-0"
                onClick={() => {}}
              >
                <div className="relative mb-2 pt-1">
                  {match.isNew && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#EE9CA7] flex items-center justify-center z-10 border-2 border-white">
                      <Star size={16} className="text-white fill-white" />
                    </div>
                  )}
                  <AvatarWithSkeleton
                    src={match.image}
                    alt={match.name}
                    className="w-[60px] h-[60px] rounded-full border-3 border-[#FFCBD2] overflow-hidden relative"
                  />
                </div>
                <span className="text-xs text-[#666] font-medium">{match.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages Section */}
        <div className="mb-5">
          <div className="flex justify-between items-center px-5 mb-4">
            <h2 className="text-lg font-bold text-[#333]">{t('messages')}</h2>
            <button onClick={() => {}}>
              <ListFilter size={24} className="text-[#333]" />
            </button>
          </div>

          {mockConversations.map((conversation, index) => {
            const isFirstNew =
              conversation.isNew && mockConversations.findIndex((c) => c.isNew) === index;

            return (
              <Link
                key={conversation.id}
                href={`/chat/${conversation.id}`}
                onClick={(e) => {
                  if (!isFirstNew) {
                    e.preventDefault();
                  }
                }}
                className={`flex items-center px-5 py-3 w-full transition-colors relative ${
                  conversation.isNew
                    ? 'bg-primary/5 hover:bg-primary/10 border-l-2 border-primary'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="mr-3">
                  <div className="relative">
                    <AvatarWithSkeleton
                      src={conversation.user.image}
                      alt={conversation.user.name}
                      className="w-14 h-14 rounded-full overflow-hidden relative"
                    />
                    {conversation.isOnline && (
                      <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#4CAF50] border-2 border-white" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-semibold text-[#333]">
                        {conversation.user.name}
                      </span>
                      {conversation.isPinned && (
                        <Heart size={16} className="text-[#EE9CA7] fill-[#EE9CA7]" />
                      )}
                    </div>
                    <span className="text-xs text-[#999]">{conversation.timestamp}</span>
                  </div>
                  {conversation.isNew ? (
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-primary flex-shrink-0" />
                      <p className="text-sm text-primary font-medium truncate text-left">
                        첫 대화를 시작해보세요!
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-[#666] truncate text-left max-w-[36ch]">
                      {conversation.lastMessage}
                    </p>
                  )}
                </div>

                {conversation.unreadCount && (
                  <div className="w-6 h-6 rounded-full bg-[#EE9CA7] flex items-center justify-center ml-2">
                    <span className="text-xs font-bold text-white">{conversation.unreadCount}</span>
                  </div>
                )}

                {/* 첫 번째 isNew 요소에 말풍선 표시 */}
                {isFirstNew && showHint && (
                  <BouncingSpeechBubble
                    text="클릭해서 첫 대화를 시도하세요!"
                    position="bottom"
                    className="absolute right-16 -top-4"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions - Fixed at bottom */}
      <div className="fixed bottom-[70px] left-0 right-0 max-w-screen-md mx-auto bg-white border-t border-gray-100 px-5 py-3 shadow-lg">
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#EE9CA7] py-3.5 rounded-[25px] shadow-md hover:bg-[#EE9CA7]/90 transition-colors">
            <Zap size={20} className="text-white fill-white" />
            <span className="text-sm font-semibold text-white">{t('quickReply')}</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-white py-3.5 px-5 rounded-[25px] border border-[#E0E0E0] hover:bg-gray-50 transition-colors">
            <CheckCircle size={20} className="text-[#666]" />
            <span className="text-sm font-semibold text-[#666]">{t('markAsRead')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
