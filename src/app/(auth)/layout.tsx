import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          {children}
        </div>
      </div>
      <div className="hidden bg-muted lg:flex items-center justify-center flex-col gap-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
          <span className="hidden font-bold lg:inline-block text-lg">CloudShare</span>
        </Link>
        <Image
          src="/auth.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="w-3/5 dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default AuthLayout;