import { padding } from "@mui/system";
import produce from "immer";
import Konva from "konva";
import { useCallback, useEffect, useRef, useState } from "react";
import { Arc, Circle, Ellipse, Group, Line, Rect, Shape, Star, Transformer } from "react-konva";
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

        } else if ([SHAPE_TYPES.C_LINE, SHAPE_TYPES.S_LINE, SHAPE_TYPES.EIGHT_LINE,
        SHAPE_TYPES.FOLDED_RECT].includes(d.type)) {
          d.rotation = node.rotation();

          d.width = node.width()*scaleX;
          d.height = node.height()*scaleY;

        }  else {

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
    const w = props.width;
    const h = props.height;
    switch(props.type){
      //See, I told you this would come in handy
      case SHAPE_TYPES.ELLIPSE_FOLDED:
        shapeRef.current.getSelfRect = () => { return { x: 0, y: 0, width: w+(w/3.1), height: h - (h/3.8) }; }
        break;
      case SHAPE_TYPES.OBTUSE_TRI_FOLDED:
        shapeRef.current.getSelfRect = () => { return { x: 0, y: 0, width: w*2, height: (h/2) }; }
        break;
      case SHAPE_TYPES.OBTUSE_TRI_SMALL: 
      case SHAPE_TYPES.OBTUSE_TRI_BIG: 
      case SHAPE_TYPES.OBTUSE_TRI_SLIGHT:
        shapeRef.current.getSelfRect = () => { return { x: 0, y: 0, width: w * 1.5, height: h }; }
        break;
        

      default:
        shapeRef.current.getSelfRect = () => { return { x: 0, y: 0, width: props.width, height: props.height }; }
      }
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

    case SHAPE_TYPES.TALL_FAT_RECT:
    case SHAPE_TYPES.TALL_THIN_RECT:
    case SHAPE_TYPES.TALL_RECT:
    case SHAPE_TYPES.TILTED_RECT:
    case SHAPE_TYPES.DIAMOND:
      return <>
        <Rect ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

    case SHAPE_TYPES.FOLDED_RECT:
      let {x,y,rotation, ...other} = props;
      return <>
        <Group x={x} y={y} rotation={rotation}
          ref={shapeRef} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} >
          <Rect {...other} skewX={-0.5} onTransformEnd={handleTransform} />
          <Rect {...other} skewX={0.5} onTransformEnd={handleTransform} />
        </Group>
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

    case SHAPE_TYPES.C_RECT:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w, 0);
            c.lineTo(0,0);
            c.lineTo(0,h);
            c.lineTo(w,h)
            c.fillStrokeShape(s);
          }}

        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

    case SHAPE_TYPES.TOP_LEFT_RECT:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w, 0);
            c.lineTo(0, 0);
            c.lineTo(0, h);
            c.fillStrokeShape(s);
          }}

        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

    case SHAPE_TYPES.STAR:
    case SHAPE_TYPES.STAR_MEDIUM:
    case SHAPE_TYPES.STAR_THIN:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;
            const cp = w/3; //control point

            c.beginPath();
            c.moveTo(0, 0);
            c.quadraticCurveTo(w/2, cp, w, 0);
            c.quadraticCurveTo(w-cp, h/2, w, h);
            c.quadraticCurveTo(w/2, h-cp, 0, h);
            c.quadraticCurveTo(cp, h/2, 0, 0);
            c.fillStrokeShape(s);
          }}
          lineJoin={"bevel"}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    
    case SHAPE_TYPES.PLUS:
    case SHAPE_TYPES.CROSS:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w/2, 0);
            c.lineTo(w/2,h);

            c.moveTo(0,h/2);
            c.lineTo(w,h/2)
            c.fillStrokeShape(s);
          }}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.ORTHOGONAL:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w / 2, 0);
            c.lineTo(w / 2, h/2);
            c.lineTo(0, h*0.8);
            c.moveTo(w/2,h/2);
            c.lineTo(w,h*0.8);
            c.fillStrokeShape(s);
          }}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.CIRCLE:
      return <>
        <Circle ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotateEnabled={false} enabledAnchors={["top-left", "top-right", "bottom-right", "bottom-left"]} boundBoxFunc={boundBoxCallbackForCircle} />)}
      </>
    case SHAPE_TYPES.SEMICIRCLE:
    case SHAPE_TYPES.C_CIRCLE:
    case SHAPE_TYPES.CIRCLE_20MIN:
    case SHAPE_TYPES.QUARTER_CIRCLE:
    case SHAPE_TYPES.CIRCLE_10MIN:
      return <>
        <Arc ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} enabledAnchors={["top-left", "top-right", "bottom-right", "bottom-left"]} boundBoxFunc={boundBoxCallbackForCircle} />)}
      </>

    case SHAPE_TYPES.ELLIPSE_VERTICAL:
    case SHAPE_TYPES.ELLIPSE_DIAGONAL:
      return <>
        <Ellipse ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.ELLIPSE_FOLDED:
      return <>
        <Shape ref={shapeRef} {...props} offsetX={30} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;
            const offset = w/3.5;

            c.beginPath();
            c.moveTo(0+offset, 0);
            c.bezierCurveTo(
              -w*0.75+offset, h, 
              0 + offset, h, 
              w*0.75+offset, 0 
            )
            c.closePath();

            c.moveTo(0 + offset, 0);
            c.bezierCurveTo(
              w * 0.75 + offset, h,
              w * 1.5 + offset, h,
              w * 0.75 + offset, 0
            )
            
            c.fillStrokeShape(s);
          }}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps}   boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

    case SHAPE_TYPES.SIMPLE_TRI:
    case SHAPE_TYPES.SIMPLE_TRI_SMALL: 
    case SHAPE_TYPES.SIMPLE_TRI_BIG:
    case SHAPE_TYPES.SQUASHED_TRI: 
    case SHAPE_TYPES.CONE:
          return <>
            <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
              sceneFunc={(c, s) => {
                const w = props.width;
                const h = props.height;

                c.beginPath();
                c.moveTo(w / 2, 0);
                c.lineTo(0, h);
                c.lineTo(w,h);
                c.closePath()

                c.fillStrokeShape(s);
              }}
            />
            {shapeRef.current && customTransformerBox()}
            {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
          </>
    case SHAPE_TYPES.RIGHT_TRI:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(0, h);
            c.lineTo(w, h);
            c.closePath()

            c.fillStrokeShape(s);
          }}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.RIGHT_TRI_THIN:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w, 0);
            c.lineTo(w, h);
            c.lineTo(0, h);
            c.closePath()

            c.fillStrokeShape(s);
          }}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.OBTUSE_TRI_SMALL:
    case SHAPE_TYPES.OBTUSE_TRI_BIG:
    case SHAPE_TYPES.OBTUSE_TRI_SLIGHT:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w*1.5, 0);
            c.lineTo(w, h);
            c.lineTo(0, h);
            c.closePath()

            c.fillStrokeShape(s);
          }}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.OBTUSE_TRI_FOLDED:
      return <>
        <Shape ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w*1.5, 0);
            c.lineTo(w, 0);
            c.lineTo(0, h/2);
            c.lineTo(w,h/2);
            c.closePath()

            c.moveTo(w, 0);
            c.lineTo(w*1.5, 0);
            c.lineTo(w*2, h/2);
            c.closePath();

            c.fillStrokeShape(s);
          }}
          lineJoin={"bevel"}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

      

    default:
      return null
  }

}