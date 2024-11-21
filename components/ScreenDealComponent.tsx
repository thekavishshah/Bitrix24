"use client";

import { useState, useTransition } from "react";
import { readStreamableValue } from "ai/rsc";
import { screenDeal } from "@/app/actions/screen-deal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const ScreenDealFormSchema = z.object({
  type: z.enum(["one", "two"], {
    required_error: "You need to select a questionnaire type.",
  }),
});

type ScreenDealComponentProps = {
  title: string;
  first_name?: string;
  last_name?: string;
  direct_phone?: string;
  work_phone?: string;
  under_contract?: string;
  revenue?: string;
  link?: string;
  asking_price?: string;
  ebitda?: string;
  inventory?: string;
  grossRevenue?: string;
  listing_code?: string;
  state?: string;
  status?: "Approved" | "Rejected";
  category?: string;
  main_content?: string;
  explanation?: string;
  id: string;
  dealCollection: string;
};

export default function ScreenDealComponent({
  title,
  first_name,
  last_name,
  direct_phone,
  work_phone,
  under_contract,
  revenue,
  link,
  asking_price,
  ebitda,
  inventory,
  grossRevenue,
  listing_code,
  state,
  status,
  category,
  main_content,
  explanation,
  id,
  dealCollection,
}: ScreenDealComponentProps) {
  const [generation, setGeneration] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ScreenDealFormSchema>>({
    resolver: zodResolver(ScreenDealFormSchema),
  });

  function onSubmit(data: z.infer<typeof ScreenDealFormSchema>) {
    startTransition(async () => {
      const dealData = JSON.stringify({
        title,
        first_name,
        last_name,
        direct_phone,
        work_phone,
        under_contract,
        revenue,
        link,
        asking_price,
        ebitda,
        inventory,
        grossRevenue,
        listing_code,
        state,
        status,
        category,
        main_content,
        explanation,
        id,
      });

      const { text } = await screenDeal(dealData, data);
      setGeneration(text);
    });
  }

  const handleSave = () => {
    // Implement save functionality here
    toast({
      title: "Explanation Saved",
      description: "The generated explanation has been saved successfully.",
    });
  };

  const handleRemove = () => {
    setGeneration("");
    toast({
      title: "Explanation Removed",
      description: "The generated explanation has been removed.",
    });
  };

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select a Questionnaire</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="one" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Questionnaire 1
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="two" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Questionnaire 2
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </form>
        </Form>

        {isPending ? (
          <div className="mt-6 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : generation ? (
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">
              Generated Explanation:
            </h3>
            <div className="rounded-md bg-muted p-4">
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                {generation}
              </pre>
            </div>
          </div>
        ) : null}
      </CardContent>
      {generation && (
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Explanation
          </Button>
          <Button variant="outline" onClick={handleRemove}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Explanation
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
