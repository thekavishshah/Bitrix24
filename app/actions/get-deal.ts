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
  const [data, totalCount] = await Promise.all([
    prismaDB.deal.findMany({
      where: { dealType, dealCaption: { contains: search } },
      skip: offset,
      take: limit,
    }),

    prismaDB.deal.count({
      where: { dealType, dealCaption: { contains: search } },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}

export async function GetAllDeals({
  search,
  offset = 0,
  limit = 20,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}): Promise<GetDealsResult> {
  const [data, totalCount] = await Promise.all([
    prismaDB.deal.findMany({
      where: { dealCaption: { contains: search } },
      skip: offset,
      take: limit,
    }),
    prismaDB.deal.count({
      where: { dealCaption: { contains: search } },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
