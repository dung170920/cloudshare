"use client"
import Icon from '@/components/icon'
import { Alert, AlertDescription, AlertTitle, Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui'
import { app } from '@/config/firebase'
import { fSize } from '@/lib/utils'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const UploadFile = () => {
  const [files, setFiles] = useState<(File)[]>([]);
  const storage = getStorage(app);

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
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, (error) => {
        console.log(error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
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
      <Dialog>
        <DialogTrigger asChild>
          <Button><Icon icon='upload' className='mr-2' size={20} /> Upload file</Button>
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
                <div
                  key={index}
                  className='flex items-center gap-2 px-3 py-2 rounded border border-border'
                >
                  <Icon icon='solid-file-text' size={36} />
                  <div className="flex flex-col gap-1 flex-grow">
                    <span className='text-sm font-semibold'>{file.name}</span>
                    <span className='text-xs text-neutral-500'>{fSize(file.size)}</span>
                  </div>
                  <Button variant={'ghost'} size={'icon'} onClick={() => handleRemoveFile(file)}>
                    <Icon icon='solid-times' size={16} />
                  </Button>
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
            <DialogClose asChild>
              <Button type="button" onClick={handleUpload}>
                Upload
              </Button>
            </DialogClose>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UploadFile