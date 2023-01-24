import { Fab, ImageList, ImageListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';


export default function TestModalMatrix() {
  const questionMatrix = () => {
    return (
      <Box display="flex" flexDirection="column" flexGrow="1">
        <Typography variant="h6">Item 1</Typography>
      <Box sx={{ backgroundColor: "#f5f5f5", flexGrow: 1, p: 4 }}>
        <Box display="flex" justifyContent="center">
          <ImageList cols={3} gap={10}>
            <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
            <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
            <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>

            <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
            <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
            <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>

            <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
            <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
            <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix qm-placeholder"></Box></ImageListItem>
          </ImageList>
        </Box>
      </Box>
    </Box>)
  }

  const answerMatrix = () => {
    return (
      <Box display="flex" flexDirection="column" flexGrow="1">
        <Typography variant="h6" sx={{px:4}}>Solutions</Typography>
        <Box sx={{ px: 4, py: 1 }}>
          <Box display="flex" justifyContent="center">
            <ImageList cols={4} gap={10}>
              <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>

              <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
              <ImageListItem className="qm-ImageList"><Box class="modal-questionMatrix"><Fab size="small" className="questionAddImageBtn"><AddIcon sx={{ color: '#9f9f9f' }} /></Fab></Box></ImageListItem>
            </ImageList>
          </Box>
        </Box>
      </Box>)
  }

  return (<>
    <Box id="modal-matrixContainer">
      {questionMatrix()}
      {answerMatrix()}
    </Box>
  </>);
}