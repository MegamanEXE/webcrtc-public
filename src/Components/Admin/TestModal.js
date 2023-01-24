import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
};

export default function TestModal({ setModalOpen, modalOpen }) {
  //const [open, setOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  }

  return (<Modal
    className="testModal"
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={modalOpen}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={modalOpen}>
      <Box sx={style} id="modalMainContainer" component="div">

        <Box id="modalHeader" bgcolor="lightblue" >
          <Box>Standard APM Test</Box>
          <Box>
            <IconButton size="small" aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 5, top: 5 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>


        <Box id="modalContent" flexGrow={1} bgcolor="cyan">
          <Box id="testSettings" bgcolor="lightcoral">
            Hello it me
          </Box>
          <Box id="mainContent">
            <Box id="leftFrame" bgcolor="lightgreen">yo it me</Box>
            <Box id="rightFrame" bgcolor="blueviolet">most stuff here</Box>
          </Box>
        </Box>
        <Box id="modalActions">3</Box>


      </Box>
    </Fade>

  </Modal>
  )
}