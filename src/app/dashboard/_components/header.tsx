import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import { UserButton } from "@clerk/nextjs";
import NavLink from "./nav-link";
import Icon from "@/components/icon";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Icon icon="menu" size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
          </Link>
          <NavLink isMobile />
        </SheetContent>
      </Sheet>
      <div className="ms-auto">
        <UserButton
          afterSwitchSessionUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: "size-8",
            },
          }} />
      </div>

    </header>
  )
}

export default Header