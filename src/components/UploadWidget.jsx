// eslint-disable-next-line no-unused-vars
import React from "react";
import { useRef as _useRef } from "react";
import { IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useUploadWidgetEffect } from "./useUploadWidgetEffect";

// eslint-disable-next-line react/prop-types
function UploadWidget({ setImageUrl, useRef = _useRef }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useUploadWidgetEffect(cloudinaryRef, widgetRef, setImageUrl)

  return (
    <IconButton
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
