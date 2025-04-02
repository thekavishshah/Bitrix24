import React, { Suspense } from "react";
import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import { Metadata } from "next";
import prismaDB from "@/lib/prisma";
import DealCard from "@/components/DealCard";
import getCurrentUserRole from "@/lib/data/current-user-role";
import GetDeals, { GetAllDeals } from "@/app/actions/get-deal";
import SearchDeals from "@/components/SearchDeal";
import Pagination from "@/components/pagination";
import { setTimeout } from "timers/promises";

export const metadata: Metadata = {
  title: "Inferred Deals",
  description: "View the inferred deals scraped using AI",
};

// After
type SearchParams = Promise<{ [key: string]: string | undefined }>;

const RawDealsPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const search = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await GetAllDeals({
    search,
    offset,
    limit,
  });

  const currentUserRole = await getCurrentUserRole();

  return (
    <section className="block-space container">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold md:mb-6 lg:mb-8">Raw Deals</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Browse through our collection of unprocessed deals gathered from
          various sources including manual entries, bulk uploads, external
          website scraping, and AI-inferred opportunities.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-medium">
            Total Deals: <span className="font-bold">{totalCount}</span>
          </h4>
          <div className="ml-4 rounded-md bg-primary/10 px-3 py-1 text-sm">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <SearchDeals />
          <Pagination totalPages={totalPages} />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-xl text-muted-foreground">
            No deals found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((e) => (
            <DealCard key={e.id} deal={e} userRole={currentUserRole!} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RawDealsPage;
