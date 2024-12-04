import PreviousPageButton from "@/components/PreviousPageButton";
import ScreenDealComponent from "@/components/ScreenDealComponent";
import prismaDB from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

type Params = Promise<{ uid: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { uid } = await props.params;

  try {
    const fetchedDeal = await prismaDB.deal.findUnique({
      where: {
        id: uid,
      },
    });

    return {
      title: `Screen ${fetchedDeal?.dealCaption}` || "Dark Alpha Capital",
      description: `Screen ${fetchedDeal?.dealCaption} deal`,
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist",
    };
  }
}

const ScreenManualDealPage = async (props: { params: Params }) => {
  const { uid } = await props.params;

  const fetchedDeal = await prismaDB.deal.findUnique({
    where: {
      id: uid,
    },
  });

  if (!fetchedDeal) {
    return (
      <section className="mt-10 text-center text-xl">Deal not found</section>
    );
  }

  const {
    id,
    firstName,
    lastName,
    workPhone,
    revenue,
    ebitda,
    title,
    sourceWebsite,
    brokerage,
    dealCaption,
    companyLocation,
    industry,
    ebitdaMargin,
    askingPrice,
    grossRevenue,
    dealType,
  } = fetchedDeal;

  return (
    <section className="block-space relative">
      <div className="absolute left-8 top-6">
        <PreviousPageButton />
      </div>
      <div className="narrow-container mb-8 md:mb-10 lg:mb-12">
        <h1 className="mb-4 text-center text-4xl font-bold">
          Screen Deal: {title}
        </h1>
        <ScreenDealComponent dealId={uid} dealType={dealType} />
      </div>
    </section>
  );
};

export default ScreenManualDealPage;
