import { Box, Typography } from '@mui/material';
import { useTimer } from 'react-timer-hook';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useEffect } from 'react';

export function Timer({ expiryTimestamp, timerStart, onTimeUp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ autoStart:false, expiryTimestamp, onExpire: onTimeUp });

  //Start timer
  useEffect(() => {
    if(timerStart) start();
  },[timerStart]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems: 'center', gap: '6px', mr: '5px', width:'fit-content'}}>
      <TimerOutlinedIcon />
      <Typography component='h1' variant='h6' id='testTimer'>{minutes}:{seconds.toString().padStart(2,'0')}</Typography>
    </Box>
  );
}
