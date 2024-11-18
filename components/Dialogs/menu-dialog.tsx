"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiUpload, FiHelpCircle } from "react-icons/fi";

import React from "react";
import { Button } from "../ui/button";
import { Box } from "lucide-react";
import Link from "next/link";

const secondaryNav = [
  {
    navLink: "screening-baseline",
    navTitle: "Screening Baseline",
    icon: FiUpload, // Icon for Screening Baseline
  },
  {
    navLink: "screening-questions",
    navTitle: "Screening Questions",
    icon: FiHelpCircle, // Icon for Screening Questions
  },
];

const MenuDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="fixed bottom-12 right-12 z-50 rounded-full bg-gray-100 p-3 shadow-lg transition duration-200 hover:bg-gray-200 hover:shadow-xl"
        >
          <Box />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Navigation</DialogTitle>
          <DialogDescription>
            Quickly Navigate among secondary routes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {secondaryNav.map((nav, index) => (
            <Link
              key={index}
              href={`/${nav.navLink}`}
              className="flex w-full items-center rounded-lg p-3 text-gray-700 shadow-sm transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900"
            >
              <nav.icon className="mr-3 h-5 w-5 text-gray-500 transition duration-300 hover:text-gray-700" />
              <span className="font-medium">{nav.navTitle}</span>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuDialog;
