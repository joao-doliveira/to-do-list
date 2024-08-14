"use client";

import CreateToDoButton from "@/components/CreateToDoButton";
import NotebookIllustration from "@/components/illustrations/NotebookIllustration";
import { buttonVariants } from "@/components/ui/button";
import { H1 } from "@/components/ui/H1";
import { useUser } from "@clerk/nextjs";
import { ArrowUp, LogInIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <div className="p-8 flex flex-col items-center">
      {isSignedIn ? (
        <div className="w-full flex flex-col gap-5 md:flex-row md:justify-between">
          <H1>Keeping up with your to dos!</H1>
          <CreateToDoButton />
        </div>
      ) : (
        <div className="w-full max-w-[480px] flex flex-col items-center gap-8 md:gap-16">
          <H1>Keeping up with your to dos!</H1>
          <div className="w-full flex flex-col items-center gap-2 md:gap-4">
            <p>Please sign up / log in to manage your to dos (:</p>
            <div className="w-full flex flex-col gap-4 md:flex-row">
              <Link
                href="/signup"
                className={buttonVariants({
                  variant: "defaultOutline",
                  width: "full",
                })}
              >
                <ArrowUp className="pr-2" />
                Sign up
              </Link>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "default",
                  width: "full",
                })}
              >
                <LogInIcon className="pr-2" />
                Log in
              </Link>
            </div>
          </div>
          <NotebookIllustration />
        </div>
      )}
    </div>
  );
}
