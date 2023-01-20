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

import mockQuizQuestions from "../../data/mockQuizQuestions.json"

const theme = crtcTheme();

export default function FirstTest() {
  return (
    <>
      <Grid item flexGrow={1} sx={{ width: '80%', alignSelf: 'center', order: 2 }}>
        <Box className='questionsContainer'>
          <Box className="questionSizeWrapper">
            <Typography sx={{ fontWeight: '700', size: '24px' }}>Question 1</Typography>
            <Box className='actualQuestion'>
              <ImageList sx={{ overflow: 'hidden', }} cols={3} gap={20}>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/1/q1.png'} alt="q1" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/1/q2.png'} alt="q2" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/1/q3.png'} alt="q3" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/1/q4.png'} alt="q4" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/1/q5.png'} alt="q5" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/1/q6.png'} alt="q6" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/1/q7.png'} alt="q7" /></ImageListItem>
                <ImageListItem className="questionImage"><img src={'assets/Tests/defaultSample/1/q8.png'} alt="q8" /></ImageListItem>
              </ImageList>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item sx={{ order: 3 }}>
        <Grid container className='answersContainer'>
          <Grid item xs={3}></Grid>{/* Previous button will be here */}

          <Grid item>
            <Box className='actualAnswers'>
              <Typography sx={{ fontWeight: '700', size: '24px', }}>Which of these fit the best?</Typography>

              <ImageList sx={{ overflow: 'hidden' }} cols={4} gap={16} >
                <AnswerOption src={'assets/Tests/defaultSample/1/a1.png'} id={'a1'} />
                <AnswerOption src={'assets/Tests/defaultSample/1/a2.png'} id={'a2'} />
                <AnswerOption src={'assets/Tests/defaultSample/1/a3.png'} id={'a3'} />
                <AnswerOption src={'assets/Tests/defaultSample/1/a4.png'} id={'a4'} />
                <AnswerOption src={'assets/Tests/defaultSample/1/a5.png'} id={'a5'} />
                <AnswerOption src={'assets/Tests/defaultSample/1/a6.png'} id={'a6'} />
                <AnswerOption src={'assets/Tests/defaultSample/1/a7.png'} id={'a7'} />
                <AnswerOption src={'assets/Tests/defaultSample/1/a8.png'} id={'a8'} />
              </ImageList>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Button variant="contained" color="success">Continue</Button>
          </Grid>

        </Grid>
      </Grid>
    </>
  )
}

