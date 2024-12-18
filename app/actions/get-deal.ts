"use server";

import prismaDB from "@/lib/prisma";
import { Deal, DealType } from "@prisma/client";

interface GetDealsResult {
  data: Deal[];
  totalCount: number;
  totalPages: number;
}

export default async function GetDeals({
  search,
  offset = 0,
  limit = 20,
  dealType,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
  dealType: DealType;
}): Promise<GetDealsResult> {
  const data = await prismaDB.deal.findMany({
    where: { dealType, dealCaption: { contains: search } },
    skip: offset,
    take: limit,
  });

  const totalCount = await prismaDB.deal.count({
    where: { dealType, dealCaption: { contains: search } },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
