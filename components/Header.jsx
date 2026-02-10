'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center justify-center">
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
        </Link>
      </div>
      {isSignedIn ? (
        <div className="flex items-center justify-center gap-5">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div className="flex items-center">
          <Link href="/dashboard">
            <Button variant="default">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
