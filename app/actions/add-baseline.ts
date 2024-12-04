"use server";

import prismaDB from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export default async function AddScreeningBaseline(values: FormData) {
  try {
    console.log("in add baseline to firebase", values);

    const questionnaire = values.get("questionnaire") as File;
    const title = values.get("title") as string;
    const purpose = values.get("purpose") as string;
    const author = values.get("author") as string;
    const version = values.get("version") as string;

    console.log({ questionnaire, title, purpose, author, version });

    const { url } = await put(questionnaire.name, questionnaire, {
      access: "public",
    });

    const docRef = await prismaDB.questionnaire.create({
      data: {
        fileUrl: url,
        title,
        purpose,
        author,
        version,
      },
    });

    console.log("Document written with ID: ", docRef.id);

    revalidatePath("/questionnaires");

    return {
      type: "success",
      message: "Baseline added successfully",
      docId: docRef.id,
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
