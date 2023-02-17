import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import '../../App.css'
import produce from "immer";
import { nanoid } from "nanoid";
import { DEFAULTS, LIMITS, SHAPE_TYPES } from "./ShapesData";
import GenericShape from "./GenericShape";

export default function Matrix(props){
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  // const [selectedShapeID, setSelectedShapeID] = useState(null);
  const selectedShapeID = props.selectedShapeID;
  const setSelectedShapeID = props.setSelectedShapeID;

  const divRef = useRef(null);
  const stageRef = useRef(null);

  const matrix_size = 150;
  const matrixNumber = props.id.split("-")[1]

  //Utility debounce function
  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

  //Set stage's dimensions because it only takes pixel values as its dimensions
  const handleResize = () => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      })
      // console.log(`Rendering at ${dimensions.width} x ${dimensions.height}`)
    }
  }

  //For initial render
  useEffect(() => { handleResize() }, [])

  //To control resize. In the future, may try using Stage's scale to make it fully responsive
  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 500)

    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize)
  })


  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedData = event.dataTransfer.getData("dragged_shape");
    // console.log(draggedData);

    if (draggedData) {
      const { type, offsetX, offsetY, clientHeight, clientWidth } = JSON.parse(draggedData);

      stageRef.current.setPointersPositions(event);
      const coords = stageRef.current.getPointerPosition();

      if (type === SHAPE_TYPES.SQUARE) {
        createSquare({
          x: coords.x - (DEFAULTS.SQUARE.WIDTH / 2),
          y: coords.y - (DEFAULTS.SQUARE.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        createCircle({
          x: coords.x,
          y: coords.y,
        });
      }
    }
  }

  /* Note only the first one has a ref, other matrices just use the same value calculated using this one */ 
  return (
    <Box id={props.id} className="matrix" ref={divRef}
    onDragOver={handleDragOver} onDrop={handleDrop}
    sx={{ width: matrix_size, height: matrix_size }}
    >
      <Stage ref={stageRef} className="stage" width={dimensions.width} height={dimensions.height} onClick={()=>setSelectedShapeID(null)}  >
        <Layer className="layer">

          <Rect class="bg-color-rect" width={matrix_size} height={matrix_size} x={0} y={0} fill="white" />{/* background color, do not remove */}
          {props.shapes.map(s => <GenericShape key={s.id} selectedShapeID={selectedShapeID} setSelectedShapeID={setSelectedShapeID} matrixNumber={matrixNumber} shapes={props.shapes} setShapes={props.setShapes} {...s} />)}

        </Layer>
      </Stage>
    </Box>
  );

  // Creation functions
  function createSquare({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({
        id: nanoid(),
        type: SHAPE_TYPES.SQUARE,
        width: DEFAULTS.SQUARE.WIDTH,
        height: DEFAULTS.SQUARE.HEIGHT,
        fill: DEFAULTS.SQUARE.FILL,
        stroke: DEFAULTS.SQUARE.STROKE,
        rotation: DEFAULTS.SQUARE.ROTATION,
        x,
        y
      })
    }));
  }

  function createCircle({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({
        id: nanoid(),
        type: SHAPE_TYPES.CIRCLE,
        radius: DEFAULTS.CIRCLE.RADIUS,
        fill: DEFAULTS.CIRCLE.FILL,
        stroke: DEFAULTS.CIRCLE.STROKE,
        x,
        y
      })
    }));
  }


}


