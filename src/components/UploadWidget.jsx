// eslint-disable-next-line no-unused-vars
import React from "react";
import { useRef } from "react";
import { IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function UploadWidget({ setImageUrl, cloudinary = window.cloudinary }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = cloudinary;
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
  }, [cloudinary, cloudinaryRef, setImageUrl, widgetRef]);

  return (
    <IconButton
      data-testid="upload-widget"
      sx={{
        position: "absolute",
        bottom: "4px",
        right: "4px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
      onClick={() => widgetRef.current.open()}
    >
      <CameraAltIcon />
    </IconButton>
  );
}

export default UploadWidget;
