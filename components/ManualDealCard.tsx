import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { DollarSign, Edit, Edit2Icon, EyeIcon, MapPinIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteDealButton from "./Buttons/delete-deal-button";

const ManualDealCard = ({
  dealId,
  title,
  ebitda,
  category,
  asking_price,
}: {
  dealId: string;
  title: string;
  ebitda: string | undefined;
  category: string | undefined;
  asking_price: string | undefined;
}) => {
  return (
    <Card>
      <CardHeader className="">
        <div className="flex justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/manual-deals/${dealId}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-white">Edit Deal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {category && (
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span className="font-medium">Category:</span>
            <span className="ml-2">{category}</span>
          </div>
        )}
        {asking_price && (
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span className="font-medium">Asking Price:</span>
            <span className="ml-2">{asking_price}</span>
          </div>
        )}

        {ebitda && (
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span className="font-medium">Ebitda:</span>
            <span className="ml-2">{ebitda}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" asChild>
          <Link href={`/manual-deals/${dealId}`}>
            <EyeIcon className="mr-2 h-4 w-4" /> View Details
          </Link>
        </Button>

        <DeleteDealButton
          dealCollection="manual-deals"
          dealId={dealId}
          classname="w-full"
        />
      </CardFooter>
    </Card>
  );
};

export default ManualDealCard;
