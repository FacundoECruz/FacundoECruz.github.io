/* eslint-disable react/prop-types */
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function LostCircle({ value }) {
  const circles = [];

  for (let i = 0; i < value; i++) {
    circles.push(<HighlightOffIcon key={i} sx={{width: "15px", color: "red"}}/>);
  }

  return <>{circles}</>;
}

export default LostCircle;