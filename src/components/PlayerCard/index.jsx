/* eslint-disable react/prop-types */
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function PlayerCard({image, username, level}) {
  return (
    <Card>
      <CardMedia
        image={image}
        title={username}
        sx={{ height: 250, width: 250 }}
      />
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          {username}
        </Typography>
        <Typography variant="h5">{level}</Typography>
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
