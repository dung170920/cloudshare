import Image from 'next/image'
import Link from 'next/link'
import NavLink from './nav-link'

export const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
            <span className="hidden font-bold lg:inline-block text-lg">CloudShare</span>
          </Link>
        </div>
        <NavLink />
      </div>
    </div>
  )
}
