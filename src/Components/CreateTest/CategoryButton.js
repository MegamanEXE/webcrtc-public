import { Fade, Grid, Paper, Popper, ToggleButton } from "@mui/material";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";


export function CategoryButton(props) {
  const icon = props.icon;
  const value = props.name;

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <ToggleButton {...bindToggle(popupState)} size="large" value={value}>{icon}</ToggleButton>
          <Popper {...bindPopper(popupState)} transition placement="right-start">
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ p: 1, width: 'fit-content' }}>
                  <Grid container columns={10} gap={1} sx={{ justifyContent: 'center' }}>

                    {props.children.map((c,i) => <Grid key={i} item xs={4} sx={{ textAlign: 'center' }}>
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