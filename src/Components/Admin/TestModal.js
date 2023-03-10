import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TestModalQuestions from './TestModalQuestions';
import TestModalSettings from './TestModalSettings';
import TestModalMatrix from './TestModalMatrix';
import { useEffect, useRef, useState } from 'react';

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

export default function TestModal({ setModalOpen, modalOpen, selectedTest,  setSelectedTest }) {
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  const commentsRef = useRef(null); //in settings
  const locRef = useRef(null); //in settings

  let firstTimeOpened = useRef(false); 
  let unalteredTestData = useRef(selectedTest); //if modifications are not saved
  useEffect(() => {
    if(!firstTimeOpened.current){
      firstTimeOpened.current = true;
      unalteredTestData.current = selectedTest;
    }   
  },);


  const handleClose = () => {
    setModalOpen(false);
  }

  const handleCancel = () => {
    setSelectedTest(unalteredTestData.current);
    setModalOpen(false);
  }

  //UPDATE IN API HERE
  const handleSave = () => {
    if(commentsRef.current.value !== ""){
      setSelectedTest({...selectedTest, comments:commentsRef.current.value});
    }
    if(locRef.current){
      setSelectedTest({ ...selectedTest, loc_name:locRef.current });
    }
    setModalOpen(false);
  }

  const passProps = {
    testData: selectedTest,
    setTestData: setSelectedTest,
    selectedQuestion: selectedQuestion,
    setSelectedQuestion: setSelectedQuestion,
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
          <Box>{selectedTest["test_name"]}</Box>
          <Box>
            <IconButton size="small" aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 5, top: 5 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>


        <Box id="modalContent" flexGrow={1}>

          <Box id="testSettings">
            <TestModalSettings commentsRef={commentsRef} locRef={locRef} selectedTest={selectedTest} setSelectedTest={setSelectedTest} />
          </Box>

          <Box id="mainContent">
            <Box id="leftFrame"><TestModalQuestions {...passProps} /></Box>
            <Box id="rightFrame"><TestModalMatrix {...passProps} /></Box>
          </Box>

        </Box>


        <Box id="modalActions">
          <Button sx={{ mx: 2 }} onClick={()=>handleCancel()}>Cancel</Button>
          <Button onClick={() =>  handleSave()}><strong>Save Test</strong></Button>
        </Box>


      </Box>
    </Fade>

  </Modal>
  )
}