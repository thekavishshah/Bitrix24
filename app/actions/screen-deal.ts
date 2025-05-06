// "use server";

// import { openaiClient } from "@/lib/ai/available-models";
// import { withAuthServerAction } from "@/lib/withAuth";
// import { DealType } from "@prisma/client";
// import { User } from "@prisma/client";

// const screenDeal = withAuthServerAction(
//   async (user: User, dealId: string, dealType: DealType) => {
//     try {
//       const assistant = await openaiClient.beta.assistants.create({
//         name: "Financial Analyst Assistant",
//         instructions:
//           "You are an expert financial analyst. Use you knowledge base to answer questions about audited financial statements.",
//         model: "gpt-4o",
//         tools: [{ type: "file_search" }],
//         tool_resources: {
//           file_search: {
//             vector_store_ids: ["vs_J6ChDdA5z2j0fJKtmoOQnohz"],
//           },
//         },
//       });

//       const thread = await openaiClient.beta.threads.create();
//       await openaiClient.beta.threads.messages.create(thread.id, {
//         role: "user",
//         content: "Explain the criteria of Dark Alpha Capital in detail",
//       });
//       console.log("created a thread message");
//       const run = await openaiClient.beta.threads.runs.create(thread.id, {
//         assistant_id: assistant.id,
//       });
//       console.log("created a run");
//       let runStatus;
//       do {
//         runStatus = await openaiClient.beta.threads.runs.retrieve(
//           thread.id,
//           run.id,
//         );
//         if (runStatus.status !== "completed") {
//           await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
//         }
//       } while (runStatus.status !== "completed");

//       console.log("runStatus", runStatus);

//       const messages = await openaiClient.beta.threads.messages.list(thread.id);
//       const assistantMessage = messages.data.find(
//         (msg) => msg.role === "assistant",
//       );

//       console.log("assistantMessage", assistantMessage);
//       if (assistantMessage) {
//         console.log(assistantMessage.content[0].type);
//         console.log(assistantMessage.content[0].text);
//       }

//       return {
//         success: true,
//         message: assistantMessage?.content[0],
//       };
//     } catch (error) {
//       console.log(error);
//       if (error instanceof Error) {
//         return {
//           error: error.message || "Failed to screen deal",
//         };
//       }
//       return {
//         error: "Failed to screen deal",
//       };
//     }
//   },
// );

// export default screenDeal;
