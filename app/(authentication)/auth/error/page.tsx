import React, { Suspense } from "react";
import ErrorCard from "./ErrorCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthErrorPage = async () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full px-8 py-12 space-y-6">
        <h2 className="">Welcome to Bitrix Deal Sourcing</h2>
        <p className="text-sm text-gray-600">
          An Error Occurred. Please try again.
        </p>

        <p className="text-xs text-gray-500 ">
          Only authorized members of the organization can access this platform.
        </p>

        <Suspense
          fallback={
            <div>
              <div>Loading Error Info.....</div>
            </div>
          }
        >
          <ErrorCard />
        </Suspense>
        <Button asChild className="block w-fit">
          <Link href="/auth/login">Try Again</Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthErrorPage;
