"use client";

import { ManualDeal, TransformedDeal } from "@/app/types";
import InferredDealCard from "@/components/InferredDealCard";
import ManualDealCard from "@/components/ManualDealCard";
import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  fetchDocumentsWithPagination,
  fetchManualDealsWithPagination,
  SnapshotDeal,
} from "@/lib/firebase/db";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const FetchingManualDeals = () => {
  const [data, setData] = useState<ManualDeal[]>([]);
  const [page, setPage] = useState(1);
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      console.log("fetching initial manual deals");
      const documents = await fetchManualDealsWithPagination(35);

      setLoading(false);
      console.log("fetchedDeals", documents);
      setData(documents);
      setIsNextAvailable(documents.length >= 3);
    };
    fetchData();
  }, []);

  const showNext = async (item: ManualDeal) => {
    setLoading(true);
    if (data.length === 0) {
      alert("No more deals to show");
      setLoading(false);
    } else {
      const nextItems = await fetchManualDealsWithPagination(35, "next", item);
      setLoading(false);
      if (nextItems.length > 0) {
        setData(nextItems);
        setPage(page + 1);
        setIsPreviousAvailable(true);
        setIsNextAvailable(nextItems.length >= 3);
      }
    }
  };

  const showPrevious = async (item: ManualDeal) => {
    setLoading(true);
    const previousItems = await fetchManualDealsWithPagination(
      35,
      "previous",
      item,
    );
    setLoading(false);
    if (previousItems.length > 0) {
      setData(previousItems);
      setPage(page - 1);
      setIsNextAvailable(true); // Enable Next button
      setIsPreviousAvailable(page > 2); // Enable Previous button only if page > 2
    }
  };

  return (
    <div>
      <div className="my-4 w-full justify-end space-x-2">
        <Button
          onClick={() => {
            showPrevious(data[0] as ManualDeal);
          }}
          disabled={!isPreviousAvailable}
        >
          Previous
        </Button>

        <Button
          onClick={() => {
            showNext(data[data.length - 1] as ManualDeal);
          }}
          disabled={!isNextAvailable}
        >
          Next
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <DealCardSkeleton />
          <DealCardSkeleton />
          <DealCardSkeleton />
          <DealCardSkeleton />
          <DealCardSkeleton />
          <DealCardSkeleton />
          <DealCardSkeleton />
          <DealCardSkeleton />
        </div>
      ) : (
        <div className="blog-index">
          {data.length > 0 ? (
            data.map((e) => {
              console.log("manual deal", e);
              return (
                <ManualDealCard
                  key={e.id}
                  dealCaption={e.deal_caption}
                  dealId={e.id}
                  industry={e.industry}
                  brokerage={e.brokerage}
                  ebitda={e.ebitda}
                  revenue={e.revenue}
                />
              );
            })
          ) : (
            <div>
              <h2 className="text-red-600">No Deals Found</h2>
              <p>Add a Deal to Continue</p>
              <Button asChild className="mt-4">
                <Link href="/new-deal">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Deal
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchingManualDeals;
