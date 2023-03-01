import { Box, Grid, Paper, ToggleButton, Typography } from "@mui/material";
import produce from "immer";
import ClipboardItem from "./ClipboardItem";


export default function RightBar(props){
  const clipboard = props.clipboard;
  const setClipboard = props.setClipboard;

  const renderClipboardItems = () => {
      return clipboard.map((c,i) => <ClipboardItem key={`cb-${i}`} src={c.thumbnail} clipboard={clipboard} setClipboard={setClipboard} />)
  }
  

  return (
  <Box p={1.5} sx={{ height: '100%' }}>
    <Paper sx={{ height: '100%', p: 1.5 }}>

      <Typography mb={1}>Clipboard</Typography>
      <Grid container columns={2} gap={2} sx={{overflowY:'scroll', maxHeight:'88vh'}}>
        {clipboard.length>0 && renderClipboardItems()}
      </Grid>

    </Paper>
  </Box>);
}