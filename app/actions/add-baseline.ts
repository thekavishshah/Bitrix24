"use server";

import { BaselineUploadZodType } from "@/components/forms/baseline-upload-form";
import { db } from "@/lib/firebase/init";
import { put } from "@vercel/blob";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export default async function AddScreeningBaseline(values: FormData) {
  try {
    console.log("in add baseline to firebase", values);

    const questionnaire = values.get("questionnaire") as File;
    const title = values.get("title");
    const purpose = values.get("purpose");
    const author = values.get("author");
    const version = values.get("version");

    console.log({ questionnaire, title, purpose, author, version });

    const { url } = await put(questionnaire.name, questionnaire, {
      access: "public",
    });

    const docRef = await addDoc(collection(db, "questionnaires"), {
      url,
      title,
      purpose,
      author,
      version,
      created_at: serverTimestamp(),
    });

    console.log("Document written with ID: ", docRef.id);

    revalidatePath("/screening-baseline");

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
