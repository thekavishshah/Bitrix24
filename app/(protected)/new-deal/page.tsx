import React from "react";

import { Bot } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreateNewDealForm from "@/components/forms/new-deal-form";

const NewDealPage = () => {
  return (
    <section className="big-container block-space">
      <div className="mb-6 text-center">
        <h1>Add New Deal</h1>
        <p>
          Add a new Deal to the Database by bulk importing or adding it manually
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  lg:gap-8">
        <div className="space-y-2">
          <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Bulk Import Deals
            </h2>
            <p className="text-gray-600 mb-2 text-center">
              Quickly import multiple deals at once by uploading a file. Save
              time and effort with bulk import functionality.
            </p>

            <p className="text-red-600 mb-6 text-center">
              keep in mind that the excel sheet should be in a specific format
              for bulk upload
            </p>
            {/* <div className="flex justify-center">
              <BulkUploadDealsDialog />
            </div> */}
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Infer Deal
            </h2>
            <p className="text-gray-600 mb-2 text-center">
              Enter the description of a deal and use AI to generate the
              required format for the deal, save it to the database and then
              scrape it
            </p>

            <p className="text-red-600 mb-6 text-center">
              Note:- Double check the output given by AI and save it accordingly
            </p>
            <div className="flex justify-center">
              <Button className="w-full" asChild>
                <Link href="/infer">
                  <Bot className="h-4 w-4 mr-2" /> Infer Deal
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4">Add Deal Manually</h2>
          <CreateNewDealForm />
        </div>
      </div>
    </section>
  );
};

export default NewDealPage;
