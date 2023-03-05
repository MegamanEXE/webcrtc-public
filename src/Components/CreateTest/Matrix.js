import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Layer, Line, Rect, Stage } from "react-konva";
import '../../App.css'
import produce from "immer";
import { nanoid } from "nanoid";
import { DEFAULTS, LIMITS, SHAPE_TYPES, TOOLS } from "./ShapesData";
import GenericShape from "./GenericShape";
// import GestureRecognizer from '@2players/dollar1-unistroke-recognizer'
import { ShapeGestures } from "./ShapeGestures";
import { PDollarRecognizer } from "./PDollar";
import { ShapeObject } from "./ShapeObjects";



export default function Matrix(props) {
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  const [freehandLines, setFreehandLines] = useState([]);

  const selectedShapeID = props.selectedShapeID;
  const setSelectedShapeID = props.setSelectedShapeID;
  const setSelectedMatrix = props.setSelectedMatrix;
  const clipboard = props.clipboard;
  const setClipboard = props.setClipboard;
  const stageNode = props.stageNode;
  const isDrawing = useRef(false);
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);

  const matrix_size = 150;
  const matrixNumber = props.id.split("-")[1]


  //$P recognizer
  const pr = new PDollarRecognizer();
  for (let s in ShapeGestures) {
    let formattedPoints = [];
    for(let point in ShapeGestures[s]){
      let pt = ShapeGestures[s][point];
      formattedPoints.push({X:pt.x, Y:pt.y, ID:1})
    }
    // console.log(formattedPoints)
    pr.AddGesture(s,formattedPoints);
  }


  

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

      //Refactoring magic 2.0 reduced it to this, check OLD VERSIONS of this for an eyebleed
      createShape({
        x: coords.x,
        y: coords.y,
        shapeType: type
      });

    }
  }

  //Refactored magic (Check OLD VERSIONS of this for a journey)
  function createShape({ x, y, shapeType }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...ShapeObject[shapeType] })
    }));
  }

  //stageNode was defined in Canvas, this is so the currently selected Matrix/stage konva node is accessible in other parts 
  //of the application
  useEffect(() => {
    stageNode.current = stageRef.current;
  },[selectedShapeID, stageNode, props.shapes]);




  //Update the relevant stageRef in globalStageNodes (again, used exclusively to make screenshots)
  useEffect(() => {
    props.globalStageNodes.current[matrixNumber] = stageRef.current;  
  },[stageRef.current]);


  //Handle canvas click
  const handleCanvasClick = () => {
    setSelectedMatrix(matrixNumber);
    setSelectedShapeID(null);
    isDrawing.current = false;
    stageNode.current = stageRef.current;
  }

  //////////////////////////////////////
  //Freehand drawing
  /////////////////////////////////////
  const handleMouseDown = (e) => {
    if(props.tool === null) return;

    setSelectedMatrix(matrixNumber);
    stageNode.current = stageRef.current;

    isDrawing.current = true;
    const pos = stageRef.current.getPointerPosition();
    setFreehandLines([...freehandLines, {points: [pos.x, pos.y] }]); //starting point
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || props.tool.current===null) {
      return;
    }

    //Utility function
    const dist = (p1, p2) => {
      return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5;
    };


    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    let lastLine = freehandLines[freehandLines.length - 1];
   
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // Smoothing
    let lastPoint = {
      x: lastLine.points[lastLine.points.length - 2],
      y: lastLine.points[lastLine.points.length - 1]
    };
    if (dist(lastPoint, point) > 3) {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      
    }
    // replace last
    freehandLines.splice(freehandLines.length - 1, 1, lastLine);
    setFreehandLines(freehandLines.concat());

  };

  const handleMouseUp = () => {
    if (props.tool === null) return;

    isDrawing.current = false;

    if (props.tool === TOOLS.MAGIC_BRUSH) {
      //P-dollar code begins here
      //Format code to [{X:x1, Y:y1, ID:1},...] format
      const oldPoints = freehandLines[0].points;
      const newPoints = [];
      for (var i = 0; i < oldPoints.length / 2; i++) {
        const point = {
          X: Math.round(oldPoints[i * 2]),
          Y: Math.round(oldPoints[i * 2 + 1]),
          ID: 1,
        }
        newPoints.push(point);
      }

      //Recognize
      let result = null;
      if (newPoints.length > 1) {
        result = pr.Recognize(newPoints)
        // console.log(result.Name)
      }

      //If magic brush, get the recognized shape, otherwise add the stroke as is to main state 
      if(result) createShape({ x: 75, y: 75, shapeType: result.Name });

    } else if (props.tool === TOOLS.NORMAL_BRUSH) {
      props.setShapes(ps => produce(ps, d => {
        d[matrixNumber].push({ id: nanoid(), type: SHAPE_TYPES.FREEHAND_STROKE, points: freehandLines[0].points })
      }))
    }

    setFreehandLines([]); //unistrokes
  };
  /////////////////////////////////////

  const handleContextMenu = (e) => {
    e.evt.preventDefault();
  }

  return (
    <Box id={props.id} className={props.selectedMatrix === matrixNumber ? "matrix selected" : "matrix"} ref={divRef}
      onDragOver={handleDragOver} onDrop={handleDrop}
      sx={{ width: matrix_size, height: matrix_size }}
    >
      <Stage ref={stageRef} className="stage" 
        width={dimensions.width} height={dimensions.height} 
        onClick={handleCanvasClick} onMouseDown={handleMouseDown} onMousemove={handleMouseMove} onMouseup={handleMouseUp} onContextMenu={handleContextMenu}>
        <Layer className="layer" ref={layerRef}>

          <Rect class="bg-color-rect" width={matrix_size} height={matrix_size} x={0} y={0} fill="white" />{/* background color, do not remove */}

          {props.shapes.map(s => <GenericShape key={s.id}
            selectedShapeID={selectedShapeID} setSelectedShapeID={setSelectedShapeID}
            matrixNumber={matrixNumber}
            setSelectedMatrix={setSelectedMatrix}
            shapes={props.shapes} setShapes={props.setShapes}
            layerRef={layerRef}
            shapeNode={props.shapeNode}
            isDrawing={isDrawing} tool={props.tool}
            {...s} />)}

          {freehandLines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#000000"
              strokeWidth={4}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              bezier="true"
            />
          ))}

        </Layer>
      </Stage>
    </Box>
  );

}


