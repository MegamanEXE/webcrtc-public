import { Button, Fade, Grid, IconButton, ListItemIcon, Menu, MenuItem, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Image from "mui-image";
import { useState } from "react";
import { useEffect } from "react";
import mockTestResults_Images from "../../data/mockTestResults_Images.json"
import { Code, DeleteForever, Photo } from "@mui/icons-material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { GrDocumentWord, GrDocumentPdf } from "react-icons/gr";
import { getImageSize } from "react-image-size";
import mergeImages from "merge-images";

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

export function ViewTestModal(props){
  const rowData = props.rowData.current; //the main data to show. Is a ref
  const [imageData, setImageData] = useState(null)


  //LOAD IMAGES FROM API/mockTestResults_Images
  useEffect(() => {
    //Get submission images only for the current row
    const idx = mockTestResults_Images.findIndex(i => i.id === rowData.id);
    setImageData(mockTestResults_Images[idx]);
  }, [imageData]);

  //MERGE IMAGES INTO ONE FOR EXPORT
  const joinImages = () => {
    if (!imageData) return;

    const images = imageData["createTest"].submission;
    const gap = 8;
    getImageSize(imageData["createTest"].submission['1'])
      .then(({ width, height }) => {
        mergeImages([
          { src: images['1'], x: 0, y: 0 },
          { src: images['2'], x: width+gap, y: 0 },
          { src: images['3'], x: (width + gap)*2, y: 0 },
          { src: images['4'], x: 0, y: height + gap },
          { src: images['5'], x: width + gap, y: height + gap },
          { src: images['6'], x: (width + gap)*2, y: height + gap },
          { src: images['7'], x: 0, y: (height + gap)*2 },
          { src: images['8'], x: width + gap, y: (height + gap) * 2 },
          { src: images['9'], x: (width + gap) * 2, y: (height + gap) * 2 },
        ], { width: width * 3 + (3 * gap), height: height * 3 + (3 * gap) })
          .then(b64 => {
            console.log(b64);
            const downloadLink = document.createElement("a");
            downloadLink.href = b64;
            downloadLink.download = "userMatrix-"+rowData.id;
            downloadLink.click();
          })
      });
  }

  const handleExport = (popupState) => {
    joinImages();
    popupState.close();
  }


  //LEFT HALF
  const submissionimages = () => {
    if(!imageData) return;

    // console.log(rowData)
    let si = [];
    for (let i = 1; i <= 9; i++) {
      si.push(<Grid item className="gridMatrix" key={`submission-${i}`} xs={3} >
        <Image src={imageData["createTest"].submission[`${i}`]} 
          bgColor={"lightgray"}
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

  //RIGHT HALF
  const testDetails = () => {
    return (<>
      <Typography variant="h6">ID: {rowData.id}</Typography>
      <Typography variant="h4"><strong>{rowData.name}</strong></Typography>
      <Typography variant="h4" my={4}><strong>Score:</strong> {rowData.score}</Typography>

      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow sx={{ '.MuiTableCell-root': { border: 0 } }}>
              <TableCell align="right" style={{ width: 150, borderBottom:'none' }}><Typography variant="h5"><strong>TEST:</strong></Typography></TableCell>
              <TableCell align="left"><Typography variant="h5">{rowData.test}</Typography></TableCell>
            </TableRow>

            <TableRow sx={{ '.MuiTableCell-root': { border: 0 } }}>
              <TableCell align="right" style={{ width: 150 }}><Typography variant="h5"><strong>CLIENT:</strong></Typography></TableCell>
              <TableCell align="left"><Typography variant="h5">{rowData.client}</Typography></TableCell>
            </TableRow>

            <TableRow sx={{ '.MuiTableCell-root': { border: 0 } }}>
              <TableCell align="right" style={{ width: 150 }}><Typography variant="h5"><strong>DATE:</strong></Typography></TableCell>
              <TableCell align="left"><Typography variant="h5">{rowData.date}</Typography></TableCell>
            </TableRow>

            <TableRow sx={{ '.MuiTableCell-root': { border: 0 } }}>
              <TableCell align="right" style={{ width: 150 }}><Typography variant="h5"><strong>TIME:</strong></Typography></TableCell>
              <TableCell align="left"><Typography variant="h5">{rowData.time}</Typography></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>

      <Stack sx={{flexDirection:'row', my:5}} gap={2}>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <Button size="large" {...bindTrigger(popupState)}>
                Export
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={()=>handleExport(popupState)}><ListItemIcon><Photo fontSize="small" /></ListItemIcon>Picture</MenuItem>
                {/* <MenuItem onClick={popupState.close}><ListItemIcon><Code fontSize="small" /></ListItemIcon>  XML</MenuItem> */}
              </Menu>
            </>
          )}
        </PopupState>

        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <Button size="large" {...bindTrigger(popupState)}>
                Generate Report
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}><ListItemIcon><GrDocumentWord /></ListItemIcon>Word</MenuItem>
                <MenuItem onClick={popupState.close}><ListItemIcon><GrDocumentPdf /></ListItemIcon>PDF</MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      </Stack>
    </>);
  }


  return (
    <>
      {rowData && <Modal
        className="testModal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalOpen}
        onClose={()=>props.setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalOpen}>
          <Box sx={style} id="modalMainContainer" component="div">

            <Box id="modalHeader" >
              <Typography variant="h5">Test Preview</Typography>
              <Box>
                <IconButton size="small" aria-label="close" onClick={() => props.setModalOpen(false)} sx={{ position: 'absolute', right: 5, top: 5 }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>




            <Box id="modalContent" flexGrow={1}>
              <Box flexGrow={1} sx={{display:'flex', flexDirection:'row'}}>

                <Box id="previewMatrix" style={{margin:'inherit'}}>
                  <Grid container rowSpacing={3} columns={9} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    {submissionimages()}
                  </Grid>
                </Box>

                <Box id="testDetails">
                  {testDetails()}
                </Box>
              </Box>


            </Box>




            
            <Box id="modalActions">
              <Button color="error"><DeleteForever /><strong>Delete Test</strong></Button>
            </Box>
            


          </Box>
        </Fade>

      </Modal>}
    </>
  
  
  )
}