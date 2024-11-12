"use server";

import { auth } from "@/auth";
import {
  NewDealFormSchema,
  NewDealFormSchemaType,
} from "@/components/forms/new-deal-form";
import { db } from "@/lib/firebase/init";
import { addDoc, collection } from "firebase/firestore";
import React from "react";

/**
 * Adds a new deal to Firebase.
 *
 * This asynchronous function handles adding a new deal to Firebase based on values
 * validated by the `NewDealSchemaZodType` schema. It is intended for use in React applications
 * where form submissions are validated using Zod schemas before interacting with Firebase.
 *
 * @param {NewDealSchemaZodType} values - An object containing the form values that conform
 *                                         to the `NewDealSchemaZodType` schema. This includes
 *                                         all necessary fields and structure expected by Firebase.
 *
 * @returns {Promise<void>} Returns a promise that resolves once the deal has been added to Firebase.
 */
const AddDealToFirebase = async (values: NewDealFormSchemaType) => {
  console.log("in add deal to firebase", values);

  const userSession = await auth();

  if (!userSession) {
    return {
      type: "error",
      message: "User not authenticated, cannot add Deal",
    };
  }

  try {
    // const validatedFields = NewDealFormSchema.safeParse(values);

    // if (!validatedFields.success) {
    //   return {
    //     type: "error",
    //     message: "Server Side Error from Zod",
    //   };
    // }

    const docRef = await addDoc(collection(db, "manual-deals"), {
      ...values,
    });

    console.log("Document written with ID: ", docRef.id);

    return {
      type: "success",
      message: "Deal saved successfully",
      documentId: docRef.id,
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

export default AddDealToFirebase;
