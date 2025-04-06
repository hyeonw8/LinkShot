interface SkeletonListSectionProps {
  title: string;
  count?: number;
}

export const SkeletonListSection = ({ title, count = 6 }: SkeletonListSectionProps) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-3 pl-1">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="border p-4 rounded-md shadow space-y-2 animate-pulse h-[300px]"
          >
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="w-full h-32 bg-gray-300 rounded-md" />
            <div className="h-6 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-5/6 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};