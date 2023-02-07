import '../../App.css'
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

export default function FirstTestHeader(props){
  return (
      <AppBar className='crtcHeader'>
        <Typography component='h1' variant='h6'>Creative Reasoning Test</Typography>

        <Box sx={{ flexGrow: 0.98 }} />

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', mr: '10px' }}>
          <TimerOutlinedIcon />
          <Typography component='h1' variant='h6' id='testTimer'>{`${props.timer}s`}</Typography>
        </Box>
      </AppBar>
  )
}

FirstTestHeader.defaultProps = {
  timer: 0
};