import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import { Metadata } from "next";
import React, { Suspense } from "react";
import FetchingManualDeals from "./FetchingManualDeals";

export const metadata: Metadata = {
  title: "Manual Deals",
  description: "View the manual deals that were added by the admin",
};

const ManualDealsPage = async () => {
  return (
    <div className="block-space big-container">
      <h1 className="mb-4 text-center md:mb-6 lg:mb-8">Manual Deals</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DealCardSkeleton />
            <DealCardSkeleton />
            <DealCardSkeleton />
            <DealCardSkeleton />
            <DealCardSkeleton />
            <DealCardSkeleton />
          </div>
        }
      >
        <FetchingManualDeals />
      </Suspense>
    </div>
  );
};

export default ManualDealsPage;
