import React, { useState, useEffect } from "react";
import { Stack, IconButton, Button } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import style from "./Timer.module.css";
import { amber } from "@mui/material/colors";

const iconStyle = {
  width: 50,
  height: 50,
  color: amber[400],
};
const btnStyle = {
  width: 300,
  height: 50,
  bgcolor: amber[400],
};

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isTimerOn, setTimerOn] = useState(false);

  const handleStop = () => {
    setTimerOn(false);
    setTime(0);
  };
  const handlePause = () => {
    if (!isTimerOn) {
      return;
    }
    setTimerOn(false);
  };

  useEffect(() => {
    let interval = null;
    isTimerOn
      ? (interval = setInterval(() => {
          setTime((prev) => prev + 10);
        }, 10))
      : clearInterval(interval);
    return () => clearInterval(interval);
  }, [isTimerOn]);

  const [lap, setLap] = useState([]);
  const [isDisabled, setDisabled] = useState(false);

  const handleLap = () => {
    if (!time) {
      return;
    }
    setLap((prev) => {
      return [...prev, time];
    });
    setDisabled(true);
    setTimeout(() => setDisabled(false), 500);
  };
  const handleReset = () => {
    setTime(0);
    setLap([]);
    setTimerOn(false);
  };

  return (
    <section className={style.stopwatch}>
      <div className={style.circle}>
        <p className={style.time}>
          {`0${Math.floor((time / 60000) % 60)}`.slice(-2)}:
          {`0${Math.floor((time / 1000) % 60)}`.slice(-2)}:
          {`0${(time / 10) % 100}`.slice(-2)}
        </p>
      </div>
      <Stack className={style.controls} direction='row' spacing={1}>
        <IconButton
          onClick={() => setTimerOn(true)}
          color='secondary'
          size='large'>
          <PlayCircleOutlineIcon sx={iconStyle} />
        </IconButton>
        <IconButton onClick={handleStop} color='secondary' size='large'>
          <StopCircleIcon sx={iconStyle} />
        </IconButton>
        <IconButton onClick={handlePause} color='secondary' size='large'>
          <PauseCircleOutlineIcon sx={iconStyle} />
        </IconButton>
        <IconButton
          onClick={handleReset}
          color='secondary'
          size='large'
          disabled={isDisabled}>
          <RotateLeftIcon sx={iconStyle} />
        </IconButton>
      </Stack>
      <Button
        type='button'
        onClick={handleLap}
        sx={btnStyle}
        variant='contained'
        disabled={isDisabled}>
        Lap
      </Button>
      {lap.map((el, i) => (
        <p className={style.time} key={i}>
          {`0${Math.floor(el / 3600)}`.slice(-2)}:
          {`0${Math.floor((el / 60) % 60)}`.slice(-2)}:{`0${el % 60}`.slice(-2)}
        </p>
      ))}
    </section>
  );
};

export default Timer;
