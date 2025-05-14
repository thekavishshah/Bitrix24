// <project root>/app/actions/move-to-in-process.ts
"use server";

import prismaDB from "../../lib/prisma";           // <- relative import
import { DealStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function moveToInProcess(dealId: string): Promise<void> {
  await prismaDB.deal.update({
    where: { id: dealId },
    data: { status: DealStatus.IN_PROCESS },
  });

  // re-validate both lists
  revalidatePath("/raw-deals");
  revalidatePath("/in-process");
}
