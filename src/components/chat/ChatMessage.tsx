import Image from 'next/image';
import { CheckCheck, Play } from 'lucide-react';
import { motion } from 'motion/react';
import type { Message, User } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
  currentUser: User;
  otherUser: User;
  showTranslation: boolean;
}

export function ChatMessage({
  message,
  currentUser,
  otherUser,
  showTranslation,
}: ChatMessageProps) {
  const isMine = message.isCurrentUser;
  const showTranslatedText = showTranslation && !isMine && message.translatedText;
  const avatarSrc = isMine ? currentUser.image : otherUser.image;

  if (message.voiceDuration) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex items-end mb-4 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="w-9 h-9 rounded-full overflow-hidden relative mx-2 flex-shrink-0">
          <Image src={avatarSrc} alt="avatar" fill className="object-cover object-center" />
        </div>
        <div className="max-w-[70%]">
          {!isMine && (
            <p className="text-sm text-primary font-semibold mb-1 ml-3">{message.senderId}</p>
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
            <span className="text-xs font-semibold text-background/90">
              {message.voiceDuration}
            </span>
          </div>
          <span
            className={`text-xs mt-1 block ${
              isMine ? 'text-text-secondary text-right' : 'text-background/70'
            }`}
          >
            {message.timestamp}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end mb-4 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className="w-9 h-9 rounded-full overflow-hidden relative mx-2 flex-shrink-0">
        <Image src={avatarSrc} alt="avatar" fill className="object-cover object-center" />
      </div>
      <div className="max-w-[70%]">
        {!isMine && (
          <p className="text-sm text-primary font-semibold mb-1 ml-3">{message.senderId}</p>
        )}
        <div
          className={`rounded-[18px] p-3 shadow-sm ${
            isMine ? 'bg-border rounded-br-sm' : 'bg-text-secondary rounded-bl-sm'
          }`}
        >
          {/* 원문 */}
          <p className={`text-[15px] leading-5 ${isMine ? 'text-foreground' : 'text-background'}`}>
            {message.text}
          </p>

          {/* 번역 텍스트 (사쿠라 메시지에만, 번역 켜진 경우) */}
          {showTranslatedText && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-2 pt-2 border-t border-background/20"
            >
              <p className="text-sm text-background/80 leading-5">{message.translatedText}</p>
            </motion.div>
          )}

          <div
            className={`flex items-center justify-end gap-1 ${showTranslatedText ? 'mt-2' : 'mt-1'}`}
          >
            <span className={`text-xs ${isMine ? 'text-text-secondary' : 'text-background/70'}`}>
              {message.timestamp}
            </span>
            {isMine && message.isRead && <CheckCheck size={16} className="text-primary" />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
