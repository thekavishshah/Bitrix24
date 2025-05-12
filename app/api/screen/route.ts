import { auth } from "@/auth";
import { openaiClient } from "@/lib/ai/available-models";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user) {
    console.log("user is not logged in");
    return NextResponse.json(
      {
        type: "error",
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const { deal } = await req.json();

  try {
    const response = await openaiClient.responses.create({
      model: "gpt-4.1",
      tools: [
        {
          type: "file_search",
          vector_store_ids: ["vs_J6ChDdA5z2j0fJKtmoOQnohz"],
          max_num_results: 20,
        },
      ],
      input: [
        {
          role: "system",
          content:
            "You are a senior investment analyst at Dark Alpha Capital, specializing in evaluating deals based on our firm's proprietary screening criteria. Utilize the provided vector store to retrieve relevant guidelines and apply them meticulously to assess the given deal. Your evaluation should include:\n\n- A clear title summarizing the deal.\n- An explanation detailing how the deal aligns or misaligns with our screening criteria.\n- An overall sentiment classification: Positive, Neutral, or Negative.\n- A numerical score between 0 and 100, reflecting the deal's alignment with our criteria.\n\nIf specific information is unavailable, explicitly state this in your explanation. Ensure your response is structured to match the predefined schema for seamless integration.",
        },
        {
          role: "user",
          content: `Please evaluate the following deal: ${JSON.stringify(deal)}`,
        },
      ],
    });

    console.log("response ", response);
    console.log("response ", response.output);

    // Extract just the annotations and text from the response
    const messageContent = response.output_text;
    return NextResponse.json({
      text: messageContent,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        type: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
