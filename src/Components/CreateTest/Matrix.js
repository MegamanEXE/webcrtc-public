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
import Konva from "konva";



export default function Matrix(props) {
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  const [freehandLines, setFreehandLines] = useState([]);
  const [stageSizeToggle, setStageSizeToggle] = useState(false)

  const selectedShapeID = props.selectedShapeID;
  const selectedMatrix = props.selectedMatrix;
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
  const MAGIC_BRUSH_SCALING_ENABLED = false;
  const scaleInc = 2;



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

      //Accounts for scale
      const stageTransform = stageRef.current.getAbsoluteTransform().copy();
      const position = stageTransform.invert().point(coords);


      //Refactoring magic 2.0 reduced it to this, check OLD VERSIONS of this for an eyebleed
      // createShape({
      //   x: coords.x,
      //   y: coords.y,
      //   shapeType: type
      // });
      createShape({
        x: position.x,
        y: position.y,
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

  function createShapeExtraAttr({ x, y, shapeType, ...other }) {
    props.setShapes(prevState => produce(prevState, (draft) => {
      draft[matrixNumber].push({ id: nanoid(), x, y, ...ShapeObject[shapeType], ...other })
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

  const EXPERIMENT_doubleClick = () => {
      setStageSizeToggle(s => !s)    
  }

  //Only enlarges one matrix at a time
  useEffect(() => {
    if(selectedMatrix!==matrixNumber)
      setStageSizeToggle(false)
  },[selectedMatrix]);

  useEffect(() => {
    handleResize()
  },[stageSizeToggle]);

  //////////////////////////////////////
  //Freehand drawing
  /////////////////////////////////////
  const handleMouseDown = (e) => {
    setSelectedMatrix(matrixNumber);
    stageNode.current = stageRef.current;
    
    if(props.tool === null) return;

    //Brushes
    if([TOOLS.NORMAL_BRUSH, TOOLS.MAGIC_BRUSH].includes(props.tool)){
      isDrawing.current = true;
      const pos = stageRef.current.getPointerPosition();

      //Whereever you see this, this is to account for the scale of the stage
      const stageTransform = stageRef.current.getAbsoluteTransform().copy();
      const position = stageTransform.invert().point(pos);

      // setFreehandLines([...freehandLines, { points: [pos.x, pos.y] }]); //starting point
      setFreehandLines([...freehandLines, { points: [position.x, position.y] }]); //starting point

    }

    //Deletion tool
    if(props.tool === TOOLS.DELETE){
      console.log("About to delete", selectedShapeID)
      //Deletion handled in GenericShape's handleSelect()

      
    } 
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }

    
    //If a brush is selected
    if ([TOOLS.NORMAL_BRUSH, TOOLS.MAGIC_BRUSH].includes(props.tool)) {
      //Utility function
      const dist = (p1, p2) => {
        return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5;
      };

      const stage = stageRef.current;
      const point = stage.getPointerPosition();
      const stageTransform = stageRef.current.getAbsoluteTransform().copy();
      const position = stageTransform.invert().point(point);
      let lastLine = freehandLines[freehandLines.length - 1];

      lastLine.points = lastLine.points.concat([position.x, position.y]);

      // lastLine.points = lastLine.points.concat([point.x, point.y]);

      // Smoothing
      let lastPoint = {
        x: lastLine.points[lastLine.points.length - 2],
        y: lastLine.points[lastLine.points.length - 1]
      };

      if (dist(lastPoint, point) > 3) {
        // lastLine.points = lastLine.points.concat([point.x, point.y]);
        lastLine.points = lastLine.points.concat([position.x, position.y]);
      }
      // replace last
      freehandLines.splice(freehandLines.length - 1, 1, lastLine);
      setFreehandLines(freehandLines.concat());
    }



  };

  const handleMouseUp = () => {
    if (props.tool === null) return;

    isDrawing.current = false;

    //Brushes
    if ([TOOLS.NORMAL_BRUSH, TOOLS.MAGIC_BRUSH].includes(props.tool)) {
      if (props.tool === TOOLS.MAGIC_BRUSH) {
        //P-dollar code begins here

        //Format points to [{X:x1, Y:y1, ID:1},...] 
        const oldPoints = freehandLines[0].points;
        const newPoints = [];
        for (let i = 0; i < oldPoints.length / 2; i++) {
          const point = {
            X: Math.round(oldPoints[i * 2]),
            Y: Math.round(oldPoints[i * 2 + 1]),
            ID: 1,
          }
          newPoints.push(point);
        }

        // //Format points to [{x:x1, y:y1},...]. Use to get values for ShapeGestures.js 
        // const oldPointsT = freehandLines[0].points;
        // const newPointsT = [];
        // for (let i = 0; i < oldPointsT.length / 2; i++) {
        //   const point = {
        //     x: Math.round(oldPointsT[i * 2]),
        //     y: Math.round(oldPointsT[i * 2 + 1])
        //   }
        //   newPointsT.push(point);
        // }
        // console.log(JSON.stringify(newPointsT))

        //Recognize
        let result = null;
        if (newPoints.length > 1) {
          result = pr.Recognize(newPoints).Name;
          // console.log(result.Name)
        }

        //Calculate location where new shape will be spawned
        const tempLine = new Konva.Line({ points: oldPoints }); //only to use getClientRect() method
        const strokeBoundingBox = tempLine.getClientRect();
        const drawLocation = { x: strokeBoundingBox.x + strokeBoundingBox.width / 2, y: strokeBoundingBox.y + strokeBoundingBox.height / 2 }

        const stageTransform = stageRef.current.getAbsoluteTransform().copy();
        const position = stageTransform.invert().point(drawLocation);

        if (!MAGIC_BRUSH_SCALING_ENABLED) {
          if (result) createShape({ ...drawLocation, shapeType: result });
        } else {
          if (result) {
            const multiplier = strokeBoundingBox.width / ShapeObject[result].width;
            // createShapeExtraAttr({
            //   ...drawLocation, shapeType: result,
            //   width: ShapeObject[result].width + (ShapeObject[result].width * multiplier),
            //   height: ShapeObject[result].height + (ShapeObject[result].height * multiplier)
            // });
            createShapeExtraAttr({
              x:position.x, y:position.y, shapeType: result,
              width: ShapeObject[result].width + (ShapeObject[result].width * multiplier),
              height: ShapeObject[result].height + (ShapeObject[result].height * multiplier)
            });

          }
        }

      } else if (props.tool === TOOLS.NORMAL_BRUSH && freehandLines[0].points.length > 0) {
        props.setShapes(ps => produce(ps, d => {
          d[matrixNumber].push({ id: nanoid(), type: SHAPE_TYPES.FREEHAND_STROKE, points: freehandLines[0].points, stroke: "#000000", strokeWidth: 4, tension: 0.5, lineCap: "round", lineJoin: "round", bezier: "true" })
        }))
      }
    }

    setFreehandLines([]); //Only care about 1 stroke at a time
  };
  
  /////////////////////////////////////

  const handleContextMenu = (e) => {
    e.evt.preventDefault();
  }

  return (
    <Box id={props.id} className={props.selectedMatrix === matrixNumber ? "matrix selected" : "matrix"} ref={divRef}
      onDragOver={handleDragOver} onDrop={handleDrop}
      sx={stageSizeToggle ? { width: matrix_size*2, height: matrix_size*2 } : { width: matrix_size, height: matrix_size } }
    >
      <Stage ref={stageRef} className="stage" scaleX={stageSizeToggle ? scaleInc : 1} scaleY={stageSizeToggle ? scaleInc : 1}
        width={dimensions.width} height={dimensions.height} onDblClick={EXPERIMENT_doubleClick}
        onClick={handleCanvasClick} onMouseDown={handleMouseDown} onMousemove={handleMouseMove} onMouseup={handleMouseUp} onContextMenu={handleContextMenu}>
        <Layer className="layer" ref={layerRef}>

          <Rect class="bg-color-rect" width={stageSizeToggle ? matrix_size*2 : matrix_size} height={stageSizeToggle ? matrix_size*2 : matrix_size} x={0} y={0} fill="white" />{/* background color, do not remove */}

          {props.shapes.map(s => <GenericShape key={s.id}
            selectedShapeID={selectedShapeID} setSelectedShapeID={setSelectedShapeID}
            matrixNumber={matrixNumber}
            setSelectedMatrix={setSelectedMatrix}
            shapes={props.shapes} setShapes={props.setShapes}
            layerRef={layerRef}
            shapeNode={props.shapeNode}
            isDrawing={isDrawing} 
            tool={props.tool} setTool={props.setTool} otherTool={props.otherTool}
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


