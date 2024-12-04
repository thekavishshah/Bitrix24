"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { TransformedDeal } from "@/app/types";
import { useToast } from "@/hooks/use-toast";
import { set } from "date-fns";
import { Deal } from "@prisma/client";
import BulkUploadDealsToDB from "@/app/actions/bulk-upload-deal";

type SheetDeal = {
  "Brokerage ": string; // The brokerage company name
  "First Name"?: string; // First name of the contact (optional in some rows)
  "Last Name"?: string; // Last name of the contact (optional in some rows)
  "Work Phone"?: string; // Work phone number (optional in some rows)
  Email?: string;
  "LinkedIn URL"?: string;
  "Deal Caption": string; // Caption or description of the deal
  Revenue: number; // Revenue associated with the deal
  EBITDA: number; // Earnings before interest, taxes, depreciation, and amortization
  "EBITDA Margin": number; // EBITDA margin as a decimal
  Industry: string; // Industry category of the deal
  "Source Website": string; // URL of the source listing for the deal
  Upload: "Y" | "N"; // Whether to upload the deal (Y for Yes, N for No)
  UploadOnCRM: "Yes" | "No"; // Whether the deal is uploaded on the CRM
  "Company Location"?: string; // Location of the company (optional in some rows)
};

export function BulkImportDialog() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [deals, setDeals] = useState<SheetDeal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "text/csv" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".csv")
      ) {
        setFile(file);
        setError(null);
        parseFile(file);
      } else {
        setError("Please upload a valid Excel (.xlsx) or CSV file.");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const parseFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as SheetDeal[];
      setDeals(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const transformDeals = (deals: SheetDeal[]): TransformedDeal[] => {
    console.log("transforming deals........");
    return deals.map((deal) => ({
      brokerage: deal["Brokerage "],
      firstName: deal["First Name"],
      lastName: deal["Last Name"],
      linkedinUrl: deal["LinkedIn URL"],
      email: deal.Email,
      workPhone: deal["Work Phone"],
      dealCaption: deal["Deal Caption"],
      revenue: deal.Revenue,
      ebitda: deal.EBITDA,
      ebitdaMargin: deal["EBITDA Margin"],
      industry: deal.Industry,
      sourceWebsite: deal["Source Website"],
      companyLocation: deal["Company Location"],
    }));
  };

  const handleUpload = async () => {
    if (!file || deals.length === 0) return;

    setUploading(true);

    console.log("Deals to upload", deals);

    // Transform the deals into the required format
    const formattedDeals = transformDeals(deals);

    console.log("Formatted Deals to Upload", formattedDeals);

    const response = await BulkUploadDealsToDB(formattedDeals);

    if (response.type === "success") {
      setSuccess(response.message);
      toast({
        title: "Deals uploaded successfully",
        description: response.message,
      });
    }

    if (response.type === "error") {
      setError(response.message);
      toast({
        title: "Error uploading deals ",
        variant: "destructive",
        description: response.message,
      });
    }

    if (response.type === "partial_success") {
      setError(response.message);
      toast({
        title: "Partial Deals Uploaded",
        variant: "destructive",
        description: response.message,
      });
    }

    setUploading(false);
    setUploadComplete(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Import Deals
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Bulk Import Deals</DialogTitle>
          </DialogHeader>
          <ScrollArea>
            <div className="grid gap-4 py-4">
              <div
                {...getRootProps()}
                className={cn(
                  "cursor-pointer rounded-lg border-2 border-dashed p-6 text-center",
                  isDragActive ? "border-primary" : "border-muted-foreground",
                )}
              >
                <input {...getInputProps()} />
                {file ? (
                  <div className="flex items-center justify-center">
                    <File className="mr-2 h-6 w-6" />
                    <span>{file.name}</span>
                  </div>
                ) : (
                  <p>
                    Drag & drop an Excel or CSV file here, or click to select
                    one
                  </p>
                )}
              </div>
              {success && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  <span>{success}</span>
                </div>
              )}
              {error && (
                <div className="flex items-center text-destructive">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              {deals.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {deals.length} deals found in the file
                </p>
              )}
              {uploading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
            </div>
          </ScrollArea>
          <Button
            onClick={handleUpload}
            disabled={!file || deals.length === 0 || uploading}
          >
            {uploading ? "Uploading..." : "Upload Deals"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
