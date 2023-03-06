import '../../App.css'
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function FirstTestResult(props) {
  const navigate = useNavigate();
  function handleClick(){
    navigate('/CreateTest',{replace:true});

  }

  return (
    <Grid item flexGrow={1} sx={{ order: 2 }}>
      <Box className='resultsContainer'>
        <Typography sx={{ fontWeight:700, size: '24px'}}>First part of the test is complete! </Typography>

        <Typography variant='h2' sx={{fontWeight: 800}}>RESULTS</Typography>

        <Typography variant='h5' sx={{flexGrow:1}}>You got <strong>0/2</strong> questions correct</Typography>
        {/* TODO: Get score from container later. Put in place of 4/8 */}

        <Box className='finishRavenTestBtn'>
          <Button sx={{ flexGrow: '1' }} variant="contained" color="success" onClick={() => handleClick()}>
            CONTINUE TO FINAL PART OF THE TEST
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

