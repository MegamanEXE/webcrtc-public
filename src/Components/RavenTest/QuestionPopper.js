import { Cancel, CheckCircle } from "@mui/icons-material";
import { Button, Fade, Grid, ImageList, ImageListItem, Paper, Popper, Stack, ToggleButton, Typography } from "@mui/material";
import PopupState, { bindHover, bindPopper, bindToggle } from "material-ui-popup-state";
import Image from "mui-image";
import { nanoid } from "nanoid";
import { useState } from "react";


export function QuestionPopper(props) {
  
  const row = props.row;
  const qImages = props.qImages;
  const aImages = props.aImages;

  const QuestionWithIcon = () => {
    return row.correct === row.given ?
      <Stack direction="row" alignItems="center" gap={1}>
        <CheckCircle color='success' fontSize='small' />
        Q{row.questionNumber}
      </Stack>
      :
      <Stack direction="row" alignItems="center" gap={1}>
        <Cancel color='error' fontSize='small' />
        Q{row.questionNumber}
      </Stack>

  }

  const renderQuestionImages = () => {
    let qi = [];
    for(let i in qImages){
      qi.push(<ImageListItem key={nanoid()}><img src={qImages[i]} alt="questionImage" style={{width:50}} /></ImageListItem>);
    }

    return <ImageList cols={3} >
      {qi}
    </ImageList>
  }

  //change bindToggle back to bindHover after fixing layout
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button variant="text" {...bindHover(popupState)} disableRipple><QuestionWithIcon  /></Button>
          <Popper {...bindPopper(popupState)} transition placement="right">
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ p: 1, width: '40vh' }} elevation={3}>
                  <Grid container columns={12} gap={6} >
                    <Grid item xs={5}>
                      <Typography variant="h7">Correct Answer</Typography>
                      {qImages && renderQuestionImages()}
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h7">Your Answer</Typography>
                      {qImages && renderQuestionImages()}
                    </Grid>



                  </Grid>

                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}