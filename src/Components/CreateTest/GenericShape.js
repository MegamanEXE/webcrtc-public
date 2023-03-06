import produce from "immer";
import { useCallback, useEffect, useRef, useState } from "react";
import { Arc, Circle, Ellipse, Group, Line, Rect, RegularPolygon, Shape, Star, Transformer } from "react-konva";
import { DEFAULTS, LIMITS, SHAPE_TYPES, TOOLS } from "./ShapesData";
import { Html } from "react-konva-utils"
import { Button } from "@mui/material";

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

//XD. In hindsight, should not have done it like this
export default function GenericShape({ selectedShapeID, setSelectedShapeID, matrixNumber, setSelectedMatrix, shapes, setShapes, layerRef, shapeNode, isDrawing, tool, setTool, ...props }) {
  const [isSelected, setIsSelected] = useState(false);

  
  const transformerRef = useRef();
  const shapeRef = useRef(); //local to this file, used for coupling transformers to shapes

  // const shapeNode = props.shapeNode; //This is to share the actual Konva node. Basically so Toolbox has access to the full shape node, not just the shapes array


  /********************************** 
     Context Menu
     Currently not working. So right click deletes a shape
    ***********************************/
  const ctxMenuRef = useRef(null);
  const [ctxMenuActive, setCtxMenuActive] = useState(false);

  //Delete shape using context menu
  const deleteShape = () => {
    // console.log("Deleting Shape", props.id)
    setIsSelected(false)
    const shapeIdx = shapes.findIndex(s => s.id === props.id);

    setShapes(prevState => produce(prevState, (draft) => {
      if (shapeIdx !== -1) draft[matrixNumber].splice(shapeIdx, 1)
    }));
  }

  //Context menu
  const ContextMenu = () => {
    return (<div id="shapeContextMenu" ref={ctxMenuRef}>
      <Button onClick={deleteShape}>Delete</Button>
    </div>)
  }

  //Handle right clicking on stage
  const handleContextMenu = (e) => {
    e.evt.preventDefault();
    setCtxMenuActive(true);
    
    //Until a better way
    deleteShape();

  }

  //Useless atm
  const renderContextMenu = () => {
    console.log(ctxMenuRef.current)
    if (ctxMenuRef.current) {
      ctxMenuRef.current.style.display = 'initial';
      ctxMenuRef.current.style.top = 25;
      ctxMenuRef.current.style.left = 25;
    }


  }

  ///////////////////////////////////


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
        d.offsetX = node.offsetX();
        d.offsetY = node.offsetY();

        //Handle specific cases here
        if (d.type === SHAPE_TYPES.CIRCLE) {

          d.radius = clamp((node.width() * scaleX) / 2, LIMITS.CIRCLE.MIN, LIMITS.CIRCLE.MAX);

        } else if ([SHAPE_TYPES.VERTICAL_LINE, SHAPE_TYPES.TILTED_LINE].includes(d.type)) {

          const oldPoints = node.points();
          const newPoints = [];
          for (let i = 0; i < oldPoints.length / 2; i++) {
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

        } else if (d.type === SHAPE_TYPES.FREEHAND_STROKE) {
          d.rotation = node.rotation();

          const oldPoints = node.points();
          const newPoints = [];
          for (let i = 0; i < oldPoints.length / 2; i++) {
            const point = {
              x: oldPoints[i * 2] * scaleX,
              y: oldPoints[i * 2 + 1] * scaleY,
            }
            newPoints.push(point.x, point.y);
          }

          d.points = newPoints;
          d.width = node.width() * scaleX;
          d.height = node.height() * scaleY;
          d.offsetX = d.width/2;
          d.offsetY = d.height/2;

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
  }, [selectedShapeID, tool])

  // Important pattern that somehow resolves the first click issue.
  const handleSelect = useCallback((event) => {
    event.cancelBubble = true;
    setTool(TOOLS.SELECT);
    
    if (tool === TOOLS.DELETE) {
      deleteShape();
    } else {
      setSelectedMatrix(matrixNumber);
      setSelectedShapeID(props.id);
      setIsSelected(selectedShapeID === props.id)
    }
  

  }, [selectedShapeID]
  );

  //Add transformer nodes to selected shape
  useEffect(() => {
    if (isSelected) {
      //Make the rotation anchor always above top. Currently bugged;
      //the transformer goes to minimum height if flip is used

      // transformerRef.current.useSingleNodeRotation(false); 

      transformerRef.current.nodes([shapeRef.current]);
      shapeNode.current = shapeRef.current
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  //Event handler for moving shapes
  const handleDrag = useCallback((event) => {
    setTool(TOOLS.SELECT);
    if (tool === TOOLS.DELETE) {
      deleteShape();
      return;
    }
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
      case SHAPE_TYPES.SEMIHEXAGON:
        shapeRef.current.getSelfRect = () => { return { x: 0, y: 0, width: props.width/2, height: props.height }; }
        break;

      default:
        shapeRef.current.getSelfRect = () => { return { x: 0, y: 0, width: props.width, height: props.height }; }
      }

  }

  const defaultProps = {
    draggable: true,
    isSelected: isSelected,
    onClick :handleSelect,
    onTap: handleSelect, 
    onDragStart: handleSelect,
    onDragEnd: handleDrag,
    onTransformEnd: handleTransform,
    onContextMenu: handleContextMenu,
  }
  
  //MAIN return
  switch (props.type) {
    
    //Note: freehand_stroke does not have {...defaultProps} or a transformer, that is intentional
    case SHAPE_TYPES.FREEHAND_STROKE:
      return <>
        <Line ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}

      </>

    case SHAPE_TYPES.SQUARE:
      return <>
        <Rect ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
        
      </>
    case SHAPE_TYPES.RECT:
      return <>
        <Rect ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.VERTICAL_LINE:
      return <>
        <Line ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer padding={10} rotateAnchorOffset={20} anchorSize={8} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} enabledAnchors={['top-center', 'bottom-center']}  boundBoxFunc={boundBoxCallbackForLine} />) }
      </>
    case SHAPE_TYPES.TILTED_LINE:
      return <>
        <Line ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer padding={10} rotateAnchorOffset={20} anchorSize={8} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} enabledAnchors={['top-center', 'bottom-center']} boundBoxFunc={boundBoxCallbackForLine} />)}
      </>
    case SHAPE_TYPES.C_LINE:
      return <>
        <Shape ref={shapeRef} {...props} {...defaultProps} 
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
        {isSelected && (<Transformer padding={10} ignoreStroke={true} rotateAnchorOffset={20} anchorSize={8} borderDash={[6, 2]} ref={transformerRef}  rotationSnaps={snaps} enabledAnchors={['top-center', 'bottom-center']} boundBoxFunc={boundBoxCallbackForLine} />)}
      </>
    case SHAPE_TYPES.S_LINE:
      return <>
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Rect ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

    case SHAPE_TYPES.FOLDED_RECT:
      return <>
        <Shape ref={shapeRef} {...props} {...defaultProps}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w*0.33, 0);
            c.lineTo(0, h);
            c.lineTo(w*0.33, h);
            c.lineTo(w*0.66, 0);
            c.closePath()

            c.moveTo(w * 0.33, 0);
            c.lineTo(w*0.66, 0);
            c.lineTo(w, h);
            c.lineTo(w*0.66, h);
            c.closePath()
            
            c.fillStrokeShape(s);
          }}

        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

    case SHAPE_TYPES.C_RECT:
      return <>
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Circle ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotateEnabled={false} enabledAnchors={["top-left", "top-right", "bottom-right", "bottom-left"]} boundBoxFunc={boundBoxCallbackForCircle} />)}
      </>
    case SHAPE_TYPES.SEMICIRCLE:
    case SHAPE_TYPES.C_CIRCLE:
    case SHAPE_TYPES.CIRCLE_20MIN:
    case SHAPE_TYPES.QUARTER_CIRCLE:
    case SHAPE_TYPES.CIRCLE_10MIN:
      return <>
        <Arc ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} enabledAnchors={["top-left", "top-right", "bottom-right", "bottom-left"]} boundBoxFunc={boundBoxCallbackForCircle} />)}
      </>

    case SHAPE_TYPES.ELLIPSE_VERTICAL:
    case SHAPE_TYPES.ELLIPSE_DIAGONAL:
      return <>
        <Ellipse ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.ELLIPSE_FOLDED:
      return <>
        <Shape ref={shapeRef} {...props} offsetX={30} {...defaultProps}
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
            <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Shape ref={shapeRef} {...props} {...defaultProps}
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
        <Shape ref={shapeRef} {...props} {...defaultProps}
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

    case SHAPE_TYPES.HEXAGON:
      return <>
        <RegularPolygon sides={6} ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.SEMIHEXAGON:
    case SHAPE_TYPES.C_HEXAGON:
      return <>
        <Shape ref={shapeRef} {...props} {...defaultProps}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(w*0.5, 0);
            c.lineTo(0, h*0.25);
            c.lineTo(0, h*0.75);
            c.lineTo(w*0.5, h);

            if(props.type === SHAPE_TYPES.SEMIHEXAGON)
              c.closePath();
            
            c.fillStrokeShape(s);
          }}
          lineJoin={"bevel"}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.RHOMBUS:
      //Technically it's not even supposed to be a rhombus
      return <>
        <Shape ref={shapeRef} {...props} {...defaultProps}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;

            c.beginPath();
            c.moveTo(0, h*0.33);
            c.lineTo(0, h);
            c.lineTo(w, h*0.67);
            c.lineTo(w, 0);
            c.closePath();

            c.fillStrokeShape(s);
          }}
          lineJoin={"bevel"}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

    case SHAPE_TYPES.DOT_HOLLOW:
    case SHAPE_TYPES.DOT_FILLED:
      return <>
        <Circle ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotateEnabled={false} enabledAnchors={["top-left", "top-right", "bottom-right", "bottom-left"]} boundBoxFunc={boundBoxCallbackForCircle} />)}
      </>
    case SHAPE_TYPES.DOT4_HOLLOW:
    case SHAPE_TYPES.DOT4_FILLED:
      return <>
        <Shape ref={shapeRef} {...props} {...defaultProps}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;
            const r = props.radius;

            c.beginPath();
            c.arc(0+r, r, r, 0, 2 * Math.PI);
            c.closePath();
            c.fillStrokeShape(s);

            c.beginPath();
            c.arc(w-r, 0+r , r, 0, 2 * Math.PI);
            c.closePath();
            c.fillStrokeShape(s);

            c.beginPath();
            c.arc(0 + r, h-r, r, 0, 2 * Math.PI);
            c.closePath();
            c.fillStrokeShape(s);

            c.beginPath();
            c.arc(w-r, h-r, r, 0, 2 * Math.PI);
            c.closePath();
            c.fillStrokeShape(s);
          }}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>

    case SHAPE_TYPES.DOT_SQUARE_HOLLOW:
    case SHAPE_TYPES.DOT_SQUARE_FILLED:
      return <>
        <Rect ref={shapeRef} {...props} {...defaultProps} />
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    case SHAPE_TYPES.DOT4_SQUARE_HOLLOW:
    case SHAPE_TYPES.DOT4_SQUARE_FILLED:
      return <>
        <Shape ref={shapeRef} {...props} {...defaultProps}
          sceneFunc={(c, s) => {
            const w = props.width;
            const h = props.height;
            const size = w/3;

            c.beginPath();
            c.rect(0, 0, size,size)
            c.rect(w-size, 0, size, size)
            c.rect(0, h-size, size, size)
            c.rect(w-size, h-size, size, size)
            c.closePath();
            c.fillStrokeShape(s);
            
          }}
        />
        {shapeRef.current && customTransformerBox()}
        {isSelected && (<Transformer anchorSize={5} rotateAnchorOffset={20} borderDash={[6, 2]} ref={transformerRef} rotationSnaps={snaps} boundBoxFunc={boundBoxCallbackForRectangle} />)}
      </>
    default:
      return null
  }

}