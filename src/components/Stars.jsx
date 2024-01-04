/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";

function StarRating({ value, starWidth }) {
  const stars = [];

  for (let i = 0; i < value; i++) {
    stars.push(<StarIcon key={i} sx={{width: starWidth, color: "gold"}}/>);
  }

  return <>{stars}</>;
}

export default StarRating;