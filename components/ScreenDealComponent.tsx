"use client";

import { useState, useTransition } from "react";
import { readStreamableValue } from "ai/rsc";
import { screenDeal } from "@/app/actions/screen-deal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const ScreenDealFormSchema = z.object({
  type: z.enum(["one", "two"], {
    required_error: "You need to select a notification type.",
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
  const [isPending, startTransititon] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ScreenDealFormSchema>>({
    resolver: zodResolver(ScreenDealFormSchema),
  });

  function onSubmit(data: z.infer<typeof ScreenDealFormSchema>) {
    startTransititon(async () => {
      const dealData = JSON.stringify({
        title: title,
        first_name: first_name,
        last_name: last_name,
        direct_phone: direct_phone,
        work_phone: work_phone,
        under_contract: under_contract,
        revenue: revenue,
        link: link,
        asking_price: asking_price,
        ebitda: ebitda,
        inventory: inventory,
        grossRevenue: grossRevenue,
        listing_code: listing_code,
        state: state,
        status: status,
        category: category,
        main_content: main_content,
        explanation: explanation,
        id: id,
      });
      const { text } = await screenDeal(dealData, data);
      setGeneration(text);
    });
  }
  return (
    <div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select a Questionaire.....</FormLabel>
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
                          Questionaire 1
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="two" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Questionaire 2
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Generating" : "Generate"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-4">
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-muted p-4 text-muted-foreground">
          {generation ? generation : "No data"}
        </pre>
        {generation && <Button>Save Explanation</Button>}
      </div>
    </div>
  );
}
