import { Button, Fade, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import AdminCanvas from './AdminCanvas'
import { useState } from "react";

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

export function DrawMatrixModal({childModalOpen, setChildModalOpen, setQMatrix, setAMatrix, caller, clipboard, setClipboard}){


  const [screenshots, setScreenshots] = useState({
    '1': null,
  });


  const passProps={
    setModalOpen:setChildModalOpen,
    screenshots: screenshots, setScreenshots:setScreenshots,
    clipboard: clipboard, setClipboard: setClipboard,
    setQMatrix: setQMatrix, setAMatrix:setAMatrix, caller:caller
  };

  return (
  <Modal
    className="testModal"
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={childModalOpen}
    onClose={() => setChildModalOpen(false)}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={childModalOpen}>
      <Box sx={style} id="modalMainContainer" component="div">

        <Box id="modalHeader" >
          <Typography variant="h6">Draw a Matrix</Typography>
          <Box>
            <IconButton size="small" aria-label="close" onClick={()=>setChildModalOpen(false)} sx={{ position: 'absolute', right: 5, top: 5 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>




        <Box id="modalContent" flexGrow={1}>
          <AdminCanvas {...passProps} />
        </Box>



      </Box>
    </Fade>

  </Modal>
  )
}