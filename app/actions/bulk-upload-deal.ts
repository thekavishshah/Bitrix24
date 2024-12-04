"use server";

import { db } from "@/lib/firebase/init";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { TransformedDeal } from "../types";
import prismaDB from "@/lib/prisma";
import { DealType } from "@prisma/client";

/**
 * Adds a list of transformed deals to Firebase.
 *
 * This asynchronous function handles bulk uploading of deals to Firebase Firestore.
 * Each deal is added to the "manual-deals" collection with a timestamp.
 *
 * @param {TransformedDeal[]} deals - An array of deals conforming to the `TransformedDeal` type.
 * @returns {Promise<{ type: string; message: string; failedDeals?: TransformedDeal[] }>}
 *          Returns an object indicating success or failure and lists any deals that failed to upload.
 */
const BulkUploadDealsToDB = async (deals: TransformedDeal[]) => {
  if (!Array.isArray(deals) || deals.length === 0) {
    return {
      type: "error",
      message: "No deals or a valid array provided for bulk upload.",
    };
  }

  try {
    // Bulk create deals using createMany
    const createdDeals = await prismaDB.deal.createMany({
      data: deals.map((deal) => ({
        title: deal.dealCaption,
        dealCaption: deal.dealCaption,
        firstName: deal.firstName,
        lastName: deal.lastName,
        email: deal.email,
        linkedinUrl: deal.linkedinUrl,
        workPhone: deal.workPhone,
        revenue: deal.revenue,
        ebitda: deal.ebitda,
        ebitdaMargin: deal.ebitdaMargin,
        industry: deal.industry,
        sourceWebsite: deal.sourceWebsite,
        companyLocation: deal.companyLocation,
        brokerage: deal.brokerage,
        dealType: DealType.MANUAL, // Assuming this is a manual deal
      })),
    });

    return {
      type: "success",
      message: `${createdDeals.count} deals uploaded successfully.`,
      // message: `${12} deals uploaded successfully.`,
    };
  } catch (error) {
    console.error("Bulk upload error:", error);

    if (error instanceof Error) {
      return {
        type: "error",
        message: `Bulk upload failed: ${error.message}`,
      };
    }

    return {
      type: "error",
      message: "Bulk upload failed due to a server error.",
    };
  }
};

export default BulkUploadDealsToDB;
