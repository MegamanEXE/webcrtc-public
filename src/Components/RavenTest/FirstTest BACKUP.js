import '../../App.css'
import crtcTheme from '../../crtcTheme';
import AppBar from '@mui/material/AppBar';
import { CssBaseline, Grid, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AnswerOption from './AnswerOption';


const theme = crtcTheme();

export default function FirstTest() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" sx={{minHeight: '100vh', width: '100%' }}>
          <Grid container display='flex' direction='column'>

            <Grid item sx={{order:1}}>
              <AppBar className='crtcHeader'>
                <Typography component='h1' variant='h6'>Creative Reasoning Test</Typography>

                <Box sx={{ flexGrow: 0.98 }} />

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', mr: '10px' }}>
                  <TimerOutlinedIcon />
                  <Typography component='h1' variant='h6' id='testTimer'>480s</Typography>
                </Box>
              </AppBar>
            </Grid>


            <Grid item flexGrow={1} sx={{width:'80%', alignSelf:'center', order:2}}>
              <Box className='questionsContainer'>
                <Box className="questionSizeWrapper">
                <Typography sx={{ fontWeight: '700', size: '24px' }}>Question 1</Typography>
                  <Box className='actualQuestion'>
                    <ImageList sx={{ overflow: 'hidden',  }} cols={3}  gap={20}>
                      <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q1.png'} alt="q1" /></ImageListItem>
                      <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q2.png'} alt="q2" /></ImageListItem>
                      <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q3.png'} alt="q3" /></ImageListItem>
                      <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q4.png'} alt="q4" /></ImageListItem>
                      <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q5.png'} alt="q5" /></ImageListItem>
                      <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q6.png'} alt="q6" /></ImageListItem>
                      <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q7.png'} alt="q7" /></ImageListItem>
                      <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q8.png'} alt="q8" /></ImageListItem>
                    </ImageList>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item sx={{order:3}}>
              <Grid container className='answersContainer'>
                <Grid item xs={3}></Grid>{/* Previous button will be here */}

                <Grid item>
                  <Box>
                    <Typography sx={{ fontWeight: '700', size: '24px',}}>Which of these fit the best?</Typography>

                    <ImageList sx={{ overflow: 'hidden' }} cols={4} gap={16} >
                      <AnswerOption src={'assets/Tests/defaultSample/a1.png'} id={'a1'} />
                      <AnswerOption src={'assets/Tests/defaultSample/a2.png'} id={'a2'} />
                      <AnswerOption src={'assets/Tests/defaultSample/a3.png'} id={'a3'} />
                      <AnswerOption src={'assets/Tests/defaultSample/a4.png'} id={'a4'} />
                      <AnswerOption src={'assets/Tests/defaultSample/a5.png'} id={'a5'} />
                      <AnswerOption src={'assets/Tests/defaultSample/a6.png'} id={'a6'} />
                      <AnswerOption src={'assets/Tests/defaultSample/a7.png'} id={'a7'} />
                      <AnswerOption src={'assets/Tests/defaultSample/a8.png'} id={'a8'} />
                    </ImageList>
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <Button variant="contained" color="success">Continue</Button>
                </Grid>

              </Grid>
            </Grid>



          </Grid>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider >
  )
}

