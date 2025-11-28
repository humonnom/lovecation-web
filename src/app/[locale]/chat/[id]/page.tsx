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
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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

// AI 추천 문구
const suggestedMessages = [
  {
    id: 1,
    text: '안녕하세요! 한국어 공부 중이시라니 멋지네요.👍어떻게 시작하게 되셨어요?',
    translation: 'こんにちは！韓国語を勉強中だなんて素敵ですね。👍どうやって始めたんですか？',
  },
  {
    id: 2,
    text: '안녕하세요! 프로필 보니까 한국 문화 정말 좋아하시는 것 같아서 인사드려요😊',
    translation: 'こんにちは！プロフィールを見て韓国文化が本当に好きみたいで挨拶しますね😊',
  },
  {
    id: 3,
    text: '안녕하세요! 한국 드라마 좋아하신다고 들었는데, 추천 좀 해주실 수 있나요?😃',
    translation: 'こんにちは！韓国ドラマが好きだと聞きましたが、おすすめを教えてもらえますか？😃',
  },
];

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('chat');
  const chatId = params.id as string;
  const [showTranslation, setShowTranslation] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

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
            <p
              className={`text-[15px] leading-5 mb-1 ${isMine ? 'text-foreground' : 'text-background'}`}
            >
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

  const handleSuggestionClick = (suggestion: { id: number; text: string; translation: string }) => {
    setSelectedSuggestion(suggestion.text);

    // 선택된 문구를 입력창에 표시
    setMessage(suggestion.text);

    // 0.5초 후 추천 화면 닫고 메시지 추가
    setTimeout(() => {
      setShowSuggestions(false);

      // 첫 번째 메시지로 추가
      const newMessage: Message = {
        id: messages.length + 1,
        senderId: 'minsuk',
        senderName: '민석',
        text: suggestion.text,
        translatedText: suggestion.translation,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
        isCurrentUser: true,
      };

      // 기존 메시지 앞에 추가
      setMessages([newMessage, ...messages]);

      // 입력창 클리어
      setTimeout(() => {
        setMessage('');
      }, 100);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* AI 추천 문구 오버레이 */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="w-full max-w-md">
              {/* 헤더 */}
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">AI가 추천하는 첫 메시지</h2>
                <p className="text-base text-text-secondary">사쿠라님과의 대화를 시작해보세요!</p>
              </motion.div>

              {/* 추천 문구 카드들 */}
              <div className="space-y-3 relative">
                {/* 데모 안내 말풍선 */}
                <motion.div
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: [0, 3, 0],
                    y: [0, -3, 0],
                    opacity: 1,
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeInOut',
                    },
                    y: {
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeInOut',
                    },
                  }}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 z-10"
                >
                  <div className="relative">
                    {/* 말풍선 본체 */}
                    <div className="bg-primary text-white px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
                      <p className="text-xs font-medium">메세지를 선택해보세요!</p>
                    </div>
                    {/* 말풍선 꼬리 (왼쪽 중앙) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-primary" />
                    </div>
                  </div>
                </motion.div>

                {suggestedMessages.map((suggestion, index) => (
                  <motion.button
                    key={suggestion.id}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedSuggestion === suggestion.text
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-border bg-background hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <p className="text-[15px] font-medium text-foreground mb-1">
                      {suggestion.text}
                    </p>
                    <p className="text-sm text-text-secondary">{suggestion.translation}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <div className="flex-1 overflow-y-auto p-4">{messages.map(renderMessage)}</div>

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
