import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust this import based on your project structure

const LoadingSkeleton = () => {
  return (
    <div className="p-6 space-y-4">
      {/* Heading Skeleton */}
      <Skeleton className="h-8 w-1/2 mx-auto" />

      {/* Tagline Skeleton */}
      <Skeleton className="h-4 w-1/3 mx-auto" />

      {/* Two-column Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Card 1 Skeleton */}
        <div className="p-4 space-y-2 bg-gray-100 h-[24rem] rounded-md">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Card 2 Skeleton */}
        <div className="p-4 space-y-2 bg-gray-100 h-[24rem] rounded-md">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
