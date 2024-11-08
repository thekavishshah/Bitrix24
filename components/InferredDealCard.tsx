"use client";

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
import { DollarSign, MapPinIcon } from "lucide-react";

const InferredDealCard = ({
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
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {category && (
          <div className="flex items-center ">
            <DollarSign className="mr-2 h-4 w-4" />
            <span className="font-medium">Category:</span>
            <span className="ml-2">{category}</span>
          </div>
        )}
        {asking_price && (
          <div className="flex items-center ">
            <DollarSign className="mr-2 h-4 w-4" />
            <span className="font-medium">Asking Price:</span>
            <span className="ml-2">{asking_price}</span>
          </div>
        )}

        {ebitda && (
          <div className="flex items-center ">
            <DollarSign className="mr-2 h-4 w-4" />
            <span className="font-medium">Ebitda:</span>
            <span className="ml-2">{ebitda}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/inferred-deals/${dealId}`}>View Deal</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InferredDealCard;
