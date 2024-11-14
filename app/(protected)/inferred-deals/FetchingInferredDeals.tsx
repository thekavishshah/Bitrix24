"use client";

import InferredDealCard from "@/components/InferredDealCard";
import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import { Button } from "@/components/ui/button";
import { fetchDocumentsWithPagination, SnapshotDeal } from "@/lib/firebase/db";
import Link from "next/link";
import { useEffect, useState } from "react";

const FetchingInferredDeals = () => {
  const [data, setData] = useState<SnapshotDeal[]>([]);
  const [page, setPage] = useState(1);
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const documents = await fetchDocumentsWithPagination(
        "inferred-deals",
        35,
      );
      setLoading(false);

      console.log("fetchedDeals", documents);
      setData(documents);
      setIsNextAvailable(documents.length >= 3);
    };
    fetchData();
  }, []);

  const showNext = async (item: SnapshotDeal) => {
    setLoading(true);
    if (data.length === 0) {
      alert("No more deals to show");
      setLoading(false);
    } else {
      const nextItems = await fetchDocumentsWithPagination(
        "inferred-deals",
        35,
        "next",
        item,
      );
      setLoading(false); // Set loading to false after fetching completes
      if (nextItems.length > 0) {
        setData(nextItems);
        setPage(page + 1);
        setIsPreviousAvailable(true);
        setIsNextAvailable(nextItems.length >= 3);
      }
    }
  };

  const showPrevious = async (item: SnapshotDeal) => {
    setLoading(true);
    const previousItems = await fetchDocumentsWithPagination(
      "inferred-deals",
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
      <div>
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
          </div> // Replace with a spinner or skeleton if preferred
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.length > 0 ? (
              data.map((e) => (
                <InferredDealCard
                  key={e.id}
                  dealId={e.id}
                  title={e.title}
                  ebitda={e.revenue}
                  category={e.category}
                  asking_price={e.asking_price}
                />
              ))
            ) : (
              <div>
                <p>No deals found</p>
                <Button asChild variant={"secondary"}>
                  <Link href="/new-deal">Add Deal</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 w-full justify-end space-x-2">
        <Button
          onClick={() => {
            showPrevious(data[0] as SnapshotDeal);
          }}
          disabled={!isPreviousAvailable}
        >
          Previous
        </Button>

        <Button
          onClick={() => {
            showNext(data[data.length - 1] as SnapshotDeal);
          }}
          disabled={!isNextAvailable}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FetchingInferredDeals;
