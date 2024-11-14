"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DeleteDealFromFirebase from "@/app/actions/delete-deal";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

const DeleteDealButton = ({
  dealCollection,
  dealId,
  classname,
}: {
  dealCollection: string;
  dealId: string;
  classname?: string;
}) => {
  const [isPending, startTransititon] = React.useTransition();
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        startTransititon(async () => {
          const response = await DeleteDealFromFirebase(dealCollection, dealId);
          if (response.type === "success") {
            toast({
              title: "Deal Deleted successfully",
              description: "Deal has been deleted successfully",
              action: (
                <ToastAction
                  altText="Refresh"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Refresh
                </ToastAction>
              ),
            });
            router.refresh();
          }

          if (response.type === "error") {
            toast({
              title: "Error saving deal",
              description: "Error saving deal",
              variant: "destructive",
            });
          }
        });
      }}
      className={cn(classname)}
      disabled={isPending}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteDealButton;
