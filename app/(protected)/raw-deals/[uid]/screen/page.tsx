import PreviousPageButton from "@/components/PreviousPageButton";
import ScreenDealComponent from "@/components/ScreenDealComponent";
import prismaDB from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import React from "react";
import { Badge } from "@/components/ui/badge";

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
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <PreviousPageButton />
          <h1 className="text-2xl font-bold">Deal Screening</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Deal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Deal Information</span>
                <Badge variant="outline">{fetchedDeal.brokerage}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {fetchedDeal.dealCaption}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {fetchedDeal.firstName} {fetchedDeal.lastName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-muted-foreground">{fetchedDeal.email}</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">
                    {fetchedDeal.workPhone}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Revenue</p>
                  <p className="text-muted-foreground">
                    ${fetchedDeal.revenue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-muted-foreground">
                    {fetchedDeal.linkedinUrl ? (
                      <a
                        href={fetchedDeal.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Profile
                      </a>
                    ) : (
                      "Not available"
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Screening Component */}
          <div className="md:col-span-2">
            <ScreenDealComponent deal={fetchedDeal} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenDealPage;
