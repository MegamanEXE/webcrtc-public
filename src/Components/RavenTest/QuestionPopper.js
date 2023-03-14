import { Cancel, CheckCircle } from "@mui/icons-material";
import { Button, Fade, Grid, ImageList, ImageListItem, Paper, Popper, Stack, Typography } from "@mui/material";
import PopupState, { bindHover, bindPopper, bindToggle } from "material-ui-popup-state";
import { useState } from "react";


export function QuestionPopper(props) {
  
  const row = props.row;
  const qImages = props.qImages;
  const aImages = props.aImages;
  const disablePortal = props.disablePortal || false; //Admin's RavenTestResults wants disablePortal, FirstTestResults does not

  //QUESTION IMAGES
  const renderQuestionImages = () => {
    let qi = [];
    for(let i in qImages){
      qi.push(<ImageListItem key={`q-${i}`}><img src={qImages[i]} alt="questionImage" style={{width:50}} /></ImageListItem>);
    }

    //add the correct answer
    qi.push(<ImageListItem key="correctAnswer"><img src={aImages[row.correct]} alt="correctSolution" style={{ width: 50 }} /></ImageListItem>)

    return <ImageList cols={3} >
      {qi}
    </ImageList>
  }

  //ANSWER IMAGES
  const renderAnswerImages = () => {
    let qi = [];
    for (let i in qImages) {
      qi.push(<ImageListItem key={`a-${i}`}><img src={qImages[i]} alt="qImage-in-Answer" style={{ width: 50 }} /></ImageListItem>);
    }

    //add the given answer
    qi.push(<ImageListItem key="givenAnswer">
        <img src={aImages[row.given]} 
        className={row.correct === row.given ? "correctBorder" : "wrongBorder"} 
        alt="givenAnswer" 
        style={{ width: 50 }} />
      </ImageListItem>)

    return <ImageList cols={3} >
      {qi}
    </ImageList>
  }

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button variant="text" {...bindHover(popupState)} disableRipple>View Details</Button>
          <Popper {...bindPopper(popupState)} transition placement="right" disablePortal={disablePortal}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ p: 1, width: '60vh' }} elevation={3}>
                  <Grid container columns={12} gap={6} sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Grid item xs={5}>
                      <Typography variant="h7">Correct Answer</Typography>
                      {qImages && renderQuestionImages()}
                    </Grid>
                    <Grid item xs={5}>
                      {/* Minor detail; 'Submitted Answer' is for Admin panel */}
                      {disablePortal ? <Typography variant="h7">Submitted Answer</Typography> : <Typography variant="h7">Your Answer</Typography>}
                      {aImages && renderAnswerImages()}
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