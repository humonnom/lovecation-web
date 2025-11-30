import { Heart, MessageCircle, User } from 'lucide-react';
import Image from 'next/image';
import { Profile } from '@/types/supabase';
import { BaseModal } from '@/components/common/BaseModal';

interface MatchModalProps {
  matchedProfile: Profile;
  currentUserImage?: string;
  onSendMessage: () => void;
  onClose: () => void;
}

export function MatchModal({
  matchedProfile,
  currentUserImage,
  onSendMessage,
  onClose,
}: MatchModalProps) {
  return (
    <BaseModal
      title={"매치 성공!"}
      subtitle={`${matchedProfile.nickname}님과 매칭되었습니다!`}
      onClose={onClose}
    >
      {/* Profile Avatars with icon fallback */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden shadow-lg relative flex items-center justify-center bg-white">
          {currentUserImage ? (
            <Image src={currentUserImage} alt="You" fill className="object-cover" />
          ) : (
            <User className="w-12 h-12 text-primary" />
          )}
        </div>
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <Heart className="w-6 h-6 text-white fill-white" />
        </div>
        <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden shadow-lg relative flex items-center justify-center bg-white">
          {matchedProfile.avatar_url ? (
            <Image src={matchedProfile.avatar_url} alt={matchedProfile.nickname} fill className="object-cover" />
          ) : (
            <User className="w-12 h-12 text-primary" />
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-8">{matchedProfile.nickname}님에게 메시지를 보내보세요!</p>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onSendMessage}
          className="w-full py-4 bg-primary text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          메시지 보내기
        </button>
        <button
          onClick={onClose}
          className="w-full py-4 bg-white text-gray-700 rounded-full font-semibold border-2 border-gray-200 hover:bg-gray-50 transition"
        >
          계속 둘러보기
        </button>
      </div>
    </BaseModal>
  );
}
