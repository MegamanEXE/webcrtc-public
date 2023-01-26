import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import TestModalQuestions from './TestModalQuestions';
import TestModalSettings from './TestModalSettings';
import TestModalMatrix from './TestModalMatrix';
import { useEffect, useState } from 'react';

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

export default function TestModal({ setModalOpen, modalOpen, testData, setTestData }) {
  const [selectedQuestion, setSelectedQuestion] = useState(1);


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

        <Box id="modalHeader" >
          <Box>Standard APM Test</Box>
          <Box>
            <IconButton size="small" aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 5, top: 5 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>




        <Box id="modalContent" flexGrow={1}>
          <Box id="testSettings">
            <TestModalSettings />
          </Box>
          <Box id="mainContent">
            <Box id="leftFrame"><TestModalQuestions testData={testData} selectedQuestion={selectedQuestion} setSelectedQuestion={setSelectedQuestion} setTestData={setTestData} /></Box>
            <Box id="rightFrame"><TestModalMatrix testData={testData} selectedQuestion={selectedQuestion} setSelectedQuestion={setSelectedQuestion} setTestData={setTestData} /></Box>
          </Box>

        </Box>




        <Box id="modalActions">
          <Button sx={{ mx: 2 }}>Cancel</Button>
          <Button><strong>Save Test</strong></Button>
        </Box>


      </Box>
    </Fade>

  </Modal>
  )
}