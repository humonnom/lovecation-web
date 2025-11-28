'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import {
  CheckCheck,
  Languages,
  Mic,
  MoreVertical,
  Play,
  PlusCircle,
  Send,
} from 'lucide-react';
import { DetailHeader } from '@/components/layout/DetailHeader';
import chatData from '@/data/chatExampleDummyData.json';

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  text?: string;
  voiceDuration?: string;
  timestamp: string;
  isRead?: boolean;
  translatedText?: string;
  isCurrentUser: boolean;
  isVoiceMessage?: boolean;
}

// 민석 = currentUserId (오른쪽, 한국 유저)
// 사쿠라 = otherUserId (왼쪽, 일본 유저)
const currentUserId = 'currentUserId';
const otherUserId = 'otherUserId';

// Load messages from JSON data
const mockMessages: Message[] = chatData as Message[];

const currentUser = {
  name: '민석',
  image: '/profiles/man-profile1.jpg',
};

const otherUser = {
  name: '사쿠라',
  nameJa: 'さくら (Sakura)',
  image:
    'https://tfvieqghcwnhsqexspxy.supabase.co/storage/v1/object/public/profile-images/sample2.jpg',
  isOnline: true,
};

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('chat');
  const chatId = params.id as string;
  const [showTranslation, setShowTranslation] = useState(false);
  const [message, setMessage] = useState('');

  const renderMessage = (msg: Message) => {
    const isMine = msg.isCurrentUser; // 민석 = true (오른쪽), 사쿠라 = false (왼쪽)
    const displayText = showTranslation && msg.translatedText ? msg.translatedText : msg.text;

    if (msg.voiceDuration) {
      // Voice message
      return (
        <div
          key={msg.id}
          className={`flex items-end mb-4 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden relative mx-2 flex-shrink-0">
            <Image
              src={msg.senderId === 'minsuk' ? currentUser.image : otherUser.image}
              alt="avatar"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="max-w-[70%]">
            {!isMine && (
              <p className="text-sm text-primary font-semibold mb-1 ml-3">{msg.senderName}</p>
            )}
            <div
              className={`rounded-[18px] p-3 flex items-center gap-2 min-w-[200px] shadow-sm ${
                isMine ? 'bg-primary rounded-br-sm' : 'bg-primary rounded-bl-sm'
              }`}
            >
              <button className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                <Play size={24} className="text-primary fill-primary" />
              </button>
              <div className="flex-1 flex items-center gap-0.5 h-10">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-sm bg-background/70"
                    style={{ height: `${Math.random() * 30 + 10}px` }}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-background/90">{msg.voiceDuration}</span>
            </div>
            <span
              className={`text-xs mt-1 block ${
                isMine ? 'text-text-secondary text-right' : 'text-background/70'
              }`}
            >
              {msg.timestamp}
            </span>
          </div>
        </div>
      );
    }

    // Text message
    return (
      <div
        key={msg.id}
        className={`flex items-end mb-4 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="w-9 h-9 rounded-full overflow-hidden relative mx-2 flex-shrink-0">
          <Image
            src={msg.senderId === 'minsuk' ? currentUser.image : otherUser.image}
            alt="avatar"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="max-w-[70%]">
          {!isMine && (
            <p className="text-sm text-primary font-semibold mb-1 ml-3">{msg.senderName}</p>
          )}
          <div
            className={`rounded-[18px] p-3 shadow-sm ${
              isMine ? 'bg-border rounded-br-sm' : 'bg-text-secondary rounded-bl-sm'
            }`}
          >
            <p className={`text-[15px] leading-5 mb-1 ${isMine ? 'text-foreground' : 'text-background'}`}>
              {displayText}
            </p>
            <div className="flex items-center justify-end gap-1">
              <span className={`text-xs ${isMine ? 'text-text-secondary' : 'text-background/70'}`}>
                {msg.timestamp}
              </span>
              {isMine && msg.isRead && <CheckCheck size={16} className="text-primary" />}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <DetailHeader
        centerElement={
          <div className="flex items-center flex-1">
            <div className="w-11 h-11 rounded-full overflow-hidden relative mr-3">
              <Image
                src={otherUser.image}
                alt={otherUser.name}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-foreground mb-0.5">{otherUser.name}</h2>
              <p className="text-sm text-primary font-medium">
                {otherUser.isOnline ? '온라인' : '오프라인'}
              </p>
            </div>
          </div>
        }
        rightElement={
          <button className="p-1">
            <MoreVertical size={24} className="text-foreground" />
          </button>
        }
      />

      {/* Translation Toggle */}
      <div className="flex items-center px-5 py-3 bg-background border-b border-border">
        <Languages size={20} className="text-primary" />
        <span className="flex-1 text-sm font-semibold text-foreground ml-2.5">실시간 번역</span>
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
            showTranslation ? 'bg-primary' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-background shadow-sm transition-transform ${
              showTranslation ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">{mockMessages.map(renderMessage)}</div>

      {/* Input Bar */}
      <div className="flex items-end px-4 py-3 bg-background border-t border-border gap-2">
        <button className="p-1">
          <PlusCircle size={28} className="text-primary" />
        </button>
        <div className="flex-1 bg-border rounded-[20px] px-4 py-2 max-h-[100px] overflow-y-auto">
          <textarea
            className="w-full bg-transparent outline-none text-[15px] text-foreground placeholder:text-text-secondary resize-none min-h-[36px]"
            placeholder="메시지를 입력하세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
          />
        </div>
        <button className="p-1.5">
          <Mic size={24} className="text-primary" />
        </button>
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Send size={20} className="text-background" />
        </button>
      </div>
    </div>
  );
}
