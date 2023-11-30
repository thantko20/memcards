import { Skeleton } from "../ui/skeleton";

export const DeckSkeleton = () => {
  return <Skeleton className="h-[172px] w-full" />;
};

export const DecksContainerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <DeckSkeleton key={i} />
      ))}
    </div>
  );
};
