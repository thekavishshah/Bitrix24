"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { DealType } from "@prisma/client";
// import screenDeal from "@/app/actions/screen-deal";
import { toast } from "sonner";

const ScreenDealComponent = ({
  dealId,
  dealType,
}: {
  dealId: string;
  dealType: DealType;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleScreenDeal = async () => {
    startTransition(async () => {
      // const result = await screenDeal(dealId, dealType);
      // if (result.error) {
      //   toast.error(result.error);
      // } else {
      //   toast.success("Deal screened successfully");
      // }
    });
  };

  return (
    <div>
      <Button onClick={handleScreenDeal} disabled={isPending}>
        {isPending ? "Screening Deal..." : "Screen Deal"}
      </Button>
    </div>
  );
};

export default ScreenDealComponent;
