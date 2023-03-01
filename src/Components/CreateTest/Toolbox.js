import { Circle, CircleOutlined, ContentPaste, CopyAll, DiamondOutlined, Hexagon, HexagonOutlined, Icecream, LineStyle, Padding, RotateRight, Square, SquareOutlined, Texture } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Paper, Popover, ToggleButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import produce from "immer";
import { SHAPE_ACTIONS, SHAPE_TYPES, TEXTURES } from "./ShapesData";
import LineWeightIcon from '@mui/icons-material/LineWeight';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import { TbArrowsMaximize, TbArrowsMinimize, TbFlipHorizontal, TbFlipVertical, TbMaximize, TbMinusVertical, TbTriangle } from "react-icons/tb"
import { RxSlash } from "react-icons/rx"
import { nanoid } from "nanoid";
import { ShapeObject } from "./ShapeObjects";
import useImage from "use-image";
import { useEffect } from "react";
import { TEXTURE_IMAGES } from "./Textures";

const customIconSize = "1.5em";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const handleDragStart = (event) => {
  const type = event.currentTarget.attributes.shape.value;

  if (type) {
    // x,y coordinates of the mouse pointer relative to the position of the padding edge of the target node
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    // dimensions of the node on the browser
    const clientWidth = event.target.clientWidth;
    const clientHeight = event.target.clientHeight;

    const dragPayload = JSON.stringify({
      type,
      offsetX,
      offsetY,
      clientWidth,
      clientHeight,
    });

    // console.log(dragPayload)
    event.dataTransfer.setData("dragged_shape", dragPayload);
  }
};





export default function Toolbox(props) {
  const selectedShapeID = props.selectedShapeID;
  const shapes = props.shapes;
  const setShapes = props.setShapes;
  const selectedMatrix = props.selectedMatrix;
  const clipboard = props.clipboard;
  const setClipboard = props.setClipboard;


  //attr: fill or stroke
  const updateAttribute = (attr, value) => {
    const shapeIdx = shapes[selectedMatrix].findIndex(s => s.id === selectedShapeID);

    if (shapeIdx !== -1) {
      setShapes(prevState => produce(prevState, (draft) => {
        let d = draft[selectedMatrix][shapeIdx];
        d[attr] = value;
      }));
    }
  };


  //Line Weight
  const handleLineWeight = () => {
    const lineWeights = [2, 4, 6];

    if (selectedShapeID !== null) {
      let currentWeight = shapes[selectedMatrix].find(s => s.id === selectedShapeID).strokeWidth;
      let newIdx = -1;

      newIdx = lineWeights.findIndex(l => l === currentWeight);
      if (newIdx + 1 === lineWeights.length)
        newIdx = 0;
      else
        newIdx++;

      updateAttribute("strokeWidth", lineWeights[newIdx]);
    }
  }

  //Line style (dashed)
  const handleLineStyle = () => {
    const dashStyles = [[0, 0], [5, 2], [10, 5], [3,3]];

    if (selectedShapeID !== null) {
      let currentValue = shapes[selectedMatrix].find(s => s.id === selectedShapeID).dash;
      let newIdx = -1;

      newIdx = dashStyles.findIndex(l => JSON.stringify(l) === JSON.stringify(currentValue));
      if (newIdx + 1 === dashStyles.length)
        newIdx = 0;
      else
        newIdx++;

      updateAttribute("dash", dashStyles[newIdx]);
    }
  }

  //Flip Horizontal
  //Note: Seems easy enough but this caused me to refactor the code which resulted in a reduction of a few hundred lines 
  //of code to make this work as expected

  //TODO: Does it what it should, but buggy sometimes, fixing this should enable me to use 
  //useSingleNodeRotation(false) in GenericShape
  const handleFlipHorizontal = () => {
    if (selectedShapeID !== null) {
      const shape = shapes[selectedMatrix].find(s => s.id === selectedShapeID);

      const nodeBefore = props.shapeNode.current; //DOM Konva node
      const oldScaleX = nodeBefore.scaleX();
      // const cr = nodeBefore.getClientRect();

      // nodeBefore.offsetX(nodeBefore.width()/2)
      // nodeBefore.scaleX(-oldScaleX);
      // nodeBefore.offsetX(0)

      //This should be enough
      updateAttribute("scaleX", -oldScaleX);
      
      const nodeAfter = props.shapeNode.current;

      updateAttribute("x", nodeAfter.x());
      updateAttribute("y", nodeAfter.y());
      updateAttribute("rotation", nodeAfter.rotation());

      updateAttribute("width", shape.width);
      updateAttribute("height", shape.height);

      // console.log(`old: ${nodeBefore.x()}. new: ${nodeAfter.x()}`)
    
    }  
  }

  //Flip vertical (synchronize this with whatever changes in flipHorizontal)
  const handleFlipVertical = () => {
    if (selectedShapeID !== null) {
      const shape = shapes[selectedMatrix].find(s => s.id === selectedShapeID);

      const nodeBefore = props.shapeNode.current; //DOM Konva node
      const oldScaleY = nodeBefore.scaleY();
   
      updateAttribute("scaleY", -oldScaleY);

      const nodeAfter = props.shapeNode.current;

      updateAttribute("x", nodeAfter.x());
      updateAttribute("y", nodeAfter.y());
      updateAttribute("rotation", nodeAfter.rotation());

      updateAttribute("width", shape.width);
      updateAttribute("height", shape.height);
    }
  }

  //Rotate button
  const handleRotate = () => {
    if (selectedShapeID !== null) {
      const shape = shapes[selectedMatrix].find(s => s.id === selectedShapeID);

      const nodeBefore = props.shapeNode.current; //DOM Konva node
      let oldRotation = nodeBefore.rotation();
      if (oldRotation>=360) oldRotation -= 360; 

      updateAttribute("rotation", oldRotation+45);

      const nodeAfter = props.shapeNode.current;

      updateAttribute("x", nodeAfter.x());
      updateAttribute("y", nodeAfter.y());

      updateAttribute("width", shape.width);
      updateAttribute("height", shape.height);
    }
  }

  //Increase Size
  const handleIncreaseSize = () => {
    if (selectedShapeID !== null) {
      const shape = shapes[selectedMatrix].find(s => s.id === selectedShapeID);
      const increment = 20;

      const node = props.shapeNode.current; //DOM Konva node

      updateAttribute("offsetX", (node.width()+increment)/2);
      updateAttribute("offsetY", (node.height()+increment)/2);
      updateAttribute("width", node.width() +increment);
      updateAttribute("height", node.height() +increment);
      
    }
  }

  //Decrease Size
  const handleDecreaseSize = () => {
    if (selectedShapeID !== null) {
      const shape = shapes[selectedMatrix].find(s => s.id === selectedShapeID);
      const increment = 20;

      const node = props.shapeNode.current; //DOM Konva node

      updateAttribute("offsetX", (node.width() - increment) / 2);
      updateAttribute("offsetY", (node.height() - increment) / 2);
      updateAttribute("width", node.width() - increment);
      updateAttribute("height", node.height() - increment);

    }
  }

  //Handle Texture


  const handleTexture = (e) => {
    if (selectedShapeID !== null) {
      const shape = shapes[selectedMatrix].find(s => s.id === selectedShapeID);
      const node = props.shapeNode.current; //DOM Konva node

      const textureName = e.currentTarget.value;
      const patternImg = new Image();
      patternImg.src = TEXTURE_IMAGES[textureName];
      
      updateAttribute("fill", null)
      updateAttribute("fillPatternImage", patternImg);
      

    }
  }

  const handleClick = (event) => {
    // console.log(event.currentTarget)
    let type = event.currentTarget.attributes.shape.value;

    const matrix_size = 150; //Match this up with matrix_size in Matrix.js. Not needed generally.

    //Not needed apparently; Looks better without
    const randPadding = matrix_size/4;
    const paddingOffset = 30;

    const defaultPosition = {x: matrix_size/3, y: matrix_size/3} //if center position desired instead of random
    const randomPosition = {x: randomInt(paddingOffset,matrix_size-paddingOffset), y:randomInt(paddingOffset,matrix_size-paddingOffset)}
    
    if (type) {
      setShapes(prevState => produce(prevState, (draft) => {
        draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...ShapeObject[type] });
      }));

    }
  }

  return (
    <Box p={1.5} sx={{ height: '100%' }}>
      <Paper sx={{ height: '100%', p: 1.5 }}>

        <Box>
          <Typography mb={1}>Lines</Typography>
          <ToggleButton size="large" value={SHAPE_TYPES.VERTICAL_LINE} shape={SHAPE_TYPES.VERTICAL_LINE} draggable onDragStart={handleDragStart} onClick={handleClick}><TbMinusVertical size={customIconSize} /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.TILTED_LINE} shape={SHAPE_TYPES.TILTED_LINE} draggable onDragStart={handleDragStart} onClick={handleClick}><RxSlash size={customIconSize} /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.C_LINE} shape={SHAPE_TYPES.C_LINE} draggable onDragStart={handleDragStart} onClick={handleClick}> ( </ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.EIGHT_LINE} shape={SHAPE_TYPES.EIGHT_LINE} draggable onDragStart={handleDragStart} onClick={handleClick}>8</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.S_LINE} shape={SHAPE_TYPES.S_LINE} draggable onDragStart={handleDragStart} onClick={handleClick}>S</ToggleButton>

          <Typography mb={1}>Squares</Typography>
          <ToggleButton size="large" value={SHAPE_TYPES.SQUARE} shape={SHAPE_TYPES.SQUARE} draggable onDragStart={handleDragStart} onClick={handleClick}><SquareOutlined /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.DIAMOND} shape={SHAPE_TYPES.DIAMOND} draggable onDragStart={handleDragStart} onClick={handleClick}><DiamondOutlined /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.TALL_FAT_RECT} shape={SHAPE_TYPES.TALL_FAT_RECT} draggable onDragStart={handleDragStart} onClick={handleClick}><SquareOutlined /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.TALL_THIN_RECT} shape={SHAPE_TYPES.TALL_THIN_RECT} draggable onDragStart={handleDragStart} onClick={handleClick}><SquareOutlined /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.TILTED_RECT} shape={SHAPE_TYPES.TILTED_RECT} draggable onDragStart={handleDragStart} onClick={handleClick}>Tilt</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.FOLDED_RECT} shape={SHAPE_TYPES.FOLDED_RECT} draggable onDragStart={handleDragStart} onClick={handleClick}>Fold</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.TALL_RECT} shape={SHAPE_TYPES.TALL_RECT} draggable onDragStart={handleDragStart} onClick={handleClick}>[]</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.C_RECT} shape={SHAPE_TYPES.C_RECT} draggable onDragStart={handleDragStart} onClick={handleClick}>C</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.TOP_LEFT_RECT} shape={SHAPE_TYPES.TOP_LEFT_RECT} draggable onDragStart={handleDragStart} onClick={handleClick}>Top-Left</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.STAR} shape={SHAPE_TYPES.STAR} draggable onDragStart={handleDragStart} onClick={handleClick}>Star</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.STAR_MEDIUM} shape={SHAPE_TYPES.STAR_MEDIUM} draggable onDragStart={handleDragStart} onClick={handleClick}>StarMed</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.STAR_THIN} shape={SHAPE_TYPES.STAR_THIN} draggable onDragStart={handleDragStart} onClick={handleClick}>StarThin</ToggleButton>

          <Typography mb={1}>Crossed</Typography>
          <ToggleButton size="large" value={SHAPE_TYPES.PLUS} shape={SHAPE_TYPES.PLUS} draggable onDragStart={handleDragStart} onClick={handleClick}>+</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.CROSS} shape={SHAPE_TYPES.CROSS} draggable onDragStart={handleDragStart} onClick={handleClick}>𐤲</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.ORTHOGONAL} shape={SHAPE_TYPES.ORTHOGONAL} draggable onDragStart={handleDragStart} onClick={handleClick}>⟂</ToggleButton>


          <Typography mb={1}>Circles</Typography>
          <ToggleButton size="large" value={SHAPE_TYPES.CIRCLE} shape={SHAPE_TYPES.CIRCLE} draggable onDragStart={handleDragStart} onClick={handleClick}><CircleOutlined /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.SEMICIRCLE} shape={SHAPE_TYPES.SEMICIRCLE} draggable onDragStart={handleDragStart} onClick={handleClick}>Semi</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.C_CIRCLE} shape={SHAPE_TYPES.C_CIRCLE} draggable onDragStart={handleDragStart} onClick={handleClick}>C</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.CIRCLE_20MIN} shape={SHAPE_TYPES.CIRCLE_20MIN} draggable onDragStart={handleDragStart} onClick={handleClick}>20min</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.QUARTER_CIRCLE} shape={SHAPE_TYPES.QUARTER_CIRCLE} draggable onDragStart={handleDragStart} onClick={handleClick}>quarter</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.CIRCLE_10MIN} shape={SHAPE_TYPES.CIRCLE_10MIN} draggable onDragStart={handleDragStart} onClick={handleClick}>10min</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.ELLIPSE_VERTICAL} shape={SHAPE_TYPES.ELLIPSE_VERTICAL} draggable onDragStart={handleDragStart} onClick={handleClick}>O</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.ELLIPSE_DIAGONAL} shape={SHAPE_TYPES.ELLIPSE_DIAGONAL} draggable onDragStart={handleDragStart} onClick={handleClick}>o</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.ELLIPSE_FOLDED} shape={SHAPE_TYPES.ELLIPSE_FOLDED} draggable onDragStart={handleDragStart} onClick={handleClick}>oo</ToggleButton>

          <Typography mb={1}>Triangles</Typography>
          <ToggleButton size="large" value={SHAPE_TYPES.SIMPLE_TRI} shape={SHAPE_TYPES.SIMPLE_TRI} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.SIMPLE_TRI_SMALL} shape={SHAPE_TYPES.SIMPLE_TRI_SMALL} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.SIMPLE_TRI_BIG} shape={SHAPE_TYPES.SIMPLE_TRI_BIG} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.SQUASHED_TRI} shape={SHAPE_TYPES.SQUASHED_TRI} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.RIGHT_TRI} shape={SHAPE_TYPES.RIGHT_TRI} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.RIGHT_TRI_THIN} shape={SHAPE_TYPES.RIGHT_TRI_THIN} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.OBTUSE_TRI_SMALL} shape={SHAPE_TYPES.OBTUSE_TRI_SMALL} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.OBTUSE_TRI_BIG} shape={SHAPE_TYPES.OBTUSE_TRI_BIG} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle />Big</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.OBTUSE_TRI_FOLDED} shape={SHAPE_TYPES.OBTUSE_TRI_FOLDED} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle />F</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.OBTUSE_TRI_SLIGHT} shape={SHAPE_TYPES.OBTUSE_TRI_SLIGHT} draggable onDragStart={handleDragStart} onClick={handleClick}><TbTriangle /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.CONE} shape={SHAPE_TYPES.CONE} draggable onDragStart={handleDragStart} onClick={handleClick}><Icecream /></ToggleButton>

          <Typography mb={1}>Hexagons</Typography>
          <ToggleButton size="large" value={SHAPE_TYPES.HEXAGON} shape={SHAPE_TYPES.HEXAGON} draggable onDragStart={handleDragStart} onClick={handleClick}><HexagonOutlined /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.SEMIHEXAGON} shape={SHAPE_TYPES.SEMIHEXAGON} draggable onDragStart={handleDragStart} onClick={handleClick}><HexagonOutlined /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.C_HEXAGON} shape={SHAPE_TYPES.C_HEXAGON} draggable onDragStart={handleDragStart} onClick={handleClick}><HexagonOutlined />C</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.RHOMBUS} shape={SHAPE_TYPES.RHOMBUS} draggable onDragStart={handleDragStart} onClick={handleClick}><Square /></ToggleButton>
          
          <Typography mb={1}>Dots</Typography>
          <ToggleButton size="large" value={SHAPE_TYPES.DOT_HOLLOW} shape={SHAPE_TYPES.DOT_HOLLOW} draggable onDragStart={handleDragStart} onClick={handleClick}><CircleOutlined /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.DOT_FILLED} shape={SHAPE_TYPES.DOT_FILLED} draggable onDragStart={handleDragStart} onClick={handleClick}><Circle /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.DOT4_HOLLOW} shape={SHAPE_TYPES.DOT4_HOLLOW} draggable onDragStart={handleDragStart} onClick={handleClick}><CircleOutlined />4</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.DOT4_FILLED} shape={SHAPE_TYPES.DOT4_FILLED} draggable onDragStart={handleDragStart} onClick={handleClick}><Circle />4</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.DOT_SQUARE_HOLLOW} shape={SHAPE_TYPES.DOT_SQUARE_HOLLOW} draggable onDragStart={handleDragStart} onClick={handleClick}><SquareOutlined /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.DOT_SQUARE_FILLED} shape={SHAPE_TYPES.DOT_SQUARE_FILLED} draggable onDragStart={handleDragStart} onClick={handleClick}><Square /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.DOT4_SQUARE_HOLLOW} shape={SHAPE_TYPES.DOT4_SQUARE_HOLLOW} draggable onDragStart={handleDragStart} onClick={handleClick}><SquareOutlined />4</ToggleButton>
          <ToggleButton size="large" value={SHAPE_TYPES.DOT4_SQUARE_FILLED} shape={SHAPE_TYPES.DOT4_SQUARE_FILLED} draggable onDragStart={handleDragStart} onClick={handleClick}><Square />4</ToggleButton>

        </Box>

        <Box>
          <Typography mb={1}>Actions</Typography>
          <ToggleButton size="large" value={SHAPE_ACTIONS.STROKE_DASHED} onClick={handleLineStyle}><LineStyleIcon /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_ACTIONS.STROKE_BOLD} onClick={handleLineWeight}><LineWeightIcon /></ToggleButton>

          <ToggleButton size="large" value={SHAPE_ACTIONS.FLIP_HORIZONTAL} onClick={handleFlipHorizontal}><TbFlipVertical size={customIconSize} /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_ACTIONS.FLIP_VERTICAL} onClick={handleFlipVertical}><TbFlipHorizontal size={customIconSize} /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_ACTIONS.ROTATE} onClick={handleRotate}><RotateRight size={customIconSize} /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_ACTIONS.INCREASE_SIZE} onClick={handleIncreaseSize}><TbArrowsMaximize size={customIconSize} /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_ACTIONS.DECREASE_SIZE} onClick={handleDecreaseSize}><TbArrowsMinimize size={customIconSize} /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_ACTIONS.COPY} onClick={handleTexture}><CopyAll /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_ACTIONS.PASTE} onClick={handleTexture}><ContentPaste /></ToggleButton>

          <ToggleButton size="large" value={TEXTURES.DIAGONAL_RIGHT} onClick={handleTexture}><Texture /></ToggleButton>
          <ToggleButton size="large" value={TEXTURES.DIAGONAL_LEFT} onClick={handleTexture}><Texture /></ToggleButton>

        </Box>

      </Paper>
    </Box>
  )
}