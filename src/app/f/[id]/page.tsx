import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

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
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl flex-1">File Sharing</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-6">
        <Image src={file?.url || ''} height={1000} width={1000} alt="" className="w-full rounded" />
      </div>
    </>
  );
}