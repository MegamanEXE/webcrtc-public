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
import { blue } from '@mui/material/colors';


const theme = crtcTheme();

const LayoutTest = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" sx={{ minHeight: '100vh', width:'100%' }}>
        <Grid container display='flex' direction='column'>
          <Grid item>a</Grid>
          <Grid item flexGrow={1} sx={{ backgroundColor: '#00ffff' }}>b</Grid>
          <Grid item sx={{backgroundColor:'#0000ff'}}>Heck yeah</Grid>
        </Grid>
      </Box>

    </ThemeProvider>
  )
}

export default LayoutTest

