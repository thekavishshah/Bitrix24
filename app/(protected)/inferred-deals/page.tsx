import React, { Suspense } from "react";
import FetchingInferredDeals from "./FetchingInferredDeals";
import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import { Metadata } from "next";
import prismaDB from "@/lib/prisma";
import DealCard from "@/components/DealCard";

export const metadata: Metadata = {
  title: "Inferred Deals",
  description: "View the inferred deals scraped using AI",
};

const InferredDealsPage = async () => {
  const deals = await prismaDB.deal.findMany({
    where: {
      dealType: "AI_INFERRED",
    },
  });

  return (
    <section className="block-space container">
      <div>
        <h1 className="mb-4">Inferred Deals</h1>
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
    </section>
  );
};

export default InferredDealsPage;
