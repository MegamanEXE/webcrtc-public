import { Box, Grid, Paper, ToggleButton, Typography } from "@mui/material";
import produce from "immer";
import ClipboardItem from "./ClipboardItem";

//TODO: Add delete all button. Not hard


export default function RightBar(props){
  const clipboard = props.clipboard;
  const setClipboard = props.setClipboard;
  const setShapes = props.setShapes;

  const renderClipboardItems = () => {
    return clipboard.map((c, i) => <ClipboardItem key={`cb-${i}`} id={`cb-${i}`} src={c.thumbnail} data={c.data}
      clipboard={clipboard} setClipboard={setClipboard}
      setShapes={setShapes}
      selectedMatrix={props.selectedMatrix} shapes={props.shapes}
    />)
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