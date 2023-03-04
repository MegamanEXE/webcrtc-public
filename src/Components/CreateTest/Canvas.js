import { Box, Button, Grid, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import '../../App.css'
import Toolbox from "./Toolbox";
import RightBar from "./RightBar"
import produce from "immer";
import { nanoid } from "nanoid";
import { DEFAULTS, SHAPE_TYPES } from "./ShapesData";
import Matrix from "./Matrix";
import { SubmitModal } from "./SubmitModal";

export default function Canvas() {

  const [selectedShapeID, setSelectedShapeID] = useState(null);
  const shapeNode = useRef(null); //Avoid using unnecesarrily, update state instead of calling Konva node methods to set anything
  const stageNode = useRef(null); //stageRef alreadys exists in Matrix.js so I don't want to mess with it because of past experience, this is like a global stageRef

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

  const [screenshots, setScreenshots] = useState({
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '7': null,
    '8': null,
    '9': null,
  });

  //Set this in events to properly update what matrix is being used. Is helpful in general
  //to implement matrix features. Remember, a proper value for this is a string, not an int
  const [selectedMatrix, setSelectedMatrix] = useState("1");
  const [clipboard, setClipboard] = useState([]);

  //Submission
  const [modalOpen, setModalOpen] = useState(false);


  const passProps = {
    selectedShapeID: selectedShapeID, setSelectedShapeID: setSelectedShapeID,
    shapes: shapes, setShapes: setShapes,
    selectedMatrix: selectedMatrix,
    shapeNode: shapeNode, stageNode: stageNode,
    clipboard: clipboard, setClipboard: setClipboard,
  }

  const handleSubmit = () => {
    setModalOpen(true);

    //Make screenshots of shapes
  }

  const generateGridItems = () => {
    let gridItems = []
    for (let i = 1; i <= 9; i++) {
      gridItems.push(<Grid item className="gridMatrix" key={`matrixKey-${i}`} xs={4}>
        <Matrix id={`matrix-${i}`} shapes={shapes[i.toString()]}
          setShapes={setShapes} selectedShapeID={selectedShapeID} setSelectedShapeID={setSelectedShapeID}
          selectedMatrix={selectedMatrix} setSelectedMatrix={setSelectedMatrix}
          shapeNode={shapeNode} stageNode={stageNode}
          clipboard={clipboard} setClipboard={setClipboard}
        />
      </Grid>);
    }

    return gridItems;
  }


  return (
    <Box id="canvasContainer">

      <Box id="toolbox" >
        <Toolbox {...passProps} />
      </Box>



      <Box id="canvasMiddleCol">
        <Box id="canvasWorkspace" my={1.5} p={1.5} >
          <Grid container spacing={2} columns={12}>
            {generateGridItems()}
          </Grid>
        </Box>

        <Box id="canvasSubmit">
          <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
        </Box>

      </Box>


      <Box id="rightBar">
        <RightBar {...passProps} />
      </Box>

    {modalOpen && <SubmitModal modalOpen={modalOpen} setModalOpen={setModalOpen}  />}
    </Box>
    
    );

}

