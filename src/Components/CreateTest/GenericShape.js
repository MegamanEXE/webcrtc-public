import { Circle, Rect } from "react-konva";
import { SHAPE_TYPES } from "./ShapesData";


export default function GenericShape(props) {

  switch (props.type) {
    case SHAPE_TYPES.SQUARE:
      return <Rect {...props} draggable/>
    case SHAPE_TYPES.RECT:
      return <Rect {...props} draggable />
    case SHAPE_TYPES.CIRCLE:
      return <Circle {...props} draggable />
    default:
      return null
  }

}