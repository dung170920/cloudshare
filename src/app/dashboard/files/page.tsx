import Image from "next/image";
import UploadFile from "./_components/upload-file";

export default function FilesPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl flex-1">Files</h1>
        <UploadFile />
      </div>
      <div
        className="flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed shadow-sm"
      >
        <Image src={'/add_file.svg'} height={250} width={250} alt="" />
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no files
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start sharing as soon as you upload a file.
          </p>
        </div>
      </div>
    </>
  );
}