'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Languages, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { DetailHeader } from '@/components/layout/DetailHeader';
import { AISuggestionOverlay } from '@/components/chat/AISuggestionOverlay';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { BouncingSpeechBubble } from '@/components/common/BouncingSpeechBubble';
import { useFunnel } from '@/hooks/useFunnel';
import chatData from '@/data/chatExampleDummyData.json';
import type { Message, SuggestedMessage } from '@/types/chat';

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

const suggestedMessages: SuggestedMessage[] = [
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

const STEPS = ['ai-suggestion', 'chat'] as const;

export default function ChatDetailPage() {
  const { Funnel, Step, setStep } = useFunnel(STEPS);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [autoPlayStarted, setAutoPlayStarted] = useState(false);
  const [showTranslationHint, setShowTranslationHint] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤 자동 이동
  useEffect(() => {
    if (messages.length < 3) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const startAutoPlay = () => {
    if (autoPlayStarted) return;
    setAutoPlayStarted(true);

    let currentIndex = 0;
    const allMessages = mockMessages;

    const playNextMessage = () => {
      if (currentIndex >= allMessages.length) return;

      const msg = allMessages[currentIndex];

      // 사쿠라 메시지인 경우 타이핑 인디케이터 표시
      if (!msg.isCurrentUser) {
        setIsTyping(true);

        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, msg]);
          currentIndex++;

          // id가 2인 메시지가 표시된 후 번역 버튼 자동 켜기
          if (msg.id === 2) {
            // 메시지 애니메이션(0.3초) 완료 후 말풍선 표시
            // 1. 번역 가능하다는 메시지 표시 (애니메이션 후 0.5초 대기)
            setTimeout(() => {
              setShowTranslationHint(true);
            }, 800);

            // 2. 번역 버튼 켜기 (말풍선 표시 후 1.5초)
            setTimeout(() => {
              setShowTranslation(true);
            }, 2300);

            // 3. 메시지 숨기기 후 다음 메시지 재생 (추가 딜레이)
            setTimeout(() => {
              setShowTranslationHint(false);
              // 메시지3 등장을 더 딜레이 (2초 추가)
              setTimeout(playNextMessage, 2000);
            }, 4800);
          } else if (msg.id === 3) {
            // id3 타이핑 끝나는 시점에 스크롤을 맨 위로
            messagesContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(playNextMessage, 1500 + Math.random() * 1000);
          } else {
            setTimeout(playNextMessage, 1500 + Math.random() * 1000);
          }
        }, 1500);
      } else {
        // 민석 메시지는 바로 추가
        setMessages((prev) => [...prev, msg]);
        currentIndex++;

        // 다음 메시지 재생 (1-2초 간격)
        setTimeout(playNextMessage, 1000 + Math.random() * 1000);
      }
    };

    playNextMessage();
  };

  const handleSuggestionClick = (suggestion: SuggestedMessage) => {
    setSelectedSuggestion(suggestion.text);

    setTimeout(() => {
      const newMessage: Message = {
        id: 0,
        senderId: 'minsuk',
        senderName: '민석',
        text: suggestion.text,
        translatedText: suggestion.translation,
        timestamp: '10:32',
        isRead: false,
        isCurrentUser: true,
      };

      setMessages([newMessage]);
      setStep('chat');

      // 자동 재생 시작
      setTimeout(() => {
        startAutoPlay();
      }, 500);
    }, 500);
  };

  return (
    <Funnel>
      <Step name="ai-suggestion">
        <AISuggestionOverlay
          suggestions={suggestedMessages}
          selectedSuggestion={selectedSuggestion}
          onSuggestionClick={handleSuggestionClick}
        />
      </Step>

      <Step name="chat">
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
          <div className="flex items-center px-5 py-3 bg-background border-b border-border relative">
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

            {/* 번역 힌트 말풍선 */}
            {showTranslationHint && (
              <BouncingSpeechBubble
                text="자동 번역 기능을 사용할 수 있습니다."
                position="bottom"
                /* zIndex must be higher than the header(Z_INDEX.HEADER) */
                className="absolute -top-12 right-5 z-51"
              />
            )}
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                currentUser={currentUser}
                otherUser={otherUser}
                showTranslation={showTranslation}
              />
            ))}

            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-end mb-4"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden relative mx-2 flex-shrink-0">
                  <Image
                    src={otherUser.image}
                    alt="avatar"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="max-w-[70%]">
                  <p className="text-sm text-primary font-semibold mb-1 ml-3">{otherUser.name}</p>
                  <div className="rounded-[18px] px-5 py-3 bg-text-secondary rounded-bl-sm shadow-sm">
                    <div className="flex gap-1 items-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 rounded-full bg-background/70"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-background/70"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-background/70"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 스크롤 타겟 */}
            <div ref={messagesEndRef} className={'h-10'} />
          </div>
        </div>
      </Step>
    </Funnel>
  );
}
