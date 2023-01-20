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
import { useEffect, useState } from 'react';

const theme = crtcTheme();

export default function FirstTest() {
  const [DATA, setDATA] = useState({});
  const [currentTestData, setCurrentTestData] = useState();
  
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  let userAnswers = [];
  let selectedAnswerURI = "";

  useEffect(()=>{setDATA(mockQuizQuestions);},[]);
  useEffect(() => { setCurrentTestData(DATA["Standard APM Test"]); }, [DATA]);

  const handleContinue = () => {
    setQuestionNumber(q=>q+1);
    setSelectedAnswer(-1)
  }

  return (
    <>
      <Grid item flexGrow={1} sx={{ width: '80%', alignSelf: 'center', order: 2 }}>
        <Box className='questionsContainer'>
          <Box className="questionSizeWrapper">
            <Typography sx={{ fontWeight: '700', size: '24px' }}>Question {questionNumber}</Typography>
            <Box className='actualQuestion'>
              <ImageList sx={{ overflow: 'hidden', }} cols={3} gap={20}>
                {currentTestData 
                  && currentTestData["questions"][questionNumber - 1]["questionImages"].map((q, i) => <ImageListItem border="4px dashed transparent" key={`q${i + 1}`} className="questionImage"><img src={q} alt={`q${i + 1}`} /></ImageListItem>)}

                {currentTestData &&
                  <Box border="4px dashed grey" key="filler" width="84px"><img className='questionImage' src={`${currentTestData["questions"][questionNumber - 1]["answerImages"][selectedAnswer-1]}`} alt="" /></Box>
                }
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
                {currentTestData
                  && currentTestData["questions"][questionNumber - 1]["answerImages"].map((q, i) => <AnswerOption src={q} id={`a${i + 1}`} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />)}
              </ImageList>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Button variant="contained" color="success" onClick={()=>handleContinue()}>Continue</Button>
          </Grid>

        </Grid>
      </Grid>
    </>
  )
}

