import { Fade, Grid, Paper, Popper, ToggleButton } from "@mui/material";
import PopupState, { bindHover, bindPopper, bindToggle } from "material-ui-popup-state";
import { useState } from "react";


export function CategoryButton(props) {
  const icon = props.icon;
  const value = props.name;
  const disablePortal = props.disablePortal || false; //For the admin version

  //change bindToggle back to bindHover after fixing layout
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <ToggleButton {...bindHover(popupState)} size="large" value={value}>{icon}</ToggleButton>
          <Popper {...bindPopper(popupState)} transition placement="right-start" disablePortal={disablePortal} sx={{zIndex:100}}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ p: 1, width: '15vh' }} elevation={3}>
                  <Grid container columns={12} gap={1} sx={{ justifyContent: 'center' }}>

                    {props.children.map((c,i) => <Grid key={`${value}-${i}`} item xs={5} sx={{ textAlign: 'center' }}>
                      {c}
                    </Grid>)}
                    


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