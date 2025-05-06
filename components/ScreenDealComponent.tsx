"use client";

import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Deal } from "@prisma/client";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ReactMarkdown from "react-markdown";
import { Trash2, Save, PlayCircle } from "lucide-react";
import screenDeal from "@/app/actions/screen-deal";
import { screeningSaveResult } from "@/app/actions/screening-save-result";
import { Skeleton } from "./ui/skeleton";

const ScreenDealComponent = ({ deal }: { deal: Deal }) => {
  const [isPending, startTransition] = useTransition();
  const [isSaving, startSavingTransition] = useTransition();
  const [screeningResult, setScreeningResult] = useState<string>("");

  const handleScreenDeal = async () => {
    setScreeningResult(""); // Clear previous results
    startTransition(async () => {
      try {
        const response = await screenDeal(deal);
        if (response.type === "error") {
          toast.error(response.message);
        } else {
          toast.success("Deal screened successfully");
          setScreeningResult(response.data || "");
        }
      } catch (error) {
        toast.error("Failed to screen deal");
        console.error(error);
      }
    });
  };

  const handleSaveResult = async () => {
    startSavingTransition(async () => {
      const response = await screeningSaveResult(screeningResult, deal.id);
      if (response.type === "error") {
        toast.error(response.message);
      } else {
        toast.success("Screening result saved");
      }
    });
  };

  const handleDeleteResult = () => {
    setScreeningResult("");
    toast.success("Screening result cleared");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Screening Analysis</span>
          <div className="flex gap-2">
            <Button
              onClick={handleScreenDeal}
              disabled={isPending}
              className="gap-2"
            >
              <PlayCircle className="h-4 w-4" />
              {isPending ? "Analyzing..." : "Start Analysis"}
            </Button>
            {screeningResult && (
              <>
                <Button
                  variant="outline"
                  onClick={handleSaveResult}
                  disabled={isSaving}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Result"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteResult}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {isPending ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : screeningResult ? (
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{screeningResult}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex h-[400px] items-center justify-center text-center text-muted-foreground">
              <div className="max-w-md space-y-2">
                <h3 className="text-lg font-semibold">No Analysis Yet</h3>
                <p>
                  Click the button to begin screening this deal using our
                  AI-powered analysis system.
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ScreenDealComponent;
