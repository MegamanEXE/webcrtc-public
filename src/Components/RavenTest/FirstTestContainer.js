import '../../App.css'
import crtcTheme from '../../crtcTheme';
import AppBar from '@mui/material/AppBar';
import { CssBaseline, Grid, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Button from '@mui/material/Button';

const theme = crtcTheme();

export default function FirstTestContainer() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" sx={{minHeight: '100vh', width: '100%' }}> {/* Body start */}

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


            <Grid item flexGrow={1} sx={{order:2}}>
              <Box className='genericContainer'>Content here lmao</Box>
            </Grid>

          </Grid>
        </Box> {/* Body end */}
      </ThemeProvider>
    </StyledEngineProvider >
  )
}

