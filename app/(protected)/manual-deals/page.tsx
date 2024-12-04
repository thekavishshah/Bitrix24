import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import { Metadata } from "next";
import React, { Suspense } from "react";
import FetchingManualDeals from "./FetchingManualDeals";
import prismaDB from "@/lib/prisma";
import DealCard from "@/components/DealCard";

export const metadata: Metadata = {
  title: "Manual Deals",
  description: "View the manual deals that were added by the admin",
};

const ManualDealsPage = async () => {
  const deals = await prismaDB.deal.findMany({
    where: {
      dealType: "MANUAL",
    },
  });

  return (
    <div className="block-space container">
      <h1 className="mb-4 text-center md:mb-6 lg:mb-8">Manual Deals</h1>
      <Suspense
        fallback={
          <div className="blog-index">
            <DealCardSkeleton />
            <DealCardSkeleton />
            <DealCardSkeleton />
            <DealCardSkeleton />
            <DealCardSkeleton />
            <DealCardSkeleton />
          </div>
        }
      >
        <div className="blog-index">
          {deals.map((e) => {
            return <DealCard key={e.id} deal={e} />;
          })}
        </div>
      </Suspense>
    </div>
  );
};

export default ManualDealsPage;
