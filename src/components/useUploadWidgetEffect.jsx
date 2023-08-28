import { useEffect } from "react";

export function useUploadWidgetEffect(cloudinaryRef, widgetRef, setImageUrl){
  
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
  }, [cloudinaryRef, setImageUrl, widgetRef]);
}