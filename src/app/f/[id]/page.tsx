import { Button } from "@/components/ui";
import { db } from "@/config/firebase";
import { fSize } from "@/lib/utils";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

type Params = { params: { id: string } }

const getFile = async (id: string) => {
  const ref = doc(db, "files", id);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export default async function FileDetailPage({ params }: Params) {
  const file = await getFile(params.id);

  return (
    <div className="h-screen w-full bg-secondary flex flex-col gap-4 justify-center items-center">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
        <span className="hidden font-bold lg:inline-block text-lg">CloudShare</span>
      </Link>
      <div className="">
        <Image src={file?.url || ''} height={1000} width={1000} alt="" className="w-full rounded" />
      </div>
      <div className="text-center flex flex-col gap-3 mt-4">
        <h1 className="text-lg font-semibold md:text-xl flex-1">{file?.name || ''}</h1>
        <div className="flex items-center">
          <p className="text-sm font-medium flex-1">{fSize(file?.size || 0)} - {file?.type || ''}</p>
          {/* <Button variant={"link"}>Download</Button> */}
        </div>

      </div>
    </div>
  );
}