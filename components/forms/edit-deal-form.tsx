"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useTransition } from "react";
import AddDealToFirebase from "@/app/actions/add-deal";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import EditDealFromFirebase from "@/app/actions/edit-deal";

export const EditDealFormSchema = z.object({
  first_name: z.optional(z.string()),
  last_name: z.optional(z.string()),
  title: z
    .string()
    .min(5, { message: "Title should be at least 5 characters long" }),
  direct_phone: z.optional(z.string()),
  work_phone: z.optional(z.string()),
  under_contract: z.optional(z.string()),
  revenue: z.optional(z.string()),
  ebitda: z.optional(z.string()),
  grossRevenue: z.optional(z.string()),
  inventory: z.optional(z.string()),
  status: z.enum(["Approved", "Rejected", "Pending"]),
  link: z.optional(z.string()),
  asking_price: z.optional(z.string()),
  listing_code: z.optional(z.string()),
  state: z.optional(z.string()),
  category: z.optional(z.string()),
  main_content: z.optional(z.string()),
  explanation: z.optional(z.string()),
});

// infer type of formSchema
export type EditDealFormSchemaType = z.infer<typeof EditDealFormSchema>;

type EditDealFormProps = {
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

const EditDealForm = ({
  id,
  title,
  first_name,
  last_name,
  direct_phone,
  work_phone,
  under_contract,
  revenue,
  link,
  asking_price,
  listing_code,
  state,
  status,
  category,
  main_content,
  ebitda,
  grossRevenue,
  inventory,
  explanation,
  dealCollection,
}: EditDealFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<EditDealFormSchemaType>({
    resolver: zodResolver(EditDealFormSchema),
    defaultValues: {
      first_name: first_name || "",
      last_name: last_name || "",
      direct_phone: direct_phone || "",
      work_phone: work_phone || "",
      title,
      under_contract: under_contract || "",
      revenue: revenue || "",
      link: link || "",
      asking_price: asking_price || "",
      listing_code: listing_code || "",
      state: state || "",
      status: status || "Pending",
      category: category || "",
      main_content: main_content || "",
      explanation: explanation || "",
      ebitda: ebitda || "",
      grossRevenue: grossRevenue || "",
      inventory: inventory || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: EditDealFormSchemaType) {
    startTransition(async () => {
      console.log("values", values);
      const response = await EditDealFromFirebase(dealCollection,values, id);
      if (response.type === "success") {
        toast({
          title: `Deal Edit successfully`,
          description: `Deal Edit successfully from the collection from ${dealCollection}`,
      
        });
      }

      if (response.type === "error") {
        toast({
          title: "Error saving deal",
          description: "Error saving deal",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your deal title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="first_name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="last_name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="direct_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direct Phone</FormLabel>
              <FormControl>
                <Input placeholder="direct_phone..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="WashingtonDC..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ebitda"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ebitda</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grossRevenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gross Revenue</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inventory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inventory</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="work_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Phone</FormLabel>
              <FormControl>
                <Input placeholder="work_phone..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Healthcare, Aerospace...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deal Approved Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Deal Approved by AI Model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="revenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Revenue</FormLabel>
              <FormControl>
                <Input placeholder="$200000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="under_contract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Under Contract</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Deal Under Contract..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deal Link</FormLabel>
              <FormControl>
                <Input placeholder="name...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="asking_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asking Price</FormLabel>
              <FormControl>
                <Input placeholder="asking_price...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="listing_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Code</FormLabel>
              <FormControl>
                <Input placeholder="listing_code...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="main_content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teaser</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="deal teaser....."
                    {...field}
                    rows={15}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Screening Explanation</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="screening explanation....."
                    {...field}
                    rows={15}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Editing..." : "Edit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditDealForm;
