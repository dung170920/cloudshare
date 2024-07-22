import { Button, Sheet, SheetContent, SheetTrigger } from '@/components/ui'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <>
      <header className="sticky top-0 flex h-20 items-center gap-4 bg-background px-4 md:px-6">
        <nav className="lg:gap-12 gap-6 hidden md:flex items-center flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
            <span className="hidden font-bold lg:inline-block text-lg">CloudShare</span>
          </Link>
          <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              {/* <Menu className="h-5 w-5" /> */}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
                <span className="">CloudShare</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <SignedOut>
            <SignInButton><Button>Sign In</Button></SignInButton>
          </SignedOut>
          <SignedIn>
            <Button asChild><Link href={"/dashboard"}>Go to Dashboard</Link></Button>
          </SignedIn>
        </div>
      </header>
    </>
  )
}
