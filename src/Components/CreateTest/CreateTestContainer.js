import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Grid, StyledEngineProvider, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useState } from "react";
import crtcTheme from "../../crtcTheme";
import FirstTestHeader from "../RavenTest/FirstTestHeader"
import Canvas from "./Canvas"

const theme = crtcTheme();

export default function CreateTestContainer() {
  


  return <>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>

          <Box sx={{ display: 'flex', order: 1 }}>
            <FirstTestHeader timer={600} />
          </Box>

          <Box sx={{display:'flex', flexGrow:1, order:2}}>
            <Canvas />
          </Box>

        </Box>
      </ThemeProvider>
    </StyledEngineProvider >
  </>
}