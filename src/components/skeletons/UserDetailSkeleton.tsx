import { DetailHeader } from '@/components/layout/DetailHeader';

export default function UserDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <DetailHeader loading />

      {/* Main photo skeleton */}
      <div className="w-full h-[500px] bg-gray-200 animate-pulse" />

      {/* Basic info section */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="mb-3">
          {/* Name skeleton */}
          <div className="w-3/5 h-7 bg-gray-200 rounded mb-2 animate-pulse" />
          {/* Name reading skeleton */}
          <div className="w-2/5 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          {/* Age skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] bg-gray-200 rounded-full animate-pulse" />
            <div className="w-[120px] h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          {/* Location skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] bg-gray-200 rounded-full animate-pulse" />
            <div className="w-[120px] h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* About Me section */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="w-2/5 h-5 bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="w-full h-4 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="w-[95%] h-4 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Interests section */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="w-2/5 h-5 bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-20 h-7 bg-gray-200 rounded-full animate-pulse" />
          ))}
        </div>
      </div>

      {/* Language Skills section */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="w-2/5 h-5 bg-gray-200 rounded mb-3 animate-pulse" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center mb-3">
            <div className="w-20 h-4 bg-gray-200 rounded mr-2 animate-pulse" />
            <div className="w-28 h-[18px] bg-gray-200 rounded mr-3 animate-pulse" />
            <div className="w-16 h-3.5 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Cultural Preferences section */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="w-2/5 h-5 bg-gray-200 rounded mb-3 animate-pulse" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-4">
            <div className="w-1/2 h-4 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-2 bg-gray-100 rounded overflow-hidden">
              <div className="h-full w-[70%] bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Lifestyle section */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="w-2/5 h-5 bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-[calc(50%-6px)] bg-[#FAFAFA] p-4 rounded-xl flex flex-col items-center"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-full mb-2 animate-pulse" />
              <div className="w-16 h-3.5 bg-gray-200 rounded mb-1 animate-pulse" />
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}
