import { Fab, IconButton, ImageList, ImageListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from "react";


export default function TestModalMatrix(props) {
  const selectedQuestion = props.selectedQuestion;
  const testData = props.testData;
  const [qMatrix, setQMatrix] = useState({ "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "" });
  const [aMatrix, setAMatrix] = useState({ "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "" });

  useEffect(() => {
    const qi = testData.questions[selectedQuestion - 1].questionImages || {};
    setQMatrix({ ...qMatrix, ...qi })
  }, [selectedQuestion]);

  const handleUpload = (e, i) => {
    let uploadedImage = e.target.files[0];
    setQMatrix({ ...qMatrix, [`${i}`]: uploadedImage });
  }

  const generateQMatrix = () => {
    //If question images exist along with their positions
    // let qi = testData.questions[selectedQuestion - 1].questionImages || {};
    // if (Object.keys(qi).length !== 0) {
    //   for (const k in qi) {
    //     if (qi[k]) {
    //       setQMatrix(prevState => { 
    //         // console.log({...prevState, [k]: qi[k] })
    //         return { ...prevState, [k]: qi[k] } })
    //     }
    //   }
    // }


    //500 iq (standard) way, leaving the above just in case
    //This just merges directly from the API to the state because they have the same format
    // setQMatrix({...qMatrix, ...qi})


    let qs = []
    for (let i = 1; i <= 8; i++) {
      qs.push(
        <ImageListItem key={i} className="qm-ImageList">
          <Box className="modal-questionMatrix">
            {qMatrix[`${i}`] ?
              <img alt={`qMatrix-${i}`} width="100px" style={{ objectFit: "contain", maxHeight: "100px" }} src={qMatrix[`${i}`] || URL.createObjectURL(qMatrix[`${i}`])} />
              :
              <Fab size="small" className="questionAddImageBtn">
                <IconButton component="label"><input id={`q-${i}`} type="file" accept="image/*" onChange={(e) => handleUpload(e, i)} hidden /><AddIcon sx={{ color: '#9f9f9f' }} /></IconButton>
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

  const answerMatrix = () => {
    return (
      <Box display="flex" flexDirection="column" flexGrow="1">
        <Typography variant="h6" sx={{ px: 4 }}>Solutions</Typography>
        <Box sx={{ px: 4, py: 1 }}>
          <Box display="flex" justifyContent="center">
            <ImageList cols={4} gap={10}>
              <ImageListItem className="qm-ImageList"><Box className="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box className="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box className="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box className="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>

              <ImageListItem className="qm-ImageList"><Box className="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box className="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box className="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box className="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
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