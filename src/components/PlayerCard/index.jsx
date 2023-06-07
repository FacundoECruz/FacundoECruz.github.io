/* eslint-disable react/prop-types */
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function PlayerCard({image, username}) {
  return (
    <Card sx={{ maxWidth: 150, mx: 1}}>
      <CardMedia
        image={image}
        title={username}
        sx={{ height: 150, width: 150}}
      />
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h6">
          {username}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
