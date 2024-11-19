"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import { liteClient as algoliasearch } from "algoliasearch/lite";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

type HeaderProps = {
  session: Session | null;
  classname?: string;
};

export const NavLinks = [
  { navlink: "/new-deal", navlabel: "New" },
  { navlink: "/raw-deals", navlabel: "Raw" },
  { navlink: "/published-deals", navlabel: "Published" },
  { navlink: "/manual-deals", navlabel: "Manual" },
  { navlink: "/inferred-deals", navlabel: "Inferred " },
  { navlink: "/infer", navlabel: "Infer" },
];

const Header = ({ classname, session }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-50 border-b bg-background px-2 py-2 md:px-4 lg:px-12",
          classname,
        )}
      >
        <nav aria-label="Main-navigation">
          <ul className="flex flex-col justify-between md:m-4 md:flex-row md:items-center md:rounded-xl">
            <div className="flex items-center justify-between">
              <NameLogo />
              <button
                aria-label="Open menu"
                className="block text-2xl text-black dark:text-white md:hidden"
                onClick={() => setIsOpen(true)}
              >
                <MdMenu />
              </button>
            </div>
            <div
              className={clsx(
                "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-black pr-4 pt-14 text-white transition-transform duration-300 ease-in-out md:hidden",
                isOpen ? "translate-x-0" : "translate-x-[100%]",
              )}
            >
              <button
                aria-label="Close menu"
                className="fixed right-4 top-3 block p-2 text-2xl text-white md:hidden"
                onClick={() => setIsOpen(false)}
              >
                <MdClose />
              </button>
              {NavLinks.map((item, index) => {
                return (
                  <Link
                    href={item.navlink}
                    key={index}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={clsx(
                      "",
                      pathname === item.navlink ? "underline" : "",
                    )}
                  >
                    {item.navlabel}
                  </Link>
                );
              })}
            </div>
            <DesktopMenu />
            {session ? <ProfileMenu session={session} /> : <AuthDialogNavs />}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

function NameLogo() {
  return (
    <div className="">
      <Link
        href="/"
        aria-label="Home page"
        className="text-mainC text-3xl font-bold md:text-4xl"
      >
        Deal Sourcing
      </Link>
    </div>
  );
}

function DesktopMenu() {
  const pathname = usePathname();
  return (
    <div className="hidden gap-8 md:flex md:items-center">
      {NavLinks.map((item, index) => {
        return (
          <Link
            href={item.navlink}
            key={index}
            className={clsx(
              "hover:text-mainC hover:decoration-mainC font-bold transition hover:underline hover:decoration-4 hover:underline-offset-8",
              pathname === item.navlink
                ? "text-mainC underline decoration-4 underline-offset-8"
                : "",
            )}
          >
            {item.navlabel}
          </Link>
        );
      })}
    </div>
  );
}

function AuthDialogNavs() {
  return (
    <div className="hidden space-x-4 md:flex md:items-center">
      <Link href={"/auth/login"}>Logout</Link>
    </div>
  );
}

function ProfileMenu({ session }: { session: Session }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={session.user?.image || "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-baseC flex items-center font-medium">
          Account <ChevronDown />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            router.push(`/profile/${session.user?.id}`);
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
