import { Grid } from "@mui/material";
import { Box } from "@mui/system";


export default function ClipboardItem(props){
  const clipboard = props.clipboard;
  const setClipboard = props.setClipboard;

  return(
    <Grid item className="clipboardItem">
      <img src={props.src} alt="clipboard-item" />
    </Grid>
  );
}