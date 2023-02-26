import { CircleOutlined, DiamondOutlined, LineStyle, Padding, SquareOutlined } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Paper, Popover, ToggleButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import produce from "immer";
import { DEFAULTS, SHAPE_ACTIONS, SHAPE_TYPES } from "./ShapesData";
import LineWeightIcon from '@mui/icons-material/LineWeight';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import { useState } from "react";
import Draggable from "react-draggable";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { TbMinusVertical } from "react-icons/tb"
import { RxSlash } from "react-icons/rx"
import { nanoid } from "nanoid";
import { circleObj, cLineObj, cRectObj, crossObj, diamondObj, eightLineObj, foldedRectObj, orthogonalObj, plusObj, sLineObj, squareObj, starMediumObj, starObj, starThinObj, tallFatRectObj, tallRectObj, tallThinRectObj, tiltedLineObj, tiltedRectObj, topLeftRectObj, verticalLineObj } from "./ShapeObjects";

const customIconSize = "1.5em";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const handleDragStart = (event) => {
  const type = event.target.attributes.shape.value;

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
    const dashStyles = [[0, 0], [5, 2], [10, 5], [3,5]];

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

  const handleClick = (event) => {
    // console.log(event.target)
    let type;
     
    //Because somehow the Icon and the Button base are separate entities in MUI's toggle button
    if (event.target.attributes.shape === undefined) 
      type = event.target.parentElement.attributes.shape.value;
    else
      type = event.target.attributes.shape.value;

    const matrix_size = 150; //Match this up with matrix_size in Matrix.js. Not needed generally.
    const randPadding = matrix_size/4;

    const defaultPosition = {x: matrix_size/3, y: matrix_size/3}
    const randomPosition = {x: randomInt(randPadding,matrix_size-randPadding), y:randomInt(randPadding,matrix_size-randPadding)}
    
    if (type) {
      switch(type){
        case SHAPE_TYPES.SQUARE:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id:nanoid(), ...randomPosition, ...squareObj});
          }));
          break;
        case SHAPE_TYPES.CIRCLE:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...circleObj });
          }));
          break;
        case SHAPE_TYPES.VERTICAL_LINE:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...verticalLineObj });
          }));
          break;
        case SHAPE_TYPES.TILTED_LINE:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...tiltedLineObj });
          }));
          break;
        case SHAPE_TYPES.C_LINE:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...cLineObj });
          }));
          break;
        case SHAPE_TYPES.S_LINE:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...sLineObj });
          }));
          break;
        case SHAPE_TYPES.EIGHT_LINE:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...eightLineObj });
          }));
          break;
        case SHAPE_TYPES.DIAMOND:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...diamondObj });
          }));
          break;
        case SHAPE_TYPES.TALL_FAT_RECT:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...tallFatRectObj });
          }));
          break;
        case SHAPE_TYPES.TALL_THIN_RECT:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...tallThinRectObj });
          }));
          break;
        case SHAPE_TYPES.TILTED_RECT:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...tiltedRectObj });
          }));
          break;
        case SHAPE_TYPES.FOLDED_RECT:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...foldedRectObj });
          }));
          break;
        case SHAPE_TYPES.TALL_RECT:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...tallRectObj });
          }));
          break;
        case SHAPE_TYPES.C_RECT:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...cRectObj });
          }));
          break;
        case SHAPE_TYPES.TOP_LEFT_RECT:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...topLeftRectObj });
          }));
          break;
        case SHAPE_TYPES.STAR:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...starObj });
          }));
          break;
        case SHAPE_TYPES.STAR_MEDIUM:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...starMediumObj });
          }));
          break;
        case SHAPE_TYPES.STAR_THIN:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...starThinObj });
          }));
          break;
        case SHAPE_TYPES.PLUS:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...plusObj });
          }));
          break;
        case SHAPE_TYPES.CROSS:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...crossObj });
          }));
          break;
        case SHAPE_TYPES.ORTHOGONAL:
          setShapes(prevState => produce(prevState, (draft) => {
            draft[selectedMatrix].push({ id: nanoid(), ...randomPosition, ...orthogonalObj });
          }));
          break;
        default:
          console.log("Case not found")
          break;
    }
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

          
        </Box>

        <Box>
          <Typography mb={1}>Actions</Typography>
          <ToggleButton size="large" value={SHAPE_ACTIONS.STROKE_DASHED} onClick={handleLineStyle}><LineStyleIcon /></ToggleButton>
          <ToggleButton size="large" value={SHAPE_ACTIONS.STROKE_BOLD} onClick={handleLineWeight}><LineWeightIcon /></ToggleButton>
        </Box>

      </Paper>
    </Box>
  )
}