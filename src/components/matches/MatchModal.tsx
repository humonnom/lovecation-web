import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Profile } from '@/types/supabase';

interface MatchModalProps {
  matchedProfile: Profile;
  currentUserImage?: string;
  onSendMessage: () => void;
  onClose: () => void;
}

export function MatchModal({
  matchedProfile,
  currentUserImage = '/korean-man.png',
  onSendMessage,
  onClose,
}: MatchModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-primary-light/30 to-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="mb-6">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary mb-2">
            매치 성공!
          </h2>
          <p className="text-gray-600">{matchedProfile.nickname}님과 매칭되었습니다!</p>
        </div>

        {/* Profile Images */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden shadow-lg relative">
            <Image
              src={currentUserImage}
              alt="You"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden shadow-lg relative">
            <Image
              src={matchedProfile.avatar_url || '/placeholder.svg'}
              alt={matchedProfile.nickname}
              fill
              className="object-cover"
            />
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
      </div>
    </div>
  );
}
