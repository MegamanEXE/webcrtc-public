import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import '../../App.css'
import Toolbox from "./Toolbox";
import RightBar from "./RightBar"
import produce from "immer";
import { nanoid } from "nanoid";
import { DEFAULTS, SHAPE_TYPES } from "./ShapesData";

export default function Canvas() {
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  const [selectedShape, setSelectedShape] = useState(null);

  const divRef = useRef(null);
  const layer1Ref = useRef(null);

  //Lift these up to CreateTestContainer later for submit button
  const [shapes1, setShapes1] = useState({});

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

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedData = event.dataTransfer.getData("dragged_shape");
    console.log("Something dropped");
  }

  const denom = 6;
  const matrix_size = 250;
  const layer_color = "grey"
  const layer_gap = 15;
  var center_offset = dimensions.width * 0.1; //calculate this properly later


  return (
    <Box id="canvasContainer">

      <Box id="toolbox" >
        <Toolbox />
      </Box>


      <Box id="canvasWorkspace" my={1.5} p={1.5} >


          <Box id="matrix1" className="matrix" ref={divRef}
            onDragOver={handleDragOver} onDrop={handleDrop}
            sx={{ width: matrix_size, height: matrix_size }}
          >
            <Stage className="stage" width={dimensions.width} height={dimensions.height}  >
              <Layer className="layer">

                <Rect class="bg-color-rect" width={matrix_size} height={matrix_size} x={0} y={0} fill="white" stroke={layer_color} />{/* background color, do not remove */}


              </Layer>
            </Stage>
          </Box>

          <Box id="matrix2" className="matrix"
            onDragOver={handleDragOver} onDrop={handleDrop}
            sx={{ width: matrix_size, height: matrix_size }}
          >
            <Stage className="stage" width={dimensions.width} height={dimensions.height}  >
              <Layer className="layer">

                <Rect class="bg-color-rect" width={matrix_size} height={matrix_size} x={0} y={0} fill="white" stroke={layer_color} />


              </Layer>
            </Stage>
          </Box>

          <Box id="matrix3" className="matrix"
            onDragOver={handleDragOver} onDrop={handleDrop}
            sx={{ width: matrix_size, height: matrix_size }}
          >
            <Stage className="stage" width={dimensions.width} height={dimensions.height}  >
              <Layer className="layer">

                <Rect class="bg-color-rect" width={matrix_size} height={matrix_size} x={0} y={0} fill="white" stroke={layer_color} />


              </Layer>
            </Stage>
          </Box>

      </Box>


      <Box id="rightBar">
        <RightBar />
      </Box>


    </Box>);



  function createSquare({ x, y }) {
    setShapes1(produce(shapes1, (draft) => {
      draft.push({
        'id': nanoid(),
        'type': SHAPE_TYPES.SQUARE,
        'width': DEFAULTS.SQUARE.WIDTH,
        'height': DEFAULTS.SQUARE.HEIGHT,
        'fill': DEFAULTS.SQUARE.FILL,
        'stroke': DEFAULTS.SQUARE.STROKE,
        'rotation': DEFAULTS.SQUARE.ROTATION,
        x,
        y
      })
    }));
  }
}

