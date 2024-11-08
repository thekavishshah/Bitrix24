import React, { Suspense } from "react";
import FetchingInferredDeals from "./FetchingInferredDeals";
import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inferred Deals",
  description: "View the inferred deals scraped using AI",
};

const InferredDealsPage = async () => {
  return (
    <section className="block-space big-container">
      <div>
        <h1 className="mb-4">Inferred Deals</h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DealCardSkeleton />
              <DealCardSkeleton />
              <DealCardSkeleton />
              <DealCardSkeleton />
              <DealCardSkeleton />
              <DealCardSkeleton />
            </div>
          }
        >
          <FetchingInferredDeals />
        </Suspense>
      </div>
    </section>
  );
};

export default InferredDealsPage;
