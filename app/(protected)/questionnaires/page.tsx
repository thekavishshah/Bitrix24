import QuestionnaireCard from "@/components/cards/questionnaire-card";
import { fetchQuestionnaires } from "@/lib/firebase/db";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Questionnaires",
  description:
    "View all the different questionnaires we have available for you",
};

const QuestionnairePage = async () => {
  const dealScreeningQuestionnaires = await fetchQuestionnaires();
  return (
    <div>
      <div className="space-y-4">
        {dealScreeningQuestionnaires.map(
          ({ title, version, purpose, author, url, id }, index) => (
            <QuestionnaireCard
              key={index}
              title={title}
              purpose={purpose}
              version={version}
              url={url}
              author={author}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default QuestionnairePage;
