"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { DealType } from "@prisma/client";
import DeleteSimFromDB from "@/app/actions/delete-sim";
import { useToast } from "@/hooks/use-toast";

interface SimItemProps {
  title: string;
  description: string;
  status: string;
  cimId: string;
  dealId: string;
  dealType: DealType;
}

const SimItem: React.FC<SimItemProps> = ({
  title,
  description,
  status,
  cimId,
  dealId,
  dealType,
}) => {
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500";
      case "IN_PROGRESS":
        return "bg-yellow-500";
      case "PENDING":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className={getStatusColor(status)}>
            {status}
          </Badge>
          <Button
            variant="destructive"
            size="icon"
            onClick={async () => {
              // delete SIM
              const response = await DeleteSimFromDB(cimId, dealType, dealId);
              if (response.type === "success") {
                toast({
                  title: "SIM deleted successfully",
                  description: "The SIM has been deleted successfully",
                });
              }

              if (response.type === "error") {
                toast({
                  title: "Error deleting SIM",
                  description: response.message,
                  variant: "destructive",
                });
              }
            }}
            aria-label="Delete SIM"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default SimItem;
