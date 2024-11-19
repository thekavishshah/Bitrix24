"use client";

import React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Box,
  FileText,
  BarChart2,
  PlusCircle,
  User,
  LogIn,
  FileQuestion,
  FileTerminal,
  Shield,
  ExternalLink,
  Hand,
  SendHorizonal,
  Forward,
} from "lucide-react";

const menuItems = [
  {
    category: "Deals",
    items: [
      { navLink: "/raw-deals", navTitle: "Raw Deals", icon: FileText },
      { navLink: "/new-deal", navTitle: "Create New Deal", icon: PlusCircle },
      { navLink: "/manual-deals", navTitle: "Manual Deals", icon: Hand },
      {
        navLink: "/published-deals",
        navTitle: "Published Deals",
        icon: BarChart2,
      },
      {
        navLink: "/inferred-deals",
        navTitle: "Inferred Deals",
        icon: FileText,
      },
      { navLink: "/infer", navTitle: "Infer New Deal", icon: PlusCircle },
    ],
  },
  {
    catgeory: "Bitrix",
    items: [
      {
        navLink: "/publish",
        navTitle: "Publish to Bitrix",
        icon: SendHorizonal,
        external: false,
      },
      {
        navLink: "/published-deals",
        navTitle: "Published Deals",
        icon: Forward,
        external: false,
      },
    ],
  },
  {
    category: "Questionnaires",
    items: [
      {
        navLink: "/questionnaires",
        navTitle: "View Questionnaires",
        icon: LogIn,
      },
      { navLink: "/profile", navTitle: "Upload Questionnaire", icon: User },
    ],
  },
  {
    category: "User",
    items: [
      { navLink: "/login", navTitle: "Login", icon: LogIn },
      { navLink: "/profile", navTitle: "Profile", icon: User },
    ],
  },
  {
    category: "Information",
    items: [
      {
        navLink: "/getting-started",
        navTitle: "Getting Started",
        icon: FileQuestion,
      },
      {
        navLink: "/terms-of-service",
        navTitle: "Terms of Service",
        icon: FileTerminal,
      },
      { navLink: "/privacy-policy", navTitle: "Privacy Policy", icon: Shield },
    ],
  },
  {
    category: "External Links",
    items: [
      {
        navLink: "https://bitrix24.com",
        navTitle: "Bitrix24",
        icon: ExternalLink,
        external: true,
      },
      {
        navLink: "/publish-to-bitrix",
        navTitle: "Publish New Deal to Bitrix",
        icon: ExternalLink,
      },
    ],
  },
];

export default function MenuDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all hover:shadow-xl"
        >
          <Box className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Menu</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          {menuItems.map((category, index) => (
            <div key={index} className="mb-6">
              <h3 className="mb-2 text-lg font-semibold text-muted-foreground">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.navLink}
                    className="flex items-center rounded-lg p-3 text-sm transition-colors hover:bg-muted"
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-primary" />
                    <span>{item.navTitle}</span>
                  </Link>
                ))}
              </div>
              {index < menuItems.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
