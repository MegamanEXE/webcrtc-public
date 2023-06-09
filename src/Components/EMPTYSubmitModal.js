import { Button, Fade, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';


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
  return (
  <Modal
    className="testModal"
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={props.modalOpen}
    onClose={props.handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={props.modalOpen}>
      <Box sx={style} id="modalMainContainer" component="div">

        <Box id="modalHeader" >
          <Typography variant="h5">Confirm submission</Typography>
          <Box>
            <IconButton size="small" aria-label="close" onClick={props.handleClose} sx={{ position: 'absolute', right: 5, top: 5 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>




        <Box id="modalContent" flexGrow={1}>
          <Box id="previewMatrix">

          </Box>
          

        </Box>




        <Box p={1.5}>
            <Typography variant="h6" textAlign="center">Submit this Matrix?</Typography>
            <Box id="yesNo">
              <Button variant="outlined">Yes</Button>
              <Button variant="outlined">No</Button>
            </Box>
        </Box>


      </Box>
    </Fade>

  </Modal>
  )
}