"use client";

import React, { useTransition } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter, useSearchParams } from "next/navigation";
import { Value } from "@radix-ui/react-select";

const DealTypeFilter = () => {
  const searchParams = useSearchParams();
  const selectedDealTypes = searchParams.getAll("dealType");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className="flex items-center gap-2"
      data-pending={isPending ? "" : undefined}
    >
      <ToggleGroup
        type="multiple"
        onValueChange={(value) => {
          startTransition(() => {
            console.log("value", value);
            const params = new URLSearchParams(searchParams);
            params.delete("dealType");
            value.forEach((e) => {
              return params.append("dealType", e);
            });
            router.push(`?${params.toString()}`, {
              scroll: false,
            });
          });
        }}
        defaultValue={selectedDealTypes}
      >
        <ToggleGroupItem value="MANUAL">MANUAL</ToggleGroupItem>
        <ToggleGroupItem value="SCRAPED">SCRAPED</ToggleGroupItem>
        <ToggleGroupItem value="AI_INFERRED">AI Inferred</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default DealTypeFilter;
