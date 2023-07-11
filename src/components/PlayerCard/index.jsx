/* eslint-disable react/prop-types */
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import Stars from "../Stars.jsx";

function PlayerCard({ image, username, winned, stats, width, margin }) {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Card
      sx={{
        maxWidth: isMdScreen ? "120px" : "150px",
        width: width,
        margin: margin,
        bgcolor: "blue",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translate(-5px, -5px)",
        },
      }}
    >
      <CardMedia
        image={image}
        title={username}
        sx={{
          height: "150px",
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 1,
            whiteSpace: "nowrap",
            fontSize: username.length > 15 ? "12px" : "inherit",
          }}
        >
          {username}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Stars value={winned} />
          </Box>
          {stats.map((stat, index) => (
            <Typography key={index} variant="body2" sx={{ fontWeight: "bold" }}>
              {stat.label}: {isNaN(stat.value) ? "-" : stat.value}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
export default PlayerCard;
