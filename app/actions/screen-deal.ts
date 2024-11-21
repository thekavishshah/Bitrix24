"use server";

import { ScreenDealFormSchema } from "@/components/ScreenDealComponent";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import * as fs from "fs/promises";
import * as path from "path";
import { z } from "zod";

const openai = createOpenAI({
  // custom settings, e.g.
  apiKey: process.env.AI_API_KEY,
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});

export async function screenDeal(
  dealInformation: string,
  values: z.infer<typeof ScreenDealFormSchema>,
) {
  "use server";

  let filePath;

  if (values.type === "one") {
    filePath = path.join(process.cwd(), "app/actions", "DealScreen.txt");
  }

  if (values.type === "two") {
    filePath = path.join(process.cwd(), "app/actions", "SecondDealScreen.txt");
  }

  // @ts-ignore
  const fileContent = await fs.readFile(filePath, "utf-8");

  const { text, finishReason, usage } = await generateText({
    model: openai("o1-preview"),
    prompt: `I want you to screen the deal:${dealInformation} against the foloowing questionaire:${fileContent} and evaludate whether this deal is suitable for our company or not.`,
  });

  return { text, finishReason, usage };
}
