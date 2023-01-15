import '../../App.css'
import crtcTheme from '../../crtcTheme';
import AppBar from '@mui/material/AppBar';
import { CssBaseline, Grid, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { useState } from 'react';
import FirstTestHeader from './FirstTestHeader';
import FirstTestInstructions from './FirstTestInstructions';
import FirstTest from './FirstTest';
import FirstTestResult from './FirstTestResult';

const theme = crtcTheme();

export default function FirstTestContainer() {
  // eslint-disable-next-line no-lone-blocks
  const quizStates = ['instructions', 'quiz', 'result']; {/* For Reference; these aren't used as enums */ }
  const [quizScreen, setQuizScreen] = useState('instructions');

  function renderBasedOnState(){
    if (quizScreen === 'instructions')
      return <FirstTestInstructions setQuizScreen={setQuizScreen} />
    else if (quizScreen === 'quiz')
      return <FirstTest />
    else if (quizScreen === 'result')
      return <FirstTestResult />
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" sx={{minHeight: '100vh', width: '100%' }}> {/* Body start */}

          <Grid container display='flex' direction='column'>
            <FirstTestHeader />
            {renderBasedOnState()}

          </Grid>
        </Box> {/* Body end */}
      </ThemeProvider>
    </StyledEngineProvider >
  )
}

