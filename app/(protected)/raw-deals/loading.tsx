import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import React from "react";

const loading = () => {
  return (
    <div className="block-space big-container">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DealCardSkeleton />
        <DealCardSkeleton />
        <DealCardSkeleton />
        <DealCardSkeleton />
        <DealCardSkeleton />
        <DealCardSkeleton />
      </div>
    </div>
  );
};

export default loading;
