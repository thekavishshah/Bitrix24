"use server";

import { auth } from "@/auth";
import {
  NewDealFormSchema,
  NewDealFormSchemaType,
} from "@/components/forms/new-deal-form";
import { db } from "@/lib/firebase/init";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import React from "react";

/**
 * Adds a new deal to Firebase.
 *
 * This asynchronous function handles adding a new deal to Firebase based on values
 * validated by the `NewDealSchemaZodType` schema. It is intended for use in React applications
 * where form submissions are validated using Zod schemas before interacting with Firebase.
 *
 * @param {string} collectionName - Name of the collection we want to delete the deal from
 * @param {string} dealId - ID of the deal we want to delete
 *
 * @returns {Promise<void>} Returns a promise that resolves once the deal has been added to Firebase.
 */
const DeleteDealFromFirebase = async (
  collectionName: string,
  dealId: string,
) => {
  const userSession = await auth();

  if (!userSession) {
    return {
      type: "error",
      message: "User not authenticated, cannot add Deal",
    };
  }

  try {
    await deleteDoc(doc(db, collectionName, dealId));

    console.log("revalidating cache for ", collectionName);
    if (collectionName === "deals") {
      // because we are updating a deal, we need to revalidate the cache for the deal page
      // for collection deals we have the route as /raw-deals/[dealId]
      revalidatePath(`/raw-deals`);
    } else {
      // for rest we have the route as the collection Name itself
      revalidatePath(`/${collectionName}`);
    }

    return {
      type: "success",
      message: "Deal deleted successfully",
    };
  } catch (error) {
    console.error("Error adding deal: ", error);
    if (error instanceof Error) {
      return {
        type: "error",
        message: `Failed to add the deal: ${error.message}`,
      };
    }

    return {
      type: "error",
      message: "Failed to add the deal. Please try again.",
    };
  }
};

export default DeleteDealFromFirebase;
