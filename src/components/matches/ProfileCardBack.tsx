import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

interface ProfileCardBackProps {
  bio: string;
  interests: string[];
  profileId: string;
  onClose: (e: React.MouseEvent) => void;
}

export function ProfileCardBack({ bio, interests, profileId, onClose }: ProfileCardBackProps) {
  const t = useTranslations('userDetail.interestsList');
  const tMatch = useTranslations('match');
  const router = useRouter();

  const handleLearnMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/user-detail/${profileId}`);
  };

  return (
    <div
      className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden overflow-y-auto"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
      }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">About</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">{bio}</p>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mb-6">
          {interests.map((interest, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-primary-light/50 text-primary rounded-full text-sm font-medium"
            >
              {t(interest)}
            </span>
          ))}
        </div>

        {/* Learn More Button */}
        <button
          onClick={handleLearnMore}
          className="mt-auto w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
        >
          {tMatch('learnMore')}
        </button>
      </div>
    </div>
  );
}
