import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Line, Rect, Stage } from "react-konva";
import '../../App.css'
import produce from "immer";
import { nanoid } from "nanoid";
import { DEFAULTS, LIMITS, SHAPE_TYPES } from "./ShapesData";
import GenericShape from "./GenericShape";
import { cCircleObj, circle10MinObj, circle20MinObj, circleObj, cLineObj, cRectObj, crossObj, diamondObj, eightLineObj, ellipseDiagonalObj, ellipseFoldedObj, ellipseVerticalObj, foldedRectObj, orthogonalObj, plusObj, quarterCircleObj, semicircleObj, sLineObj, squareObj, starMediumObj, starObj, starThinObj, tallFatRectObj, tallRectObj, tallThinRectObj, tiltedLineObj, tiltedRectObj, topLeftRectObj, verticalLineObj } from "./ShapeObjects";

export default function Matrix(props){
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  // const [selectedShapeID, setSelectedShapeID] = useState(null);
  const selectedShapeID = props.selectedShapeID;
  const setSelectedShapeID = props.setSelectedShapeID;
  const setSelectedMatrix = props.setSelectedMatrix;
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);

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
      props.setSelectedMatrix(matrixNumber);

      const { type, offsetX, offsetY, clientHeight, clientWidth } = JSON.parse(draggedData);

      stageRef.current.setPointersPositions(event);
      const coords = stageRef.current.getPointerPosition();

      if (type === SHAPE_TYPES.SQUARE) {
        createSquare({
          x: coords.x - (DEFAULTS.SQUARE.WIDTH / 2),
          y: coords.y - (DEFAULTS.SQUARE.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.VERTICAL_LINE) {
        createVerticalLine({
          x: coords.x,
          y: coords.y - (DEFAULTS.VERTICAL_LINE.HEIGHT/2),
        });
      } else if (type === SHAPE_TYPES.TILTED_LINE) {
        createTiltedLine({
          x: coords.x + DEFAULTS.TILTED_LINE.HEIGHT/3,
          y: coords.y - DEFAULTS.TILTED_LINE.HEIGHT/3,
        });
      } else if (type === SHAPE_TYPES.C_LINE) {
        createCLine({
          x: coords.x,
          y: coords.y - DEFAULTS.C_LINE.HEIGHT / 2,
        });
      } else if (type === SHAPE_TYPES.S_LINE) {
        createSLine({
          x: coords.x - DEFAULTS.S_LINE.WIDTH/2,
          y: coords.y - DEFAULTS.S_LINE.HEIGHT / 2,
        });
      } else if (type === SHAPE_TYPES.EIGHT_LINE) {
        createEightLine({
          x: coords.x - DEFAULTS.EIGHT_LINE.WIDTH / 2,
          y: coords.y - DEFAULTS.EIGHT_LINE.HEIGHT / 2,
        });
      } else if (type === SHAPE_TYPES.DIAMOND) {
        createDiamond({
          x: coords.x,
          y: coords.y - (DEFAULTS.DIAMOND.HEIGHT/2),
        });
      } else if (type === SHAPE_TYPES.TALL_FAT_RECT) {
        createTallFatRect({
          x: coords.x - (DEFAULTS.TALL_FAT_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TALL_FAT_RECT.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.TALL_THIN_RECT) {
        createTallThinRect({
          x: coords.x - (DEFAULTS.TALL_THIN_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TALL_THIN_RECT.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.TILTED_RECT) {
        createTiltedRect({
          x: coords.x - (DEFAULTS.TILTED_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TILTED_RECT.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.FOLDED_RECT) {
        createFoldedRect({
          x: coords.x - (DEFAULTS.FOLDED_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.FOLDED_RECT.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.TALL_RECT) {
        createTallRect({
          x: coords.x - (DEFAULTS.TALL_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TALL_RECT.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.C_RECT) {
        createCRect({
          x: coords.x - (DEFAULTS.C_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.C_RECT.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.TOP_LEFT_RECT) {
        createTopLeftRect({
          x: coords.x - (DEFAULTS.TOP_LEFT_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TOP_LEFT_RECT.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.STAR) {
        createStar({
          x: coords.x - (DEFAULTS.C_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.C_RECT.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.STAR_MEDIUM) {
        createStarMedium({
          x: coords.x - (DEFAULTS.STAR_MEDIUM.WIDTH / 2),
          y: coords.y - (DEFAULTS.STAR_MEDIUM.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.STAR_THIN) {
        createStarThin({
          x: coords.x - (DEFAULTS.STAR_THIN.WIDTH / 2),
          y: coords.y - (DEFAULTS.STAR_THIN.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.PLUS) {
        createPlus({
          x: coords.x - (DEFAULTS.PLUS.WIDTH / 2),
          y: coords.y - (DEFAULTS.PLUS.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.CROSS) {
        createCross({
          x: coords.x - (DEFAULTS.CROSS.WIDTH / 2),
          y: coords.y - (DEFAULTS.CROSS.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.ORTHOGONAL) {
        createOrthogonal({
          x: coords.x - (DEFAULTS.ORTHOGONAL.WIDTH / 2),
          y: coords.y - (DEFAULTS.ORTHOGONAL.HEIGHT / 2),
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        createCircle({
          x: coords.x,
          y: coords.y,
        });
      } else if (type === SHAPE_TYPES.SEMICIRCLE) {
        createSemicircle({
          x: coords.x,
          y: coords.y,
        });
      } else if (type === SHAPE_TYPES.C_CIRCLE) {
        createCCircle({
          x: coords.x,
          y: coords.y,
        });
      } else if (type === SHAPE_TYPES.CIRCLE_20MIN) {
        createCircle20Min({
          x: coords.x,
          y: coords.y,
        });
      } else if (type === SHAPE_TYPES.QUARTER_CIRCLE) {
        createQuarterCircle({
          x: coords.x,
          y: coords.y,
        });
      } else if (type === SHAPE_TYPES.CIRCLE_10MIN) {
        createCircle10Min({
          x: coords.x,
          y: coords.y,
        });
      } else if (type === SHAPE_TYPES.ELLIPSE_VERTICAL) {
        createEllipseVertical({
          x: coords.x,
          y: coords.y,
        });
      } else if (type === SHAPE_TYPES.ELLIPSE_DIAGONAL) {
        createEllipseDiagonal({
          x: coords.x,
          y: coords.y,
        });
      } else if (type === SHAPE_TYPES.ELLIPSE_FOLDED) {
        createEllipseFolded({
          x: coords.x,
          y: coords.y,
        });
      }
    }
  }

  const handleCanvasClick = () => {
    setSelectedMatrix(matrixNumber);
    setSelectedShapeID(null);
  }

  /* Note only the first one has a ref, other matrices just use the same value calculated using this one */ 
  return (
    <Box id={props.id} className={props.selectedMatrix === matrixNumber ? "matrix selected" : "matrix"} ref={divRef}
    onDragOver={handleDragOver} onDrop={handleDrop}
    sx={{ width: matrix_size, height: matrix_size }}
    >
      <Stage ref={stageRef} className="stage" width={dimensions.width} height={dimensions.height} onClick={handleCanvasClick}  >
        <Layer className="layer" ref={layerRef}>

          <Rect class="bg-color-rect" width={matrix_size} height={matrix_size} x={0} y={0} fill="white" />{/* background color, do not remove */}
          {props.shapes.map(s => <GenericShape key={s.id} selectedShapeID={selectedShapeID} setSelectedShapeID={setSelectedShapeID} 
            matrixNumber={matrixNumber} 
            setSelectedMatrix={setSelectedMatrix}
            shapes={props.shapes} setShapes={props.setShapes} 
            layerRef={layerRef}
            {...s} />)}

        </Layer>
      </Stage>
    </Box>
  );

  // Creation functions
  //There are good reasons why it finally looks like this.
  //Read ShapeObjects.js for more info
  
  //Lines
  function createVerticalLine({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({id:nanoid(), x, y, ...verticalLineObj})
    }));
  }

  function createTiltedLine({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({id:nanoid(), x, y, ...tiltedLineObj})
    }));
  }

  function createCLine({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...cLineObj })
    }));
  }

  function createSLine({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...sLineObj })
    }));
  }

  function createEightLine({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...eightLineObj })
    }));
  }

  //Rectangles
  function createSquare({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...squareObj })
    }));
  }

  function createDiamond({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...diamondObj })
    }));
  }

  function createTallFatRect({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...tallFatRectObj })
    }));
  }

  function createTallThinRect({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...tallThinRectObj })
    }));
  }

  function createTiltedRect({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...tiltedRectObj })
    }));
  }

  function createFoldedRect({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...foldedRectObj })
    }));
  }

  function createTallRect({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...tallRectObj })
    }));
  }

  function createCRect({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...cRectObj })
    }));
  }

  function createTopLeftRect({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...topLeftRectObj })
    }));
  }

  function createStar({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...starObj })
    }));
  }

  function createStarMedium({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...starMediumObj })
    }));
  }

  function createStarThin({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...starThinObj })
    }));
  }

  //Crossed
  function createPlus({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...plusObj })
    }));
  }
  
  function createCross({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...crossObj })
    }));
  }
  
  function createOrthogonal({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...orthogonalObj })
    }));
  }

  //Circles
  function createCircle({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...circleObj })
    }));
  }

  function createSemicircle({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...semicircleObj })
    }));
  }
  
  function createCCircle({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...cCircleObj })
    }));
  }

  function createCircle20Min({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...circle20MinObj })
    }));
  }

  function createQuarterCircle({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...quarterCircleObj })
    }));
  }

  function createCircle10Min({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...circle10MinObj })
    }));
  }

  function createEllipseVertical({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...ellipseVerticalObj })
    }));
  }

  function createEllipseDiagonal({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...ellipseDiagonalObj })
    }));
  }

  function createEllipseFolded({ x, y }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...ellipseFoldedObj })
    }));
  }




}


