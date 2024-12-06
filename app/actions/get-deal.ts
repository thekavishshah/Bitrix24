"use server";

import prismaDB from "@/lib/prisma";
import { Deal } from "@prisma/client";

interface GetDealsResult {
  data: Deal[];
  totalCount: number;
  totalPages: number;
}

export default async function GetDeals({
  search,
  offset = 0,
  limit = 20,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}): Promise<GetDealsResult> {
  const data = await prismaDB.deal.findMany({
    where: { dealType: "MANUAL", dealCaption: { contains: search } },
    skip: offset,
    take: limit,
  });

  const totalCount = await prismaDB.deal.count({
    where: { dealType: "MANUAL", dealCaption: { contains: search } },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
