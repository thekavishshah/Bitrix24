import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import { Metadata } from "next";
import React, { Suspense } from "react";
import FetchingRawDeals from "./FetchingRawDeals";

export const metadata: Metadata = {
  title: "Raw Deals",
  description: "View the raw deals scraped from listings site",
};

const RawDealsPage = async () => {
  return (
    <div className="block-space container">
      <h1 className="mb-4 text-center md:mb-6 lg:mb-8">Raw Deals</h1>
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
        <FetchingRawDeals />
      </Suspense>
    </div>
  );
};

export default RawDealsPage;
