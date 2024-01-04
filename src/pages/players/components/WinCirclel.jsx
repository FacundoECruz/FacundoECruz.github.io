/* eslint-disable react/prop-types */
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function WinCircle({ value }) {
  const circles = [];

  for (let i = 0; i < value; i++) {
    circles.push(<CheckCircleOutlineIcon key={i} sx={{width: "15px", color: "green"}}/>);
  }

  return <>{circles}</>;
}

export default WinCircle;