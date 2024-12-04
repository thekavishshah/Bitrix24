"use client";

import { useState, useTransition } from "react";
import screenDeal from "@/app/actions/screen-deal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DealType } from "@prisma/client";
import SaveScreeningResultToDB from "@/app/actions/save-screen-deal";
import { useToast } from "@/hooks/use-toast";

interface AIReasoningProps {
  title: string;
  explanation: string;
  sentiment: "positive" | "neutral" | "negative";
}

export default function ScreenDealComponent({
  dealId,
  dealType,
}: {
  dealId: string;
  dealType: DealType;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [savePending, startSaveTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [aiReasoning, setAiReasoning] = useState<AIReasoningProps | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleScreenDeal = async () => {
    startTransition(async () => {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("comment", comment);
      formData.append("dealId", dealId);

      try {
        const result = await screenDeal(formData);
        setAiReasoning(result);
      } catch (error) {
        console.error("Error screening deal:", error);
      } finally {
      }
    });
  };

  const handleTryAgain = () => {
    setAiReasoning(null);
  };

  const handleSaveAIReasoning = async () => {
    startSaveTransition(async () => {
      if (!aiReasoning) return;
      console.log("Saving AI Reasoning:", aiReasoning);
      const response = await SaveScreeningResultToDB(
        aiReasoning,
        dealId,
        dealType,
      );

      if (response.type === "success") {
        toast({
          title: "Screening Result Saved",
          description: "The screening result has been saved successfully.",
        });
      }

      if (response.type === "error") {
        toast({
          title: "Error Saving Screening Result",
          description: response.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Screen Deal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            type="file"
            accept=".txt,.docx"
            onChange={handleFileChange}
            className="mb-2"
          />
          <p className="text-sm text-muted-foreground">
            Upload a .txt or .docx file with screening criteria
          </p>
        </div>
        <Textarea
          placeholder="Additional comments..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {!aiReasoning && (
          <Button onClick={handleScreenDeal} disabled={!file || isPending}>
            {isPending ? "Screening..." : "Screen Deal"}
          </Button>
        )}

        {aiReasoning && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{aiReasoning.title}</h3>
            <p className="whitespace-pre-wrap">{aiReasoning.explanation}</p>
            <p>
              Sentiment:{" "}
              <span
                className={`font-semibold ${
                  aiReasoning.sentiment === "positive"
                    ? "text-green-600"
                    : aiReasoning.sentiment === "negative"
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}
              >
                {aiReasoning.sentiment}
              </span>
            </p>
          </div>
        )}
      </CardContent>
      {aiReasoning && (
        <CardFooter className="flex justify-between">
          <Button onClick={handleTryAgain} variant="outline">
            Try Again
          </Button>
          <Button onClick={handleSaveAIReasoning} disabled={savePending}>
            {savePending ? "Saving..." : "Save AI Reasoning"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
