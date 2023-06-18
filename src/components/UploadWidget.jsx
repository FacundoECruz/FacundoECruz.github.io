import { useEffect, useRef } from 'react';
import { Button } from '@mui/material';

function UploadWidget() {

  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "dfknsvqer",
      uploadPreset: "oallf3bt",
    })
  }, [])

  return (
    <Button variant="contained" onClick={() => widgetRef.current.open()}>Subir Imagen</Button>
  )

  
}

export default UploadWidget;