import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from "react";
import zIndex from "@mui/material/styles/zIndex";

export default function ModalImage(props) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    console.log("Mouse over");
    setHovered(true);
  }

  const handleMouseLeave = () => {
    console.log("Mouse leave");
    setHovered(false);
  }

  const markSolution = () => {
    console.log(`Marking ${props.idx} as solution`);
    props.setMarkedSolution(props.idx);
  }

  const deleteImage = () => {
    console.log("image deleted");

  }


  return (<>
    <Box
      sx={{ display: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
     
    >
      <img
        alt={props.alt}
        width="96px"
        style={{ objectFit: "contain", maxHeight: "96px" }}
        src={props.src}
      />
  
      <Box hidden={!hovered} sx={{ position: 'absolute', left:0,top:0,  width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <Box height="inherit" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1}>
          <Button variant="contained" color="success" size="medium" onClick={markSolution} ><CheckCircleOutlineIcon /></Button>
          <Button variant="contained" color="error" size="medium" onClick={deleteImage}><DeleteIcon /></Button>
        </Box>
      </Box>
    
    </Box>
    </>);
}