import { Box, Grid, Paper } from "@mui/material";
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

  const [selectedShapeID, setSelectedShapeID] = useState(null);
  const shapeNode = useRef(null); //Avoid using unnecesarrily

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

  //Set this in events to properly update what matrix is being used. Is helpful in general
  //to implement matrix features. Remember, a proper value for this is a string, not an int
  const [selectedMatrix, setSelectedMatrix] = useState("1");

  const generateGridItems = () => {
    let gridItems = []
    for (let i = 1; i <= 9; i++) {
      gridItems.push(<Grid item className="gridMatrix" key={`matrixKey-${i}`} xs={4}>
        <Matrix id={`matrix-${i}`} shapes={shapes[i.toString()]} 
          setShapes={setShapes} selectedShapeID={selectedShapeID} setSelectedShapeID={setSelectedShapeID} 
          selectedMatrix={selectedMatrix} setSelectedMatrix={setSelectedMatrix} 
          shapeNode={shapeNode}
           />
      </Grid>);
    }

    return gridItems;
  }

  return (
    <Box id="canvasContainer">

      <Box id="toolbox" >
        <Toolbox selectedShapeID={selectedShapeID} shapes={shapes} setShapes={setShapes} selectedMatrix={selectedMatrix} shapeNode={shapeNode} />
      </Box>


      <Box id="canvasWorkspace" my={1.5} p={1.5} >
        <Grid container spacing={2} columns={12}>
          {generateGridItems()}
        </Grid>


      </Box>


      <Box id="rightBar">
        <RightBar selectedShapeID={selectedShapeID} shapes={shapes} setShapes={setShapes} selectedMatrix={selectedMatrix} />
      </Box>


    </Box>);

}

