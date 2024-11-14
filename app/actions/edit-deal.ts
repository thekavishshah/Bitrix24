"use server";

import { auth } from "@/auth";
import { EditDealFormSchemaType } from "@/components/forms/edit-deal-form";
import { db } from "@/lib/firebase/init";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

/**
 * Updates an existing deal in Firebase.
 *
 * This asynchronous function handles updating an existing deal in Firebase based on values
 * validated by the `NewDealFormSchemaType` schema. It is intended for use in React applications
 * where form submissions are validated using Zod schemas before interacting with Firebase.
 *
 * @param {string} collectionName - Name of the collection we want to edit
 * @param {EditDealFormSchemaType} values - An object containing the form values that conform
 * @param {string} dealId - The ID of the deal document to update.
 *                                         to the `NewDealFormSchemaType` schema. This includes
 *                                         all necessary fields and structure expected by Firebase.
 *
 * @returns {Promise<object>} Returns a promise that resolves to an object indicating the result
 *                            of the update operation.
 */

export default async function EditDealFromFirebase(
  collectionName: string,
  values: EditDealFormSchemaType,
  dealId: string,
) {
  console.log("in update deal in firebase", dealId, values);

  const userSession = await auth();

  if (!userSession) {
    return {
      type: "error",
      message: "User not authenticated, cannot update Deal",
    };
  }

  try {
    const dealRef = doc(db, collectionName, dealId);
    const dealSnapshot = await getDoc(dealRef);

    if (!dealSnapshot.exists()) {
      return {
        type: "error",
        message: "Deal not found, cannot update non-existent deal",
      };
    }

    await updateDoc(dealRef, {
      ...values,
      updated_at: serverTimestamp(),
    });

    if (collectionName === "deals") {
      // because we are updating a deal, we need to revalidate the cache for the deal page
      // for collection deals we have the route as /raw-deals/[dealId]
      revalidatePath(`/raw-deals/${dealId}`);
    } else {
      // for rest we have the route as the collection Name itself
      revalidatePath(`/${collectionName}/${dealId}`);
    }

    console.log("Document updated with ID: ", dealId);

    return {
      type: "success",
      message: "Deal updated successfully",
      documentId: dealId,
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
}
