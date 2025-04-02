import PreviousPageButton from "@/components/PreviousPageButton";
import ScreenDealComponent from "@/components/ScreenDealComponent";
import prismaDB from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import React from "react";

type Params = Promise<{ uid: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { uid } = await props.params;

  try {
    const fetchedDeal = await prismaDB.deal.findUnique({
      where: { id: uid },
      select: { dealCaption: true },
    });

    return {
      title: fetchedDeal?.dealCaption
        ? `Screen ${fetchedDeal.dealCaption}`
        : "Screen Deal",
      description: fetchedDeal?.dealCaption
        ? `Screen ${fetchedDeal.dealCaption} deal`
        : "Screen deal details",
    };
  } catch (error) {
    console.error("Error fetching deal metadata:", error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist",
    };
  }
}

const ScreenDealPage = async ({ params }: { params: Params }) => {
  const { uid } = await params;

  const fetchedDeal = await prismaDB.deal.findUnique({
    where: { id: uid },
    select: {
      id: true,
      dealType: true,
      dealCaption: true,
    },
  });

  if (!fetchedDeal) {
    return (
      <section className="container mx-auto px-4 py-8">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-red-500">
              Deal Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              The deal you are looking for does not exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="mt-4 text-2xl font-bold">
                Screen this Deal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Review and analyze this deal using our AI-powered screening
                tool. The system will evaluate key metrics, market conditions,
                and potential risks to provide comprehensive insights for
                decision making.
              </p>
              {fetchedDeal.dealCaption && (
                <p className="mt-4 font-medium">
                  Deal: {fetchedDeal.dealCaption}
                </p>
              )}
            </CardContent>
          </Card>

          <div className="md:col-span-1">
            <ScreenDealComponent
              dealId={fetchedDeal.id}
              dealType={fetchedDeal.dealType}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenDealPage;
