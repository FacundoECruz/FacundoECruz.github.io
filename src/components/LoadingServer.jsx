/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import ControlIcons from "../pages/home/ControlIcons.jsx";
import { useRef, useState } from "react";
import { format } from "../pages/home/format.js";
import screenfull from "screenfull";
import { CircularProgress } from "@mui/material";

function LoadingServer({ server, backToHome }) {
  const [playerstate, setPlayerState] = useState({
    playing: true,
    mute: true,
    volume: 0.5,
    playerbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerDivRef = useRef(null);

  const { playing, mute, volume, playerbackRate, played } = playerstate;

  const handlePlayAndPause = () => {
    setPlayerState({
      ...playerstate,
      playing: !playerstate.playing,
    });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() - 10,
      "seconds"
    );
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() + 30,
      "seconds"
    );
  };

  const handlePlayerProgress = (state) => {
    if (!playerstate.seeking) {
      setPlayerState({ ...playerstate, ...state });
    }
  };

  const handlePlayerSeek = (newValue) => {
    setPlayerState({
      ...playerstate,
      played: parseFloat(newValue.target.value / 100),
    });
    playerRef.current.seekTo(parseFloat(newValue.target.value / 100));
  };

  const handlePlayerMouseSeekUp = (newValue) => {
    setPlayerState({ ...playerstate, seeking: false });
    playerRef.current.seekTo(newValue.target.value / 100);
  };

  const handleMuting = () => {
    setPlayerState({ ...playerstate, mute: !playerstate.mute });
  };

  const handleVolumeChange = (e, newValue) => {
    setPlayerState({
      ...playerstate,
      volume: parseFloat(newValue / 100),
      mute: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeek = (e, newValue) => {
    setPlayerState({
      ...playerstate,
      volume: parseFloat(newValue / 100),
      mute: newValue === 0 ? true : false,
    });
  };

  const handlePlayerRate = (rate) => {
    setPlayerState({ ...playerstate, playerbackRate: rate });
  };

  const handleFullScreenMode = () => {
    screenfull.toggle(playerDivRef.current);
  };

  const currentPlayerTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const movieDuration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  const playedTime = format(currentPlayerTime);
  const fullMovieTime = format(movieDuration);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          width: "100%",
          height: "500px  ",
          borderRadius: "5%",
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(5px)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Typography variant="h6" sx={{ color: "white", fontWeight: "400" }}>
        Cargando data del servidor...
      </Typography>
      <CircularProgress /> */}
        <div ref={playerDivRef}>
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=mzMPcl7vhQo&t=1s"
            playing={playing}
            muted={mute}
            controls={true}
            ref={playerRef}
            onProgress={handlePlayerProgress}
            playbackRate={playerbackRate}
          />
        </div>
        <ControlIcons
          playAndPause={handlePlayAndPause}
          playing={playing}
          rewind={handleRewind}
          fastForward={handleFastForward}
          played={played}
          onSeek={handlePlayerSeek}
          onSeekMouseUp={handlePlayerMouseSeekUp}
          playedTime={playedTime}
          fullMovieTime={fullMovieTime}
          muting={handleMuting}
          muted={mute}
          volume={volume}
          volumeChange={handleVolumeChange}
          volumeSeek={handleVolumeSeek}
          playerbackRate={playerbackRate}
          playRate={handlePlayerRate}
          fullScreenMode={handleFullScreenMode}
        />
      </Box>
      {server === "loading" ? (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <Typography sx={{color: "white"}}>El servidor puede tardar hasta 1 minuto...</Typography>
          <CircularProgress />
        </Box>
      ) : (
        <Button onClick={() => backToHome()}>Ir a inicio</Button>
      )}
    </Box>
  );
}

export default LoadingServer;
