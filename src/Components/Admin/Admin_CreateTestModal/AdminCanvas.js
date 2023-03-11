import { Box, Button, Grid, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import '../../../App.css'
import RightBar from "../../CreateTest/RightBar"
import AdminMatrix from "./AdminMatrix";
import { TOOLS } from "../../CreateTest/ShapesData";
import { useCallback } from "react";
import produce from "immer";
import AdminToolbox from "./AdminToolbox";

export default function AdminCanvas({ setModalOpen, screenshots, setScreenshots, clipboard, setClipboard, setQMatrix, setAMatrix, caller }) {
  


  const [selectedShapeID, setSelectedShapeID] = useState(null);
  const shapeNode = useRef(null); //Avoid using unnecesarrily, update state instead of calling Konva node methods to set anything
  const stageNode = useRef(null); //Selected matrix's Konva stage node. 
  //Well, this should have been obsolete after making globalStageNodes and using globalStageNode[selectedMatrix], but I'll just leave it as it is.

  //Nothing wrong with being explicit like this. This just looked cleaner when I began.
  const [shapes, setShapes] = useState({
    '1': [],
  });

  //exclusively to make screenshots
  const globalStageNodes = useRef({
    '1': null,
  });

  

  //Set this in events to properly update what matrix is being used. Is helpful in general
  //to implement matrix features. Remember, a proper value for this is a string, not an int
  const [selectedMatrix, setSelectedMatrix] = useState("1");

  

  
  // const tool = useRef(TOOLS.MAGIC_BRUSH); //can only be null or TOOLS.NORMAL_BRUSH/TOOLS.MAGIC_BRUSH
  const [tool, setTool] = useState(TOOLS.SELECT); //can only be values from TOOLS.
  const prevTool = useRef(null);


  const passProps = {
    selectedShapeID: selectedShapeID, setSelectedShapeID: setSelectedShapeID,
    shapes: shapes, setShapes: setShapes,
    selectedMatrix: selectedMatrix,
    shapeNode: shapeNode, stageNode: stageNode,
    clipboard: clipboard, setClipboard: setClipboard,
    tool: tool, setTool:setTool,
  }

  //Take screenshots and open modal
  const handleSubmit = () => {
    console.log(caller)
    if(caller){
      if (caller.isQuestion) {
        setQMatrix(qm => ({ ...qm, [`${caller.idx}`]: globalStageNodes.current['1'].toDataURL() }));
      }
    }

    
    setModalOpen(false);
  }
  
  
  

  const generateGridItems = () => {
    let gridItems = []
    for (let i = 1; i <= 1; i++) {
      gridItems.push(<Grid item className="gridMatrix" key={`matrixKey-${i}`} xs={12}>
        <AdminMatrix id={`matrix-${i}`} shapes={shapes[i.toString()]}
          setShapes={setShapes} selectedShapeID={selectedShapeID} setSelectedShapeID={setSelectedShapeID}
          selectedMatrix={selectedMatrix} setSelectedMatrix={setSelectedMatrix}
          shapeNode={shapeNode} stageNode={stageNode}
          clipboard={clipboard} setClipboard={setClipboard}
          globalStageNodes={globalStageNodes}
          tool={tool} setTool={setTool}
        />
      </Grid>);
    }

    return gridItems;
  }


  return (
    <Box id="canvasContainer">

      <Box id="toolbox_admin" >
        <Box>
          <AdminToolbox {...passProps} />
        </Box>
      </Box>



      <Box id="canvasMiddleCol_admin">
        <Box id="canvasWorkspace_admin" my={1.5} p={1.5} >
          <Grid container spacing={2} columns={12}>
            {generateGridItems()}
          </Grid>
        </Box>

        <Box p={1.5}>
          <Box id="yesNo">
            <Button variant="contained" color="success" onClick={handleSubmit}>Save</Button>
            <Button variant="outlined">Cancel</Button>
          </Box>
        </Box>

      </Box>


      <Box id="rightBar_admin">
        <RightBar {...passProps} />
      </Box>

    </Box>
    
    );

}

