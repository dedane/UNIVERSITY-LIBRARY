'use client';

import config from '@/lib/config'
import Image from 'next/image';
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import { useRef, useState } from 'react';
import { toast } from '@/hooks/use-toast';
const {
    env: {
      imagekit: { publicKey, urlEndpoint},
    },
  } = config;

const authenticatior = async() => {
    try{
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)
        if( !response.ok){
            const errorText = await response.text()

            throw new Error( `Request failed with status ${response.status}: ${errorText}`)
        }
        const data = await response.json()
        const { signature, expire, token} = data;

        return{
            signature, expire, token
        }
    }
    catch(error: any){
        throw new Error( 'Authentication request failed')
    }
}
const ImageUpload = async({onFileChange,}:{onFileChange: (filePath: string) => void; }) => {
    const ikUploadRef = useRef(null)
    const [file, setFile] = useState<{filePath: string} | null>(null)

    const onError = (error: any)=> {
        console.log(error)
        toast ({
            title:" Image Upload Failed",
            description: 'Your Image could not be uploaded try again',
            variant: 'destructive'
        })

    }
    const onSuccess = (res: any)=> {
        setFile(res)
        onFileChange(res.filePath)

        toast ({
            title:"Successfull Image Upload",
            description: `${res.filePath} uploaded successfully!`,
        })
    }
    
  return (
    <ImageKitProvider 
        publicKey={publicKey}
        urlEndpoint={urlEndpoint} 
        authenticator={authenticatior}>
        <IKUpload 
            className='hidden'
            ref={ikUploadRef}
            onError={onError}
            onSuccess={onSuccess}
            fileName='test-upload.png'/>
        <button className='upload-btn' onClick={(e) => {
            e.preventDefault();

            if (ikUploadRef.current) {
                // @ts-ignore
                ikUploadRef.current?.click();
            }
        }}>
            <Image 
                src="/icons/upload.svg" 
                alt='upload-icon' 
                width={20} 
                height={20} 
                className='object-contain' />
            <p className='text-base text-light-100'> Upload a file</p>
            {file && <p className='upload-filename'>{file.filePath}</p>}
        </button>

        {file && (
            <IKImage 
                alt={file.filePath}
                path={file.filePath}
                width={500}
                height={500}
                />
        )}

        </ImageKitProvider>
  )
}

export default ImageUpload