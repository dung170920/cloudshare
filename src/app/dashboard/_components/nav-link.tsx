"use client"
import Icon from '@/components/icon'
import { navLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

type Props = {
  isMobile?: boolean
}

const NavLink = ({ isMobile = false }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex-1">
        <nav className={cn("grid items-start text-sm font-medium", { "px-2 lg:px-4 lg:py-4": !isMobile })}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn("flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary", {
                "mx-[-0.65rem]": isMobile,
                "text-primary bg-primary/10": pathname.startsWith(link.path),
              })}
            >
              <Icon icon={pathname.startsWith(link.path) ? link.activeIcon : link.icon} />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className={cn("mt-auto", { 'p-4': !isMobile })}>
        <Card>
          <CardHeader className={cn("", { "p-2 pt-0 md:p-4": !isMobile })}>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support
              team.
            </CardDescription>
          </CardHeader>
          <CardContent className={cn("", { "p-2 pt-0 md:p-4 md:pt-0": !isMobile })}>
            <Button size="sm" className="w-full">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default NavLink