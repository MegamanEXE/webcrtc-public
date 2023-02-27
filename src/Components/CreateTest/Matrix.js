import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Line, Rect, Stage } from "react-konva";
import '../../App.css'
import produce from "immer";
import { nanoid } from "nanoid";
import { DEFAULTS, LIMITS, SHAPE_TYPES } from "./ShapesData";
import GenericShape from "./GenericShape";
import { cCircleObj, circle10MinObj, circle20MinObj, circleObj, cLineObj, coneObj, cRectObj, crossObj, diamondObj, eightLineObj, ellipseDiagonalObj, ellipseFoldedObj, ellipseVerticalObj, foldedRectObj, obtuseTriBigObj, obtuseTriFoldedObj, obtuseTriSlightObj, obtuseTriSmallObj, obtuseTriThinObj, orthogonalObj, plusObj, quarterCircleObj, rightTriObj, rightTriThinObj, semicircleObj, ShapeObject, simpleTriBigObj, simpleTriObj, simpleTriSmallObj, sLineObj, squareObj, squashedTriObj, starMediumObj, starObj, starThinObj, tallFatRectObj, tallRectObj, tallThinRectObj, tiltedLineObj, tiltedRectObj, topLeftRectObj, verticalLineObj } from "./ShapeObjects";

export default function Matrix(props) {
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

  //Set stage's dimensions because it only takes pixel values as its dimensions}
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
        createShape({
          x: coords.x - (DEFAULTS.SQUARE.WIDTH / 2),
          y: coords.y - (DEFAULTS.SQUARE.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.VERTICAL_LINE) {
        createShape({
          x: coords.x,
          y: coords.y - (DEFAULTS.VERTICAL_LINE.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.TILTED_LINE) {
        createShape({
          x: coords.x + DEFAULTS.TILTED_LINE.HEIGHT / 3,
          y: coords.y - DEFAULTS.TILTED_LINE.HEIGHT / 3,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.C_LINE) {
        createShape({
          x: coords.x,
          y: coords.y - DEFAULTS.C_LINE.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.S_LINE) {
        createShape({
          x: coords.x - DEFAULTS.S_LINE.WIDTH / 2,
          y: coords.y - DEFAULTS.S_LINE.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.EIGHT_LINE) {
        createShape({
          x: coords.x - DEFAULTS.EIGHT_LINE.WIDTH / 2,
          y: coords.y - DEFAULTS.EIGHT_LINE.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.DIAMOND) {
        createShape({
          x: coords.x,
          y: coords.y - (DEFAULTS.DIAMOND.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.TALL_FAT_RECT) {
        createShape({
          x: coords.x - (DEFAULTS.TALL_FAT_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TALL_FAT_RECT.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.TALL_THIN_RECT) {
        createShape({
          x: coords.x - (DEFAULTS.TALL_THIN_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TALL_THIN_RECT.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.TILTED_RECT) {
        createShape({
          x: coords.x - (DEFAULTS.TILTED_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TILTED_RECT.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.FOLDED_RECT) {
        createShape({
          x: coords.x - (DEFAULTS.FOLDED_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.FOLDED_RECT.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.TALL_RECT) {
        createShape({
          x: coords.x - (DEFAULTS.TALL_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TALL_RECT.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.C_RECT) {
        createShape({
          x: coords.x - (DEFAULTS.C_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.C_RECT.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.TOP_LEFT_RECT) {
        createShape({
          x: coords.x - (DEFAULTS.TOP_LEFT_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.TOP_LEFT_RECT.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.STAR) {
        createShape({
          x: coords.x - (DEFAULTS.C_RECT.WIDTH / 2),
          y: coords.y - (DEFAULTS.C_RECT.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.STAR_MEDIUM) {
        createShape({
          x: coords.x - (DEFAULTS.STAR_MEDIUM.WIDTH / 2),
          y: coords.y - (DEFAULTS.STAR_MEDIUM.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.STAR_THIN) {
        createShape({
          x: coords.x - (DEFAULTS.STAR_THIN.WIDTH / 2),
          y: coords.y - (DEFAULTS.STAR_THIN.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.PLUS) {
        createShape({
          x: coords.x - (DEFAULTS.PLUS.WIDTH / 2),
          y: coords.y - (DEFAULTS.PLUS.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.CROSS) {
        createShape({
          x: coords.x - (DEFAULTS.CROSS.WIDTH / 2),
          y: coords.y - (DEFAULTS.CROSS.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.ORTHOGONAL) {
        createShape({
          x: coords.x - (DEFAULTS.ORTHOGONAL.WIDTH / 2),
          y: coords.y - (DEFAULTS.ORTHOGONAL.HEIGHT / 2),
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        createShape({
          x: coords.x,
          y: coords.y,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.SEMICIRCLE) {
        createShape({
          x: coords.x,
          y: coords.y,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.C_CIRCLE) {
        createShape({
          x: coords.x,
          y: coords.y,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.CIRCLE_20MIN) {
        createShape({
          x: coords.x,
          y: coords.y,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.QUARTER_CIRCLE) {
        createShape({
          x: coords.x,
          y: coords.y,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.CIRCLE_10MIN) {
        createShape({
          x: coords.x,
          y: coords.y,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.ELLIPSE_VERTICAL) {
        createShape({
          x: coords.x,
          y: coords.y,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.ELLIPSE_DIAGONAL) {
        createShape({
          x: coords.x,
          y: coords.y,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.ELLIPSE_FOLDED) {
        createShape({
          x: coords.x,
          y: coords.y - DEFAULTS.ELLIPSE_FOLDED.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.SIMPLE_TRI) {
        createShape({
          x: coords.x - DEFAULTS.SIMPLE_TRI.WIDTH / 2,
          y: coords.y - DEFAULTS.SIMPLE_TRI.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.SIMPLE_TRI_SMALL) {
        createShape({
          x: coords.x - DEFAULTS.SIMPLE_TRI_SMALL.WIDTH / 2,
          y: coords.y - DEFAULTS.SIMPLE_TRI_SMALL.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.SIMPLE_TRI_BIG) {
        createShape({
          x: coords.x - DEFAULTS.SIMPLE_TRI_BIG.WIDTH / 2,
          y: coords.y - DEFAULTS.SIMPLE_TRI_BIG.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.SQUASHED_TRI) {
        createShape({
          x: coords.x- DEFAULTS.SQUASHED_TRI.WIDTH/ 2,
          y: coords.y - DEFAULTS.SQUASHED_TRI.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.RIGHT_TRI) {
        createShape({
          x: coords.x - DEFAULTS.RIGHT_TRI.WIDTH / 2,
          y: coords.y - DEFAULTS.RIGHT_TRI.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.RIGHT_TRI_THIN) {
        createShape({
          x: coords.x - DEFAULTS.RIGHT_TRI_THIN.WIDTH / 2,
          y: coords.y - DEFAULTS.RIGHT_TRI_THIN.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.OBTUSE_TRI_SMALL) {
        createShape({
          x: coords.x - DEFAULTS.OBTUSE_TRI_SMALL.WIDTH / 2,
          y: coords.y - DEFAULTS.OBTUSE_TRI_SMALL.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.OBTUSE_TRI_BIG) {
        createShape({
          x: coords.x - DEFAULTS.OBTUSE_TRI_BIG.WIDTH/2 ,
          y: coords.y - DEFAULTS.OBTUSE_TRI_BIG.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.OBTUSE_TRI_FOLDED) {
        createShape({
          x: coords.x - DEFAULTS.OBTUSE_TRI_FOLDED.WIDTH,
          y: coords.y,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.OBTUSE_TRI_SLIGHT) {
        createShape({
          x: coords.x - DEFAULTS.OBTUSE_TRI_SLIGHT.WIDTH / 2,
          y: coords.y - DEFAULTS.OBTUSE_TRI_SLIGHT.HEIGHT / 2,
          shapeType: type
        });
      } else if (type === SHAPE_TYPES.CONE) {
        createShape({
          x: coords.x,
          y: coords.y - DEFAULTS.CONE.HEIGHT / 2,
          shapeType: type
        });
      }
    }
  }

  //Refactored magic (Check OLD VERSIONS of this for a journey)
  function createShape({ x, y, shapeType }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...ShapeObject[shapeType] })
    }));
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

}


