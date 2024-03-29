/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import UploadWidget from "../../components/UploadWidget";

const ImageWithChangeButton = ({ imageUrl, setImageUrl }) => {
  return (
    <Card sx={{ position: "relative", width: "25%" }}>
      <CardMedia
        component="img"
        height="150"
        image={imageUrl}
        alt="User Profile"
      />
      <UploadWidget setImageUrl={setImageUrl} />
    </Card>
  );
};

export {ImageWithChangeButton};
