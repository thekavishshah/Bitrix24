import DeleteScreenerDialog from "@/components/Dialogs/delete-screen-dialog";
import BaseLineUploadForm from "@/components/forms/baseline-upload-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchQuestionnaires } from "@/lib/firebase/db";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Screening Baseline",
  description: "Upload questionaire against which you want to screen the deals",
};

const ScreeningBaselinePage = async () => {
  const dealScreeningQuestionnaires = await fetchQuestionnaires();

  return (
    <section className="block-space big-container">
      <div className="lg:2 mb-4 text-center md:mb-8">
        <h1>Screening Baseline</h1>
        <p>Upload questionaire against which you want to screen the deals</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h4 className="mb-4">Total {dealScreeningQuestionnaires.length}</h4>
          <div className="space-y-4">
            {dealScreeningQuestionnaires.map(
              ({ title, version, purpose, author, url, id }, index) => (
                <div
                  key={index}
                  className="relative mb-4 rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
                >
                  <DeleteScreenerDialog url={url} dealScreenerId={id} />
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {index + 1}. {title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Version:</span>{" "}
                    {version || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Author:</span>{" "}
                    {author || "N/A"}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">
                    <span className="font-medium">Purpose:</span>{" "}
                    {purpose || "N/A"}
                  </p>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      View Document
                    </a>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
        <Card className="">
          <CardHeader>
            <CardTitle>Upload Form</CardTitle>
          </CardHeader>
          <CardContent>
            <BaseLineUploadForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ScreeningBaselinePage;
