import { Box, Paper, ToggleButton, Typography } from "@mui/material";
import produce from "immer";


export default function RightBar(props){
  const clipboard = props.clipboard;
  const setClipboard = props.setClipboard;
  

  return (
  <Box p={1.5} sx={{ height: '100%' }}>
    <Paper sx={{ height: '100%', p: 1.5 }}>

      <Box>
        <Typography mb={1}>Clipboard</Typography>
      </Box>

    </Paper>
  </Box>);
}