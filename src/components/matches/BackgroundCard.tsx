import Image from 'next/image';

interface BackgroundCardProps {
  avatarUrl: string;
  nickname: string;
  isMovingForward?: boolean;
}

export function BackgroundCard({ avatarUrl, nickname, isMovingForward = false }: BackgroundCardProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none transition-all duration-300"
      style={{
        opacity: isMovingForward ? 1 : 0.7,
        zIndex: -1,
        transform: isMovingForward ? 'scale(1)' : 'scale(0.95)',
        transformOrigin: 'center center',
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full aspect-[2/3]">
        <div className="relative h-full">
          <Image
            width={500}
            height={500}
            src={avatarUrl || '/placeholder.svg'}
            alt={nickname}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isMovingForward ? 'blur-none' : 'blur-sm'
            }`}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isMovingForward
                ? 'bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-100'
                : 'bg-gradient-to-b from-black/40 via-black/30 to-black/60 opacity-100'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
