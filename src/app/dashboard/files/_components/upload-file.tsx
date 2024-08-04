"use client"
import Icon from '@/components/icon'
import { Alert, AlertDescription, AlertTitle, Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Progress } from '@/components/ui'
import { db, storage } from '@/config/firebase'
import { fSize, randomUrl } from '@/lib/utils'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Icon as FileIcon } from 'react-extension-icons'
import { doc, setDoc } from "firebase/firestore"
import { useUser } from '@clerk/nextjs'

const UploadFile = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const { user } = useUser();

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${files[0].name}`);

    files.forEach((f) => {
      const uploadTask = uploadBytesResumable(storageRef, f, { contentType: f.type });
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [f.name]: progress
        }));
      }, (error) => {
        console.log(error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setFiles([]);
          setUploadProgress({});
          setOpen(false);
          const docId = randomUrl();
          await setDoc(doc(db, "files", docId), {
            id: docId,
            name: f.name,
            size: f.size,
            type: f.type,
            url: downloadURL,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            password: '',
            shortUrl: process.env.NEXT_PUBLIC_BASE_URL + '/files/' + docId
          });
        });
      })
    });
  };

  const {
    getRootProps,
    getInputProps,
    fileRejections
  } = useDropzone({ multiple: true, accept: { 'image/*': [] }, maxSize: 2 * 1000 * 1000, onDrop: handleDrop });

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Icon icon='upload' className='mr-2' size={20} /> Upload file
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload file</DialogTitle>
          </DialogHeader>
          <div className="w-full rounded bg-muted h-[200px] border-2 border-muted-foreground/40 border-dashed flex flex-col items-center justify-center cursor-pointer" {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon icon='solid-upload-alt' size={64} className='text-primary' />
            <h5 className='text-lg font-semibold mt-2 text-primary'>Drop or click to upload files</h5>
            <p className='text-sm text-foreground/50 mt-1'>Only accept image files. Max size 2MB</p>
          </div>
          {fileRejections.map(({ file }) => {
            return (
              <Alert variant="destructive" key={file.name}>
                <Icon icon='solid-exclamation-circle' />
                <AlertTitle>{fileRejections[0].file.name} - {fileRejections[0].file.size}</AlertTitle>
                {fileRejections[0].errors.map((error) => (
                  <AlertDescription key={error.code} className='text-xs ml-2'>
                    - {error.message}
                  </AlertDescription>
                ))}
              </Alert>
            );
          })}
          <div className='my-6 flex flex-col gap-2'>
            {files.map((file, index) => {
              return (
                <div key={index} className="flex flex-col px-3 py-2 rounded border border-border gap-3">
                  <div className='flex items-center gap-2'>
                    <FileIcon extension={file.name.split('.').pop() || ''} variant="color" size={48} />
                    <div className="flex flex-col gap-1 flex-grow">
                      <span className='text-sm font-semibold'>{file.name}</span>
                      <span className='text-xs text-neutral-500'>{fSize(file.size)}</span>
                    </div>
                    <Button variant={'ghost'} size={'icon'} onClick={() => handleRemoveFile(file)}>
                      <Icon icon='solid-times' size={16} />
                    </Button>
                  </div>
                  {uploadProgress[file.name] > 0 && (
                    <div className="flex gap-4 items-center">
                      <Progress value={uploadProgress[file.name]} className='h-1 bg-muted' />
                      <span className='text-xs text-neutral-500'>{uploadProgress[file.name]}%</span>
                    </div>)}
                </div>
              );
            })}
          </div>
          <DialogFooter className="ml-auto">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleUpload}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UploadFile