import '../App.css'
import crtcTheme from '../crtcTheme';
import AppBar from '@mui/material/AppBar';
import { CssBaseline, Grid, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const theme = crtcTheme();

const Temp_Test_Copy = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className='quizMainContainer'>
          
          <AppBar className='crtcHeader'>
            <Typography component='h1' variant='h6'>Creative Reasoning Test</Typography>

            <Box sx={{ flexGrow: 0.98 }} />

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', mr: '10px' }}>
              <TimerOutlinedIcon />
              <Typography component='h1' variant='h6' id='testTimer'>480s</Typography>
            </Box>
          </AppBar>

          <Box className='questionsContainer'>
            <Typography sx={{ fontWeight: '700', size: '24px' }}>Question 1</Typography>
            <Box className='actualQuestion'>
              <ImageList sx={{ width: '100%', height: '100%', overflow:'hidden'}} cols={3} rowHeight={10} gap={15}>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q1.png'} alt="q1" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q2.png'} alt="q2" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q3.png'} alt="q3" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q4.png'} alt="q4" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q5.png'} alt="q5" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q6.png'} alt="q6" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/q7.png'} alt="q7" /></ImageListItem>
              </ImageList>
            </Box>
          </Box>

        <Box className='answersContainer'>
            <Typography sx={{ fontWeight: '700', size: '24px' }}>Which of these fit the best?</Typography>
            <ImageList sx={{ overflow: 'hidden' }} cols={4} rowHeight={10} gap={15}>
              <ImageListItem className="answerImage"><img src={'assets/Tests/defaultSample/a1.png'} alt="a1" /></ImageListItem>
              <ImageListItem className="answerImage"><img src={'assets/Tests/defaultSample/a2.png'} alt="a2" /></ImageListItem>
              <ImageListItem className="answerImage"><img src={'assets/Tests/defaultSample/a3.png'} alt="a3" /></ImageListItem>
              <ImageListItem className="answerImage"><img src={'assets/Tests/defaultSample/a4.png'} alt="a4" /></ImageListItem>
              <ImageListItem className="answerImage"><img src={'assets/Tests/defaultSample/a5.png'} alt="a5" /></ImageListItem>
              <ImageListItem className="answerImage"><img src={'assets/Tests/defaultSample/a6.png'} alt="a6" /></ImageListItem>
              <ImageListItem className="answerImage"><img src={'assets/Tests/defaultSample/a7.png'} alt="a7" /></ImageListItem>
            </ImageList>
        </Box>




        </Box>
      </ThemeProvider>
    </StyledEngineProvider >
  )
}

export default Temp_Test_Copy

