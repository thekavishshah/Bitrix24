import { openaiClient } from "@/lib/ai/available-models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
            "You are a senior investment analyst … If specific information is unavailable, explicitly state this in your explanation. Ensure your response is structured to match the predefined schema for seamless integration.",
        },
        {
          role: "user",
          content: `Please evaluate the following deal: ${JSON.stringify(deal)}`,
        },
      ],
    });

    return new Response(JSON.stringify(response.output), {
      headers: {
        "Content-Type": "application/json",
      },
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
