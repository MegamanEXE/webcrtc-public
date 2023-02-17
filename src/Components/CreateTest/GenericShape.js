import produce from "immer";
import { useCallback, useEffect, useRef, useState } from "react";
import { Circle, Rect, Transformer } from "react-konva";
import { LIMITS, SHAPE_TYPES } from "./ShapesData";

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



export default function GenericShape({ selectedShapeID, setSelectedShapeID, matrixNumber, shapes, setShapes, ...props }) {
  // let isSelected = props.id === props.selectedShapeID;
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

  //Transform shapes, this is the only somewhat complicated function
  const transformRectShape = (node, id, e) => {
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

        d.rotation = node.rotation();

        d.width = clamp(node.width() * scaleX, LIMITS.RECT.MIN, LIMITS.RECT.MAX);
        d.height = clamp(node.height() * scaleY, LIMITS.RECT.MIN, LIMITS.RECT.MAX);
      }));
    }
  }

  useEffect(() => {
    setIsSelected(selectedShapeID === props.id)
  }, [selectedShapeID])

  // Important pattern that somehow resolves the first click issue.
  const handleSelect = useCallback((event) => {
    event.cancelBubble = true;
    setSelectedShapeID(props.id);
    setIsSelected(selectedShapeID === props.id)
  }, [selectedShapeID]
  );


  // const handleSelect = () => {
  //     setSelectedShapeID(props.id);
  //     // setIsSelected(selectedShapeID === props.id);
  // }

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]); //if things go bad, check this later, may have to change isSelected to a state var 




  const handleDrag = useCallback((event) => {
    moveShape(props.id, event);
  }, [props.id]);

  const handleTransform = useCallback((event) => {
    transformRectShape(shapeRef.current, props.id, event);
  }, [props.id]);

  switch (props.type) {
    case SHAPE_TYPES.SQUARE:
      return <><Rect ref={shapeRef} {...props} draggable isSelected={isSelected} onClick={handleSelect} onTap={handleSelect} onDragStart={handleSelect} onDragEnd={handleDrag} onTransformEnd={handleTransform} />
        {
          isSelected && (
            <Transformer
              anchorSize={5}
              borderDash={[6, 2]}
              ref={transformerRef}
              boundBoxFunc={boundBoxCallbackForRectangle}
            />
          )
        }</>
    case SHAPE_TYPES.RECT:
      return <Rect {...props} draggable />
    case SHAPE_TYPES.CIRCLE:
      return <Circle {...props} draggable />
    default:
      return null
  }

}