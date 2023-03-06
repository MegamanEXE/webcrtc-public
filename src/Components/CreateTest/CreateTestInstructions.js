import '../../App.css'
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function CreateTestInstructions(props) {
  

  return (
    <Grid item flexGrow={1} sx={{ order: 2 }}>
      <Box className='instructionsContainer'>
        <Typography sx={{ fontWeight: '700', size: '24px' }}>Instructions</Typography>

        <Box padding={'2% 0 2% 0'}>
          Now that you have solved some matrices, you now get to create one problem yourself similar to the ones you’ve just solved.

          <br /><br />

          You only need to create the 3x3 question matrix, not the 8 solutions. You have 10 minutes.
          <br />
          Note: You can right-click a shape to delete it.
        </Box>


        <Box className='beginTestBtn'>
          <Button sx={{ flexGrow: '1' }} variant="contained" color="success" onClick={() => {props.setScreen("canvas")}}>BEGIN TEST</Button>
        </Box>
      </Box>
    </Grid>
  )
}

