"use server";

import { auth } from "@/auth";
import { db } from "@/lib/firebase/init";
import { del } from "@vercel/blob";
import { deleteDoc, doc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export default async function DeleteBaseline(
  blobUrl: string,
  screenerId: string,
) {
  try {
    const userSession = await auth();

    if (!userSession) {
      return {
        type: "error",
        message: "User not authenticated, cannot add Deal",
      };
    }

    await del(blobUrl);

    await deleteDoc(doc(db, "questionnaires", screenerId));
    revalidatePath("/screening-baseline");
    return {
      type: "success",
      message: "Baseline deleted successfully",
    };
  } catch (error) {
    console.error("Error adding deal: ", error);
    if (error instanceof Error) {
      return {
        type: "error",
        message: `Failed to add screening baseline: ${error.message}`,
      };
    }

    return {
      type: "error",
      message: "Failed to add baseline. Please try again.",
    };
  }
}
