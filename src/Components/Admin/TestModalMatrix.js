/* eslint-disable no-loop-func */
import { Button, Chip, Fab, FormLabel, IconButton, ImageList, ImageListItem, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from "react";
import produce from "immer";
import ModalImage from "./ModalImage";
import { DrawMatrixModal } from "./Admin_CreateTestModal/DrawMatrixModal";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { Mode, Upload, UploadFile } from "@mui/icons-material";


export default function TestModalMatrix(props) {
  const selectedQuestion = props.selectedQuestion;
  const testData = props.testData;
  const [qMatrix, setQMatrix] = useState({ "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "" });
  const [aMatrix, setAMatrix] = useState({ "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "" });
  const [markedSolution, setMarkedSolution] = useState(-1);
  const [selectedChip, setSelectedChip] = useState(1);

  //Draw matrix modal stuff
  const [childModalOpen, setChildModalOpen] = useState(false);
  const [caller, setCaller] = useState({isQuestion:false,idx:-1}); //tracks who invoked the childModal so the drawn image is saved in the proper place
  const [clipboard, setClipboard] = useState([]);


  const difficultyChips = [
    { key: 1, label: "Easy", color: "primary" }, { key: 2, label: "Medium", color: "secondary" }, { key: 3, label: "Hard", color: "error" }
  ];

  

  //UPDATE VIEW TO MATCH API
  useEffect(() => {
    const qi = testData.questions[selectedQuestion - 1].questionImages || {};
    setQMatrix({ ...qMatrix, ...qi })

    const ai = testData.questions[selectedQuestion - 1].answerImages || {};
    setAMatrix({ ...aMatrix, ...ai })

    setMarkedSolution(testData.questions[selectedQuestion - 1]["correct_answer"] || -1);

    //Welcome to programming 101. I could have just made the name as keys, but I moved this
    //from the settings component and couldn't be bothered. I just want to sleep
    const d = testData.questions[selectedQuestion - 1].difficulty;
    let x;
    if (d === "Easy") x = 1; else if (d === "Medium") x=2; else if (d === "Hard") x=3;
    setSelectedChip(x);
  }, [selectedQuestion]);

  //HANDLE QUESTION UPLOAD
  const handleQUpload = (e, i) => {
    let uploadedImage = e.target.files[0];
    // setQMatrix({ ...qMatrix, [`${i}`]: URL.createObjectURL(uploadedImage) });

    //Uploads as base64 image, no URLs involved
    const reader = new FileReader();
    reader.readAsDataURL(uploadedImage);
    reader.onload = function () {
      const base64String = reader.result;
      console.log(base64String)
      setQMatrix({ ...qMatrix, [`${i}`]:base64String });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  //HANDLE ANSWER UPLOAD
  const handleAUpload = (e, i) => {
    let uploadedImage = e.target.files[0];
    // setAMatrix({ ...aMatrix, [`${i}`]: URL.createObjectURL(uploadedImage) });

    //Uploads as base64 image, no URLs involved
    const reader = new FileReader();
    reader.readAsDataURL(uploadedImage);
    reader.onload = function () {
      const base64String = reader.result;
      console.log(base64String)
      setAMatrix({ ...aMatrix, [`${i}`]:base64String });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  //Yes, these two above could be merged with one extra param, I just like to be more explicit like this

  //UPDATE QUESTION MATRIX WITH NEW UPLOADED IMAGE
  useEffect(() => {
    const newState = produce(testData, (draft) => {
      draft.questions[selectedQuestion - 1].questionImages = qMatrix;
    })
    props.setTestData(newState); 
  },[qMatrix]);

  //UPDATE ANSWER MATRIX WITH NEW UPLOADED IMAGE
  useEffect(() => {
    const newState = produce(testData, (draft) => {
      draft.questions[selectedQuestion - 1].answerImages = aMatrix;
    })
    props.setTestData(newState);
  }, [aMatrix]);

  //UPDATE CORRECT ANSWER
  useEffect(() => {
    const newState = produce(testData, (draft) => {
      draft.questions[selectedQuestion - 1]["correct_answer"] = markedSolution;
    })
    props.setTestData(newState);
  },[markedSolution]);

  //HANDLE DIFFICULTY
  const handleDifficulty = (k) => {
    setSelectedChip(k);
  }

  //UPDATE DIFFICULTY IN API
  useEffect(() => {
    const newState = produce(testData, (draft) => {
      if (difficultyChips[selectedChip - 1]!==undefined)
        draft.questions[selectedQuestion - 1]["difficulty"] = difficultyChips[selectedChip-1].label;
    })
    props.setTestData(newState);
  }, [selectedChip]);


  //HANDLE DRAWING MATRIX INSTEAD OF UPLOADING 
  const handleDrawMatrix = (isQ, idx) => {
    setCaller({isQuestion:isQ, idx:idx})
    setChildModalOpen(true)
  }


  const inputFileRef = useRef(null);
  //RENDER QUESTIONS
  const generateQMatrix = () => {
    let qs = []
    for (let i = 1; i <= 8; i++) {
      qs.push(
        <ImageListItem key={i} className="qm-ImageList">
          <Box className="modal-questionMatrix">
            {qMatrix[`${i}`] ?
              // <img alt={`qMatrix-${i}`} width="96px" style={{ objectFit: "contain", maxHeight: "96px" }} src={qMatrix[`${i}`]} />
              <ModalImage isQuestion={true} alt={`qMatrix-${i}`} src={qMatrix[`${i}`]} setQMatrix={setQMatrix} idx={i} />
              :
              <>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <>
                      <Fab size="small" className="questionAddImageBtn" {...bindTrigger(popupState)}>
                        <IconButton component="label"><AddIcon sx={{ color: '#9f9f9f' }} /></IconButton>
                      </Fab>
                      <Menu {...bindMenu(popupState)}>

                        <MenuItem>
                          <Button fullWidth startIcon={<UploadFile />} onClick={() => { inputFileRef.current.click(); }} style={{ color: '#2b2b2b' }}>
                            <input ref={inputFileRef} id={`q-${i}`} type="file" accept="image/*" onChange={(e) => handleQUpload(e, i)} hidden /> Upload Image
                          </Button>
                        </MenuItem>

                        <MenuItem>
                          <Button fullWidth startIcon={<Mode />} onClick={() => { handleDrawMatrix(true, i); popupState.close(); }} style={{ color: '#2b2b2b', textAlign:'left' }}>
                            Draw
                          </Button>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </PopupState>

              </>

            }
          </Box>
        </ImageListItem>
      )
    }
    return qs;
  }

  const questionMatrix = () => {
    return (
      <Box display="flex" flexDirection="column" flexGrow="1">
        <Typography variant="h6">{`Item ${selectedQuestion}`}</Typography>
        <Box sx={{ backgroundColor: "#f5f5f5", flexGrow: 1, p: 4 }}>
          <Box display="flex" justifyContent="center">

            <ImageList cols={3} gap={10}>
              {generateQMatrix()}

              <ImageListItem className="qm-ImageList"><Box className="modal-questionMatrix qm-placeholder"></Box></ImageListItem>
            </ImageList>
          </Box>
        </Box>
      </Box>)
  }


  //RENDER ANSWERS
  const generateAMatrix = () => {
    let as = []
    for (let i = 1; i <= 8; i++) {
      as.push(
        <ImageListItem key={i} className="qm-ImageList">
          <Box className={markedSolution === i ? "modal-questionMatrix greenBorder" : "modal-questionMatrix greyBorder"}>
            {aMatrix[`${i}`] ?
              <ModalImage isQuestion={false} alt={`aMatrix-${i}`} src={aMatrix[`${i}`]} setMarkedSolution={setMarkedSolution} setAMatrix={setAMatrix} idx={i} />
              :
              <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <>
                      <Fab size="small" className="questionAddImageBtn" {...bindTrigger(popupState)}>
                        <IconButton component="label"><AddIcon sx={{ color: '#9f9f9f' }} /></IconButton>
                      </Fab>
                    <Menu {...bindMenu(popupState)}>

                      <MenuItem><Button fullWidth startIcon={<UploadFile />} onClick={() => { inputFileRef.current.click(); }} style={{ color: '#2b2b2b' }} >
                          <input ref={inputFileRef} id={`a-${i}`} type="file" accept="image/*" onChange={(e) => handleAUpload(e, i)} hidden /> Upload Image
                        </Button></MenuItem>

                        <MenuItem>
                        <Button fullWidth startIcon={<Mode />} onClick={() => { handleDrawMatrix(false, i); popupState.close(); }} style={{ color: '#2b2b2b' }} >
                            Draw
                          </Button>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </PopupState>
            }
          </Box>


        </ImageListItem>
      )
    }
    return as;
  }

  const answerMatrix = () => {
    return (
      <Box display="flex" flexDirection="column" flexGrow="1">
        <Typography variant="h6" sx={{ px: 4 }}>Solutions</Typography>
        <Box sx={{ px: 4, py: 1 }}>
          <Box display="flex" justifyContent="center">
            <ImageList cols={4} gap={9} sx={{overflow:'hidden', p:'7px'}}>
              {generateAMatrix()}
            </ImageList>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" flexGrow="1" alignItems="center" justifyContent="flex-start" sx={{mx:4}}>
          <FormLabel component="legend" sx={{ minWidth: '80px', alignSelf: 'center' }}>Difficulty: </FormLabel>
          <Stack direction="row" size="small" spacing="8px">
            {difficultyChips.map(c => <Chip key={c.key} label={c.label} color={selectedChip === c.key ? c.color : 'default'} onClick={() => setSelectedChip(c.key)} />)}

          </Stack>
        </Box>



      </Box>)
  }

  return (
    <Box id="modal-matrixContainer">
      {questionMatrix()}
      {answerMatrix()}
      {childModalOpen && <DrawMatrixModal childModalOpen={childModalOpen} setChildModalOpen={setChildModalOpen} 
        setQMatrix={setQMatrix} setAMatrix={setAMatrix}
        caller={caller}
        clipboard={clipboard} setClipboard={setClipboard}
      />}
    </Box>
  );
}