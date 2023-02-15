import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import '../../App.css'
import Toolbox from "./Toolbox";
import RightBar from "./RightBar"
import produce from "immer";
import { nanoid } from "nanoid";
import { DEFAULTS, SHAPE_TYPES } from "./ShapesData";
import Matrix from "./Matrix";

export default function Canvas() {
  
  const [selectedShape, setSelectedShape] = useState(null);

  
  

  //Lift these up to CreateTestContainer later for submit button
  //Nothing wrong with being explicit. This way is easier to debug
  const [shapes, setShapes] = useState({
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': [],
  });


  return (
    <Box id="canvasContainer">

      <Box id="toolbox" >
        <Toolbox />
      </Box>


      <Box id="canvasWorkspace" my={1.5} p={1.5} >
        <Matrix id="matrix-1" shapes={shapes['1']} setShapes={setShapes} />
        <Matrix id="matrix-2" shapes={shapes['2']} setShapes={setShapes} />
        <Matrix id="matrix-3" shapes={shapes['3']} setShapes={setShapes} />


      </Box>


      <Box id="rightBar">
        <RightBar />
      </Box>


    </Box>);

}

