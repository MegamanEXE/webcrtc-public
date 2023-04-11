import '../../App.css'
import crtcTheme from '../../crtcTheme';
import AppBar from '@mui/material/AppBar';
import { CssBaseline, Grid, LinearProgress, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AnswerOption from './AnswerOption';

import mockQuizQuestions from "../../data/mockQuizQuestions.json"
import { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { UseServerContext } from '../../UseServerContext';

const theme = crtcTheme();

export default function FirstTest(props) {
  const [DATA, setDATA] = useState();
  const [currentTestData, setCurrentTestData] = useState();
  
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [progress, setProgress] = useState(0); //Progress bar

  
  const totalQuestions = useRef(-1);
  const userAnswers = props.userAnswers; //ref
  const results = props.results; //ref

  const useServer = useContext(UseServerContext);


  //Read from API
  useEffect(() => { 
    if(useServer){
      console.log("Using server")
      axios.get("http://localhost:5000/quizQuestions")
      .then(res => {
        console.log(res)
        setDATA(res.data)
      })
    }
    else{
      console.log("Using mock data")
      setDATA(mockQuizQuestions);
    }

  }, []);

  //Load relevant test only
  useEffect(() => { 
    if(DATA == null) return;

    if(useServer)
      setCurrentTestData(DATA[0]["Standard APM Test"]);
    else
      setCurrentTestData(DATA["Standard APM Test"]);

  }, [DATA]);

  //Stuff to do when relevant data is loaded
  useEffect(() => {
      if(!currentTestData) return; 

      totalQuestions.current = currentTestData['questions'].length;
  },[currentTestData]);

  //Update progress bar
  useEffect(() => {
    if (totalQuestions===-1) return;

    setProgress(((questionNumber-1)/totalQuestions.current)*100);
  }, [questionNumber,totalQuestions]);


  //Calculate results
  const calculateResults = () => {
    let score = 0;
    let details = [];

    //userAnswers begin from index 1, not 0
    currentTestData["questions"].forEach((q,i)=>{
      if(q["correct_answer"] === userAnswers.current[i+1]){
        score++;
      }
      // console.log(`Answer given for Q${i+1}: ${userAnswers.current[`${i+1}`]}. Correct: ${q.correct_answer}`);
      details.push({questionNumber: i+1, given:userAnswers.current[i+1], correct:q["correct_answer"], qImages:q["questionImages"], aImages:q["answerImages"] });
    });
    
    //If in the future, we need to send more data for results, it can be done easily since it's a ref
    results.current = {score: score, totalQuestions: totalQuestions.current, details: details};
    
  }

  //Handle continue
  const handleContinue = () => {
    //Record answer
    userAnswers.current[questionNumber] = selectedAnswer;

    if(questionNumber===totalQuestions.current){ 
      calculateResults();
      props.setQuizScreen("result");
    }
    setQuestionNumber(q=>q+1);
    setSelectedAnswer(-1)
  }

  const renderQuestions = () => {
    let qs = [];
    const qi = currentTestData["questions"][questionNumber - 1]["questionImages"];
    for (let k in qi){
      qs.push(<ImageListItem key={`q${k + 1}`} className="questionImage">
        <img src={qi[k]} alt={`q${k + 1}`} style={{ width: 85, border: "4px solid transparent" }} />
      </ImageListItem>);
    }

    return <ImageList sx={{ overflow: 'hidden', }} cols={3} gap={20}>
      {qs}
      <ImageListItem key="filler">
        <img style={{ width: 85, border: "4px dashed grey"  }} 
        className='questionImage' 
        src={`${currentTestData["questions"][questionNumber - 1]["answerImages"][selectedAnswer]}`} 
        alt="" />
      </ImageListItem>
    </ImageList>
  }

  const renderAnswers = () => {
    let as = [];
    const ai = currentTestData["questions"][questionNumber - 1]["answerImages"];
    for (let k in ai) {
      as.push(<AnswerOption key={k} src={ai[k]} id={k} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />);
    }

    return <ImageList sx={{ overflow: 'hidden' }} cols={4} gap={16} >{as}</ImageList>
  }

  return (
    <>
      <Grid item flexGrow={1} sx={{ width: '80%', alignSelf: 'center', order: 2 }}>

        <Box className='questionsContainer'>
          <Box className="questionSizeWrapper">

            <Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>

            <Typography sx={{ fontWeight: '700', size: '24px' }}>Question {questionNumber}</Typography>
            <Box className='actualQuestion'>
                {currentTestData && renderQuestions()}
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
                {currentTestData && renderAnswers()}
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

