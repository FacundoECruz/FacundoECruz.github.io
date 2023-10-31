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
import AchievementsBox from "../achievements/AchievementsBox.jsx";


function PlayerCard({
  image,
  username,
  winned,
  achievements,
  played,
  average,
  width,
  margin,
  onClick,
}) {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const defaultUserImage =
    "https://res.cloudinary.com/dfknsvqer/image/upload/v1689874326/empty_user_jyenqo.jpg";

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
        image={image === "" ? defaultUserImage : image}
        title={username}
        onClick={onClick}
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
          <AchievementsBox data={achievements} />
          <Box sx={{display: "flex" }}>
            <Typography>Jugadas: </Typography>
            <Typography sx={{color: "yellow", ml: "4px"}}>{played}</Typography>
          </Box>
          <Box sx={{display: "flex" }}>
            <Typography>Prom: </Typography>
            <Typography sx={{color: "yellow", ml: "4px"}}>{average}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
export default PlayerCard;
