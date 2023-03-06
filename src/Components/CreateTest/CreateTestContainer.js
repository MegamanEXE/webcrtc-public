import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Grid, StyledEngineProvider, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import crtcTheme from "../../crtcTheme";
import FirstTestHeader from "../RavenTest/FirstTestHeader"
import Canvas from "./Canvas"
import CreateTestInstructions from "./CreateTestInstructions";

const theme = crtcTheme();

export default function CreateTestContainer() {
  const [screen, setScreen] = useState("canvas"); //instructions,canvas. Should be "instructions" in final
  const [timerStart, setTimerStart] = useState(false); //flag which starts the timers when true

  //Handle time up
  const onTimeUp = () => {
      console.log("Time's up")
  }

  useEffect(() => {
    if(screen==="canvas"){
      setTimerStart(true)
    } else if (screen === "instructions") {
      setTimerStart(false)
    }
  },[timerStart]);

  return <>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>

          <Box sx={{ display: 'flex', order: 1 }}>
            <FirstTestHeader timer={600} timerStart={timerStart} onTimeUp={onTimeUp} />
          </Box>

          <Box sx={{display:'flex', flexGrow:1, order:2}}>
            {screen === "instructions" ? <CreateTestInstructions setScreen={setScreen} /> : <Canvas />}
          </Box>

        </Box>
      </ThemeProvider>
    </StyledEngineProvider >
  </>
}