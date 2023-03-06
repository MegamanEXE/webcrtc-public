import '../../App.css'
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function FirstTestInstructions(props) {
  function handleClick(){
    props.setTimerStart(true);
    props.setQuizScreen('quiz');
  }

  return (
    <Grid item flexGrow={1} sx={{ order: 2 }}>
      <Box className='instructionsContainer'>
        <Typography sx={{ fontWeight: '700', size: '24px' }}>Instructions</Typography>

        <Box padding={'2% 0 2% 0'}>
          You will be shown a series of matrices in a 3x3 format, but one final piece will be missing.

          <br /><br />

          You will be provided 8 possible solutions. Pick one that you think fits the pattern the best.
        </Box>

        <Box className='instructionsPhoto'><img src={'assets/InstructionDiagram.png'} alt="Instructions" /></Box>

        <Box className='beginTestBtn'>
          <Button sx={{ flexGrow: '1' }} variant="contained" color="success" onClick={handleClick}>BEGIN TEST</Button>
        </Box>
      </Box>
    </Grid>
  )
}

