import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from "react";
import zIndex from "@mui/material/styles/zIndex";
import produce from "immer";
import Image from "mui-image";

export default function ModalImage(props) {
  const [hovered, setHovered] = useState(false);
  const isQ = props.isQuestion;

  const handleMouseEnter = () => {
    // console.log("Mouse over");
    setHovered(true);
  }

  const handleMouseLeave = () => {
    // console.log("Mouse leave");
    setHovered(false);
  }

  const markSolution = () => {
    console.log(`Marking ${props.idx} as solution`);
    props.setMarkedSolution(props.idx);
  }

  const deleteImage = () => {
    console.log("image deleted");
    if (isQ) {
      props.setQMatrix(prev => produce(prev, (draft) => {
        draft[props.idx] = ""
      }));
    } else {
      props.setAMatrix(prev => produce(prev, (draft) => {
        draft[props.idx] = ""
      }));
    }
  } //heckin' love immer now


  return (<>
    <Box
      sx={{ display: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

    >
      <Image
        alt={props.alt}
        width="96px"
        style={{ objectFit: "contain", maxHeight: "80px" }}
        src={props.src}
        duration={50}
        showLoading
      />

      <Box hidden={!hovered} sx={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Box height="inherit" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1}>
          {!isQ && <Button variant="contained" color="success" size="medium" onClick={markSolution} ><CheckCircleOutlineIcon /></Button>}
          <Button variant="contained" color="error" size="medium" onClick={deleteImage}><DeleteIcon /></Button>
        </Box>
      </Box>

    </Box>
  </>);
}