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
    <section className="block-space big-container">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <PreviousPageButton />
          <h2 className="mb-4">Screen this Deal</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic cumque
            atque sed perspiciatis vero a, est optio magnam nulla ad doloremque
            incidunt quasi ipsa repellendus voluptate modi provident ut
            obcaecati?
          </p>
        </div>
        <ScreenDealComponent dealId={uid} dealType={dealType} />
      </div>
    </section>
  );
};

export default ScreenManualDealPage;
