/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { FastRewind } from "@mui/icons-material";
import { FastForwardSharp } from "@mui/icons-material";
import { PlayArrowSharp } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { VolumeUp } from "@mui/icons-material";
import { Fullscreen } from "@mui/icons-material";
import { PauseSharp } from "@mui/icons-material";
import { VolumeOff } from "@mui/icons-material";
import Popover from "@mui/material/Popover";
import "./ControlIcons.css";

const ControlIcons = ({
  playAndPause,
  playing,
  rewind,
  fastForward,
  played,
  onSeek,
  onSeekMouseUp,
  playedTime,
  fullMovieTime,
  muting,
  muted,
  volume,
  volumeChange,
  volumeSeek,
  playRate,
  playerbackRate,
  fullScreenMode,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "playbackrate-popover" : undefined;
  const PrettoSlider = styled(Slider)({
    height: 5,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 16,
      width: 16,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#52af77",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  return (
    <div className="controls__div">
      {/* Top Segment */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="start"
        style={{ padding: 16 }}
      >
        <Grid item>
          <Typography variant="h5" style={{ color: "white" }}>
            Como Jugar
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom Segment */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      >
        <Grid item xs={12}>
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
          />
          <Grid container direction="row" justifyContent="space-between">
            <Typography variant="h7" style={{ color: "white" }}>
              {playedTime}
            </Typography>
            <Typography variant="h7" style={{ color: "white" }}>
              {fullMovieTime}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container alignItems="center" direction="row">
            <IconButton
              className="controls__icons"
              aria-label="reqind"
              onClick={playAndPause}
            >
              {playing ? (
                <PauseSharp fontSize="large" style={{ color: "white" }} />
              ) : (
                <PlayArrowSharp fontSize="large" style={{ color: "white" }} />
              )}
            </IconButton>

            <IconButton
              className="controls__icons"
              aria-label="reqind"
              onClick={muting}
            >
              {muted ? (
                <VolumeOff fontSize="large" style={{ color: "white" }} />
              ) : (
                <VolumeUp fontSize="large" style={{ color: "white" }} />
              )}
            </IconButton>

            <Slider
              min={0}
              max={100}
              value={volume * 100}
              className="volume__slider"
              onChange={volumeChange}
              onChangeCommitted={volumeSeek}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Button
            variant="text"
            onClick={handlePopOver}
            className="bottom__icons"
          >
            <Typography>{playerbackRate}X</Typography>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Grid container direction="column-reverse">
              {[0.5, 1, 1.5, 2].map((rate, i) => (
                <Button variant="text" key={i} onClick={() => playRate(rate)}>
                  <Typography
                    color={rate === playerbackRate ? "secondary" : "default"}
                  >
                    {rate}
                  </Typography>
                </Button>
              ))}
            </Grid>
          </Popover>

          <IconButton
            style={{ color: "white" }}
            className="bottom__icons"
            onClick={fullScreenMode}
            disabled={true}
          >
            <Fullscreen fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default ControlIcons;
