import '../../App.css'
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Timer } from '../Timer';

export default function FirstTestHeader(props){

  //Timer in seconds
  const time = new Date();
  time.setSeconds(time.getSeconds() + props.timer); // 10 minutes 

  return (
      <AppBar className='crtcHeader'>
        <Typography component='h1' variant='h6'>Creative Reasoning Test</Typography>

        <Box sx={{ flexGrow: 0.98 }} />

        <Timer expiryTimestamp={time} timerStart={props.timerStart} onTimeUp={props.onTimeUp} />
      </AppBar>
  )
}

FirstTestHeader.defaultProps = {
  timer: 0
};