import { Button, Fade, Grid, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import Image from "mui-image";
import { CheckCircle } from "@mui/icons-material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'white',
  borderRadius: '4px',
  boxShadow: 24,
};

export function SubmitModal(props){
  const [modalState, setModalState] = useState("submit"); //only "submit" or "thanks"
  const screenshots = props.screenshots;

  const submissionimages = () => {
    if (screenshots['1'] === null) return;

    let si = [];
    for (let i = 1; i <= 9; i++) {
      si.push(<Grid item className="gridMatrix" key={`submission-${i}`} xs={3} >
        <Image src={screenshots[`${i}`]} bgColor={"lightgray"}
            width="150px" height="150px"
            style={{ border: '2px solid gray' }}
            alt={`subImage-${i}`}
            showLoading
            shift="left"
            duration={225}
        />
      </Grid>);
    }
    return si;
  }

  const submitTest = () => {
    //update in API etc.

    setModalState("thanks");
  }


  //SCREEN 1
  const SubmitScreen = () => {
    return (<>
      <Box id="modalHeader" >
        <Typography variant="h5">Confirm submission</Typography>
        <Box>
          <IconButton size="small" aria-label="close" onClick={() => props.setModalOpen(false)} sx={{ position: 'absolute', right: 5, top: 5 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box id="modalContent" flexGrow={1}>
        <Box flexGrow={1}>

          <Box id="previewMatrix">
            <Grid container rowSpacing={3} columns={9} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              {submissionimages()}
            </Grid>
          </Box>
        </Box>

      </Box>

      <Box py={3}>
        <Typography variant="h6" textAlign="center">Submit this Matrix?</Typography>
        <Box id="yesNo">
          <Button variant="outlined" onClick={submitTest}>Yes</Button>
          <Button variant="outlined" onClick={() => props.setModalOpen(false)}>No</Button>
        </Box>
      </Box>
    </>)
  }

  //SCREEN 2
  const ThanksScreen = () => {
      return(
        <>
          <Box id="modalHeader" >
            <Typography variant="h5">Test Complete</Typography>
          </Box>

          <Box id="modalContent" flexGrow={1} sx={{justifyContent:'center'}}>
           
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Typography variant="h6">The test has now been completed. Thank you for taking CRTc!</Typography>
                <CheckCircle color="success" sx={{fontSize:'15em'}} />

              <Box py={3}>
                <Typography variant="h6" textAlign="center">You may now safely close this window.</Typography>

              </Box>

              </Box>
            

          </Box>

          
        </>
      );
  }





  return (
  <Modal
    className="testModal"
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={props.modalOpen}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={props.modalOpen}>

      <Box sx={style} id="modalMainContainer" component="div">
        {modalState==="submit" ? <SubmitScreen /> : <ThanksScreen />}
      </Box>
    </Fade>

  </Modal>
  )


  
}