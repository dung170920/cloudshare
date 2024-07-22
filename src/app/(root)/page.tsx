import { Button } from "@/components/ui";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="grid w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5">
      <div className="flex flex-col justify-center col-span-1 text-center lg:text-start">
        <div className="flex items-center justify-center mb-4 lg:justify-normal">
          <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">File Sharing</h4>
        </div>
        <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-foreground">Save and share your files</h1>
        <p className="mb-6 text-base font-normal leading-7 lg:w-3/4 text-foreground">
          Drag and drop your files directly to the cloud. Quickly and easily share files with anyone, anywhere, on any device.
        </p>
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <Button size={"lg"}>Get started now</Button>
          <Button size={"lg"} variant={'ghost'}>Learn more</Button>
        </div>
      </div>
      <div className="items-center justify-end hidden col-span-1 md:flex">
        <Image loading="lazy" className="w-4/5 rounded-md" width={1000} height={1000} src="/sharing_file.svg" alt="header image" />
      </div>
    </div>
  );
}
