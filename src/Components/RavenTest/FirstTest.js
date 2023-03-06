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

export default function FirstTest({setQuizScreen}) {
  const [DATA, setDATA] = useState({});
  const [currentTestData, setCurrentTestData] = useState();
  
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  let userAnswers = [];
  let selectedAnswerURI = "";

  useEffect(()=>{setDATA(mockQuizQuestions);},[]);
  useEffect(() => { setCurrentTestData(DATA["Standard APM Test"]); }, [DATA]);

  const handleContinue = () => {
    if(questionNumber===2){ //TODO: Remove this hardcode when I wake up
      setQuizScreen("result");
    }
    setQuestionNumber(q=>q+1);
    setSelectedAnswer(-1)
  }

  const renderQuestions = () => {
    let qs = [];
    const qi = currentTestData["questions"][questionNumber - 1]["questionImages"];
    for (let k in qi){
      qs.push(<ImageListItem border="4px dashed transparent" key={`q${k + 1}`} className="questionImage"><img src={qi[k]} alt={`q${k + 1}`} /></ImageListItem>);
    }

    return qs;
  }

  const renderAnswers = () => {
    let as = [];
    const ai = currentTestData["questions"][questionNumber - 1]["answerImages"];
    for (let k in ai) {
      as.push(<AnswerOption key={`a${k + 1}`} src={ai[k]} id={`a${k + 1}`} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />);
    }

    return as;
  }

  return (
    <>
      <Grid item flexGrow={1} sx={{ width: '80%', alignSelf: 'center', order: 2 }}>
        <Box className='questionsContainer'>
          <Box className="questionSizeWrapper">
            <Typography sx={{ fontWeight: '700', size: '24px' }}>Question {questionNumber}</Typography>
            <Box className='actualQuestion'>
              <ImageList sx={{ overflow: 'hidden', }} cols={3} gap={20}>
                {currentTestData && renderQuestions()}
                
                {currentTestData &&
                  <Box border="4px dashed grey" key="filler" width="84px"><img className='questionImage' src={`${currentTestData["questions"][questionNumber - 1]["answerImages"][selectedAnswer]}`} alt="" /></Box>
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
                {currentTestData && renderAnswers()}
              </ImageList>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Button variant="contained" color="success" onClick={handleContinue}>Continue</Button>
          </Grid>

        </Grid>
      </Grid>
    </>
  )
}

