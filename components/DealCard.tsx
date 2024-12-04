"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DollarSign, Edit, Trash2, MapPin, Briefcase } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Deal } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import DeleteDealFromDB from "@/app/actions/delete-deal";

const DealCard = ({ deal }: { deal: Deal }) => {
  let editLink = "";
  let detailLink = "";
  let screenLink = "";

  const { toast } = useToast();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const handleDelete = async () => {
    const response = await DeleteDealFromDB(deal.dealType, deal.id);
    if (response.type === "success") {
      toast({
        title: "Deal Deleted",
        description: response.message,
      });
    }

    if (response.type === "error") {
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  switch (deal.dealType) {
    case "MANUAL":
      editLink = `/manual-deals/${deal.id}/edit`;
      detailLink = `/manual-deals/${deal.id}`;
      screenLink = `/manual-deals/${deal.id}/screen`;
      break;

    case "AI_INFERRED":
      editLink = `/inferred-deals/${deal.id}/edit`;
      detailLink = `/inferred-deals/${deal.id}`;
      screenLink = `/inferred-deals/${deal.id}/screen`;
      break;

    case "SCRAPED":
      editLink = `/raw-deals/${deal.id}/edit`;
      detailLink = `/raw-deals/${deal.id}`;
      screenLink = `/raw-deals/${deal.id}/screen`;
  }

  return (
    <Card className="w-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="truncate text-lg font-bold text-gray-800 dark:text-gray-200">
            {deal.dealCaption}
          </CardTitle>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <Link href={editLink}>
                      <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Deal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Deal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <InfoItem
          icon={<DollarSign className="h-4 w-4 text-green-500" />}
          label="Revenue"
          value={formatCurrency(deal.revenue)}
        />
        <InfoItem
          icon={<DollarSign className="h-4 w-4 text-blue-500" />}
          label="EBITDA"
          value={formatCurrency(deal.ebitda)}
        />
        <InfoItem
          icon={<Briefcase className="h-4 w-4 text-purple-500" />}
          label="Industry"
          value={deal.industry}
        />
        {deal.askingPrice && (
          <InfoItem
            icon={<DollarSign className="h-4 w-4 text-orange-500" />}
            label="Asking Price"
            value={formatCurrency(deal.askingPrice)}
          />
        )}
        {deal.companyLocation && (
          <InfoItem
            icon={<MapPin className="h-4 w-4 text-red-500" />}
            label="Location"
            value={deal.companyLocation}
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2">
        <Button className="w-full" asChild>
          <Link href={detailLink}>View Details</Link>
        </Button>

        <Button className="w-full" asChild variant={"outline"}>
          <Link href={screenLink}>Screen Deal</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center text-sm">
    {icon}
    <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">
      {label}:
    </span>
    <span className="ml-1 truncate text-gray-600 dark:text-gray-400">
      {value}
    </span>
  </div>
);

export default DealCard;
