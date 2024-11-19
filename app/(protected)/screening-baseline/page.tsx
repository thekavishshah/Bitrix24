import QuestionnaireCard from "@/components/cards/questionnaire-card";
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
        <h1>Upload </h1>
        <p>Upload questionaire against which you want to screen the deals</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h4 className="mb-4">Total {dealScreeningQuestionnaires.length}</h4>
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
