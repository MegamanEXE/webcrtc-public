import { Fab, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from "react";
import produce from "immer";
import { DeleteForever } from "@mui/icons-material";
import ModalImage from "./ModalImage";


export default function TestModalMatrix(props) {
  const selectedQuestion = props.selectedQuestion;
  const testData = props.testData;
  const [qMatrix, setQMatrix] = useState({ "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "" });
  const [aMatrix, setAMatrix] = useState({ "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "" });
  const [markedSolution, setMarkedSolution] = useState(-1);

  //Updates view to match data from API
  useEffect(() => {
    const qi = testData.questions[selectedQuestion - 1].questionImages || {};
    setQMatrix({ ...qMatrix, ...qi })

    const ai = testData.questions[selectedQuestion - 1].answerImages || {};
    setAMatrix({ ...aMatrix, ...ai })

    setMarkedSolution(testData.questions[selectedQuestion - 1]["correct_answer"] || -1);
  }, [selectedQuestion]);

  const handleQUpload = (e, i) => {
    let uploadedImage = e.target.files[0];
    setQMatrix({ ...qMatrix, [`${i}`]: URL.createObjectURL(uploadedImage) });
  }

  const handleAUpload = (e, i) => {
    let uploadedImage = e.target.files[0];
    setAMatrix({ ...aMatrix, [`${i}`]: URL.createObjectURL(uploadedImage) });
  }
  //Yes, these two above could be merged with one extra param, I just like to be more explicit like this

  useEffect(() => {
    const newState = produce(testData, (draft) => {
      draft.questions[selectedQuestion - 1].questionImages = qMatrix;
    })
    props.setTestData(newState); 
  },[qMatrix]);

  //Update correct answer
  useEffect(() => {
    const newState = produce(testData, (draft) => {
      draft.questions[selectedQuestion - 1]["correct_answer"] = markedSolution;
    })
    props.setTestData(newState);
  },[markedSolution]);

  const generateQMatrix = () => {
    let qs = []
    for (let i = 1; i <= 8; i++) {
      qs.push(
        <ImageListItem key={i} className="qm-ImageList">
          <Box className="modal-questionMatrix">
            {qMatrix[`${i}`] ?
              // <img alt={`qMatrix-${i}`} width="96px" style={{ objectFit: "contain", maxHeight: "96px" }} src={qMatrix[`${i}`]} />
              <ModalImage isQuestion={true} alt={`qMatrix-${i}`} src={qMatrix[`${i}`]} setQMatrix={setQMatrix} idx={i}  />
              :
              <Fab size="small" className="questionAddImageBtn">
                <IconButton component="label"><input id={`q-${i}`} type="file" accept="image/*" onChange={(e) => handleQUpload(e, i)} hidden /><AddIcon sx={{ color: '#9f9f9f' }} /></IconButton>
              </Fab>
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



  const generateAMatrix = () => {
    let as = []
    for (let i = 1; i <= 8; i++) {
      as.push(
        <ImageListItem key={i} className="qm-ImageList">
          <Box className={markedSolution === i ? "modal-questionMatrix greenBorder" : "modal-questionMatrix greyBorder"}>
            {aMatrix[`${i}`] ?
              <ModalImage isQuestion={false} alt={`aMatrix-${i}`} src={aMatrix[`${i}`]} setMarkedSolution={setMarkedSolution} setAMatrix={setAMatrix} idx={i} />
              :
              <Fab size="small" className="questionAddImageBtn">
                <IconButton component="label"><input id={`a-${i}`} type="file" accept="image/*" onChange={(e) => handleAUpload(e, i)} hidden /><AddIcon sx={{ color: '#9f9f9f' }} /></IconButton>
              </Fab>
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
      </Box>)
  }

  return (
    <Box id="modal-matrixContainer">
      {questionMatrix()}
      {answerMatrix()}
    </Box>
  );
}