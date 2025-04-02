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

/**
 *
 * get all deals with pagination and filter by deal type
 *
 * @param search - search query
 * @param offset - offset
 * @param limit - limit
 * @param dealTypes - deal types
 * @returns
 */
export async function GetAllDeals({
  search,
  offset = 0,
  limit = 20,
  dealTypes,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
  dealTypes?: DealType[];
}): Promise<GetDealsResult> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // console.log("dealTypes", dealTypes);

  const whereClause = {
    ...(search ? { dealCaption: { contains: search } } : {}),
    ...(dealTypes && dealTypes.length > 0
      ? { dealType: { in: dealTypes } }
      : {}),
  };

  const [data, totalCount] = await Promise.all([
    prismaDB.deal.findMany({
      where: whereClause,
      skip: offset,
      take: limit,
    }),
    prismaDB.deal.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
