import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import { UserButton } from "@clerk/nextjs";
import NavLink from "./nav-link";
import Icon from "@/components/icon";

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
          <NavLink isMobile />
        </SheetContent>
      </Sheet>
      <div className="ms-auto">
        <UserButton afterSignOutUrl="/"
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