import { padding } from "@mui/system";
import produce from "immer";
import Konva from "konva";
import { useCallback, useEffect, useRef, useState } from "react";
import { Circle, Ellipse, Line, Rect, Shape, Transformer } from "react-konva";
import { DEFAULTS, LIMITS, SHAPE_TYPES } from "./ShapesData";

//Utility clamp function
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const boundBoxCallbackForRectangle = (oldBox, newBox) => {
  if (
    newBox.width < LIMITS.RECT.MIN || newBox.height < LIMITS.RECT.MIN ||
    newBox.width > LIMITS.RECT.MAX || newBox.height > LIMITS.RECT.MAX) {
    return oldBox;
  }
  return newBox;
};

const boundBoxCallbackForCircle = (oldBox, newBox) => {
  if (
    newBox.width < LIMITS.CIRCLE.MIN ||
    newBox.height < LIMITS.CIRCLE.MIN ||
    newBox.width > LIMITS.CIRCLE.MAX ||
    newBox.height > LIMITS.CIRCLE.MAX
  ) {
    return oldBox;
  }
  return newBox;
};

const boundBoxCallbackForLine = (oldBox, newBox) => {
  //In case additional processing is needed. It's fine for now
  return newBox;
};

const snaps = [0, 45, 90, 135, 180, 225, 270, 315];


export default function GenericShape({ selectedShapeID, setSelectedShapeID, matrixNumber, setSelectedMatrix, shapes, setShapes, layerRef, ...props }) {
  const [isSelected, setIsSelected] = useState(false);

  const shapeRef = useRef();
  const transformerRef = useRef();

  //Handle moving shapes, which also updates it in API
  const moveShape = (id, e) => {
    const shapeIdx = shapes.findIndex(s => s.id === id)
    if (shapeIdx !== -1) {
      setShapes(prevState => produce(prevState, (draft) => { //important distinction for future. Note the lack of { before produce(). If you put {, you'll most probably have to write prevState => {return produce(...)}
        draft[matrixNumber][shapeIdx].x = e.target.x();
        draft[matrixNumber][shapeIdx].y = e.target.y();
      }));
    }
  }

  //Update shapes in API according to new transformation
  const transformShape = (node, id, e) => {
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const shapeIdx = shapes.findIndex(s => s.id === id);

    if (shapeIdx !== -1) {
      setShapes(prevState => produce(prevState, (draft) => {
        let d = draft[matrixNumber][shapeIdx];
        d.x = node.x();
        d.y = node.y();

        //Handle specific cases here
        if (d.type === SHAPE_TYPES.CIRCLE) {

          d.radius = clamp((node.width() * scaleX) / 2, LIMITS.CIRCLE.MIN, LIMITS.CIRCLE.MAX);

        } else if ([SHAPE_TYPES.VERTICAL_LINE, SHAPE_TYPES.TILTED_LINE].includes(d.type)) {

          const oldPoints = node.points();
          const newPoints = [];
          for (var i = 0; i < oldPoints.length / 2; i++) {
            const point = {
              x: oldPoints[i * 2] * scaleX,
              y: oldPoints[i * 2 + 1] * scaleY,
            }
            newPoints.push(point.x, point.y);
          }

          d.points = newPoints;

        } else if ([SHAPE_TYPES.C_LINE, SHAPE_TYPES.S_LINE, SHAPE_TYPES.EIGHT_LINE].includes(d.type)) {
          d.rotation = node.rotation();

          d.width = node.width()*scaleX;
          d.height = node.height()*scaleY;

        } else {

          d.rotation = node.rotation();

          d.width = clamp(node.width() * scaleX, LIMITS.RECT.MIN, LIMITS.RECT.MAX);
          d.height = clamp(node.height() * scaleY, LIMITS.RECT.MIN, LIMITS.RECT.MAX);

        }
      }));
    }
  }

  //Mark active
  useEffect(() => {
    setIsSelected(selectedShapeID === props.id)
  }, [selectedShapeID])

  // Important pattern that somehow resolves the first click issue.
  const handleSelect = useCallback((event) => {
    event.cancelBubble = true;
    setSelectedShapeID(props.id);
    setSelectedMatrix(matrixNumber);
    setIsSelected(selectedShapeID === props.id)
  }, [selectedShapeID]
  );

  //Add transformer nodes to selected shape
  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  //Event handler for moving shapes
  const handleDrag = useCallback((event) => {
    moveShape(props.id, event);
  }, [props.id]);

  //Event handler for transforming shapes
  const handleTransform = useCallback((event) => {
    transformShape(shapeRef.current, props.id, event);
  }, [props.id]);

  //Custom shapes do not have natural transformer bounding boxes so they are manually defined like this
  //Do not be discouraged from this, this is more about manually adusting the box when NECESSARY, it wasn't always explicitly defined like this
  //but transforming lines comes with its own set of problems, which are fixed here.
  //At this point in time, they can probably be merged into one but I'll keep my options open until more shapes are defined

  //Update: I've normalized the shapes enough that this one generic function works for all lines, but keeping this code in case fine-tuning is required
  const customTransformerBox = () => {
    // switch(props.type){
    //   case SHAPE_TYPES.C_LINE:
    //     shapeRef.current.getSelfRect = () => { return { x: 0, y: 0, width: DEFAULTS.C_LINE.WIDTH, height: DEFAULTS.C_LINE.HEIGHT }; }
    //     break;

    //   case SHAPE_TYPES.S_LINE:
    //     shapeRef.current.getSelfRect = () => { return { x: 0, y: 0, width: DEFAULTS.S_LINE.WIDTH, height: DEFAULTS.S_LINE.HEIGHT }; }
    //     break;

    //   default:
    //     break;
    // }
    shapeRef.current.getSelfRect = () => { return { x: 0, y: 0, width: props.width, height: props.height }; }
  }

  //MAIN return
  switch (props.type) {
    case SHAPE_TYPES.SQUARE:
      return <>
        <Rect ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.RECT:
      return <>
        <Rect ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.CIRCLE:
      return <>
        <Circle ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
        />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotateEnabled={false} enabledAnchors={["top-left", "top-right", "bottom-right", "bottom-left"]} boundBoxFunc={boundBoxCallbackForCircle} />)}
      </>
    case SHAPE_TYPES.VERTICAL_LINE:
      return <>
        <Line ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} />
        {isSelected && (<Transformer padding={10} rotateAnchorOffset={20} anchorSize={8} borderDash={[6, 2]} ref={transformerRef} enabledAnchors={['top-center', 'bottom-center']}  boundBoxFunc={boundBoxCallbackForLine} />) }
      </>
    case SHAPE_TYPES.TILTED_LINE:
      return <>
        <Line ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} />
        {isSelected && (<Transformer padding={10} rotateAnchorOffset={20} anchorSize={8} borderDash={[6, 2]} ref={transformerRef} enabledAnchors={['top-center', 'bottom-center']} boundBoxFunc={boundBoxCallbackForLine} />)}
      </>
    case SHAPE_TYPES.C_LINE:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} 
          sceneFunc={(c,s)=>{
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w/2, 0);
            c.quadraticCurveTo(
              -w/2, h/2,
              w/2, h);
            c.fillStrokeShape(s);
          }}
        
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer padding={10} ignoreStroke={true} rotateAnchorOffset={20} anchorSize={8} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} enabledAnchors={['top-center', 'bottom-center']} boundBoxFunc={boundBoxCallbackForLine} />)}
      </>
    case SHAPE_TYPES.S_LINE:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w/2, 0);
            c.bezierCurveTo(
              -w/2, h/4, 
              w*1.5, h*0.75, 
              w/2, h
            );
            c.fillStrokeShape(s);
          }}

        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer padding={10} ignoreStroke={true} rotateAnchorOffset={20} anchorSize={8} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} enabledAnchors={['top-center', 'bottom-center']} boundBoxFunc={boundBoxCallbackForLine} />)}
      </>
    case SHAPE_TYPES.EIGHT_LINE:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w / 2, 0);
            c.bezierCurveTo(
              -w / 2, h / 4,
              w * 1.5, h * 0.75,
              w / 2, h
            );
            c.fillStrokeShape(s);

            
            c.moveTo(w / 2, 0);
            c.bezierCurveTo(
              w*1.5, h / 4,
              -w*0.5, h * 0.75,
              w / 2, h
            );
            c.fillStrokeShape(s);

          }}

        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer padding={10} ignoreStroke={true} rotateAnchorOffset={20} anchorSize={8} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} enabledAnchors={['top-center', 'bottom-center']} boundBoxFunc={boundBoxCallbackForLine} />)}
      </>
    default:
      return null
  }

}