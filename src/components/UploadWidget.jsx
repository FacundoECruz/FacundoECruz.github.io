import { useEffect, useRef } from "react";
import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
function UploadWidget({ setImageUrl }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dfknsvqer",
        uploadPreset: "oallf3bt",
      },
      function (error, res) {
        if (res.info.url) {
          setImageUrl(res.info.url);
        }
      }
    );
  }, [setImageUrl]);

  return (
    <Button variant="contained" onClick={() => widgetRef.current.open()}>
      Subir Imagen
    </Button>
  );
}

export default UploadWidget;
