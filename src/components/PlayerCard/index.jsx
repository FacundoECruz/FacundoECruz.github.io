/* eslint-disable react/prop-types */
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

function PlayerCard({ image, username, stats, width, margin }) {
  return (
    <Card sx={{ maxWidth: "200px", width: width, margin: margin, bgcolor: "blue" }}>
      <CardMedia image={image} title={username} sx={{ height: "150px;" }} />
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1, whiteSpace: "nowrap", fontSize: username.length > 15 ? "12px" : "inherit", }}>
          {username}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", }}>
          {stats.map((stat, index) => (
            <Typography key={index} variant="body2" sx={{ fontWeight: "bold" }}>
              {stat.label}: {stat.value}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
export default PlayerCard;
