'use client';

import Image from 'next/image';
import { Star, ListFilter, Heart, Zap, CheckCircle } from 'lucide-react';
import {useRouter} from "next/navigation";
import {useHeader} from "@/lib/providers/HeaderProvider";
import {useTranslations} from "next-intl";
import {useEffect} from "react";
import {useProfiles} from "@/hooks/queries";

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
}

const mockRecentMatches: RecentMatch[] = [
  {
    id: 1,
    name: 'New Match!',
    image: 'https://tfvieqghcwnhsqexspxy.supabase.co/storage/v1/object/public/profile-images/sample3.jpg',
    isNew: true,
  },
  {
    id: 2,
    name: 'Sakura',
    image: 'https://tfvieqghcwnhsqexspxy.supabase.co/storage/v1/object/public/profile-images/sample2.jpg',
  },
  {
    id: 3,
    name: 'Yui',
    image: 'https://tfvieqghcwnhsqexspxy.supabase.co/storage/v1/object/public/profile-images/sample4.jpg',
  },
  {
    id: 4,
    name: 'Sato',
    image: 'https://tfvieqghcwnhsqexspxy.supabase.co/storage/v1/object/public/profile-images/sample1.jpg',
  },
];

const getMockConversations = (t: (key: string, values?: Record<string, any>) => string): Conversation[] => [
  {
    id: 1,
    user: mockRecentMatches[1],
    lastMessage: '今晩お時間ありますか？',
    timestamp: t('minutesAgo', { minutes: 15 }),
    isOnline: false,
    isPinned: true,
  },
  {
    id: 2,
    user: mockRecentMatches[2],
    lastMessage: '그래요? 저도 영화 좋아해요',
    timestamp: t('minutesAgo', { minutes: 7 }),
    isOnline: false,
    isPinned: true,
  },
  {
    id: 3,
    user: mockRecentMatches[3],
    lastMessage: '지금 퇴근하고 있어요~',
    timestamp: t('minutesAgo', { minutes: 1 }),
    unreadCount: 4,
    isOnline: true,
  },
];

export default function ChatListPage() {
    const {setHeader} = useHeader();
    const t = useTranslations('chat');
    const title = t('title')
    const subtitle = t('subtitle')
    const mockConversations = getMockConversations(t);

    useEffect(() => {
        setHeader(title, subtitle);
    }, [title, subtitle])

  return (
    <div className="flex-1 bg-[#FDFDFD]">
      <div className="flex-1 overflow-y-auto">
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
                  <div className="w-[60px] h-[60px] rounded-full border-3 border-[#FFCBD2] overflow-hidden relative">
                    <Image
                      src={match.image}
                      alt={match.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
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

          {mockConversations.map((conversation) => (
            <button
              key={conversation.id}
              className="flex items-center px-5 py-3 bg-white w-full hover:bg-gray-50 transition-colors"
              onClick={() => {}}
            >
              <div className="mr-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative">
                    <Image
                      src={conversation.user.image}
                      alt={conversation.user.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
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
                <p className="text-sm text-[#666] truncate text-left">
                  {conversation.lastMessage}
                </p>
              </div>

              {conversation.unreadCount && (
                <div className="w-6 h-6 rounded-full bg-[#EE9CA7] flex items-center justify-center ml-2">
                  <span className="text-xs font-bold text-white">
                    {conversation.unreadCount}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 px-5 py-5">
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