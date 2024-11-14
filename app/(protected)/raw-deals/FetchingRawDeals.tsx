"use client";

import RawDealCard from "@/components/RawDealCard";
import DealCardSkeleton from "@/components/skeletons/DealCardSkeleton";
import { Button } from "@/components/ui/button";
import { fetchDocumentsWithPagination, SnapshotDeal } from "@/lib/firebase/db";
import { useEffect, useState } from "react";

const FetchingRawDeals = () => {
  const [data, setData] = useState<SnapshotDeal[]>([]);
  const [page, setPage] = useState(1);
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const documents = await fetchDocumentsWithPagination("deals", 35);
      setLoading(false);
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
        "deals",
        35,
        "next",
        item,
      );
      setLoading(false);
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
      "deals",
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
    <div className="big-container">
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
          {data.map((e) => {
            return <RawDealCard key={e.id} deal={e} />;
          })}
        </div>
      )}

      {/* Pagination controls */}
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

export default FetchingRawDeals;
