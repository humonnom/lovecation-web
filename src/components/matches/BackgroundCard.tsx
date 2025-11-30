import Image from 'next/image';

interface BackgroundCardProps {
  avatarUrl: string;
  nickname: string;
}

export function BackgroundCard({ avatarUrl, nickname }: BackgroundCardProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none transition-all duration-300"
      style={{
        opacity: 0.7,
        zIndex: -1,
        transform: 'scale(0.95)',
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
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>
      </div>
    </div>
  );
}
