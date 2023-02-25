/** 
 These are the objects that are directly used in the creation functions as is
 as opposed to ShapesData.js which basically defines some traits as constants which are then
 used in multiple places as necessary.
 These used to exist solely in Matrix.js but then the exact format was needed in ToolBox.js
 to handle clicks. To avoid copy-pasting, I put them here in this file so both Matrix.js and Toolbox.js
 can share a central description of the shapes. The createSquare() etc. functions could not be decoupled
 because they relied upon setShapes, matrixNumber which would be hellish to maintain without a global state
 solution.
 The respective functions using these MUST manually add id:nanoid() and the x/y coordinates using the spread operator
 **/


import { DEFAULTS, SHAPE_TYPES } from "./ShapesData";

export const squareObj = {
  type: SHAPE_TYPES.SQUARE,
  width: DEFAULTS.SQUARE.WIDTH,
  height: DEFAULTS.SQUARE.HEIGHT,
  fill: DEFAULTS.SQUARE.FILL,
  stroke: DEFAULTS.SQUARE.STROKE,
  strokeWidth: DEFAULTS.SQUARE.STROKE_WIDTH,
  dash: DEFAULTS.SQUARE.DASH,
  rotation: DEFAULTS.SQUARE.ROTATION,
}

export const circleObj = {
  type: SHAPE_TYPES.CIRCLE,
  radius: DEFAULTS.CIRCLE.RADIUS,
  fill: DEFAULTS.CIRCLE.FILL,
  stroke: DEFAULTS.CIRCLE.STROKE,
  strokeWidth: DEFAULTS.CIRCLE.STROKE_WIDTH,
  dash: DEFAULTS.CIRCLE.DASH,
}

export const verticalLineObj = {
  type: SHAPE_TYPES.VERTICAL_LINE,
  stroke: DEFAULTS.VERTICAL_LINE.STROKE,
  strokeWidth: DEFAULTS.VERTICAL_LINE.STROKE_WIDTH,
  dash: DEFAULTS.VERTICAL_LINE.DASH,
  rotation: DEFAULTS.VERTICAL_LINE.ROTATION,
  points: [0, 0, 0, DEFAULTS.VERTICAL_LINE.HEIGHT],
}

export const tiltedLineObj = {
  type: SHAPE_TYPES.TILTED_LINE,
  stroke: DEFAULTS.TILTED_LINE.STROKE,
  strokeWidth: DEFAULTS.TILTED_LINE.STROKE_WIDTH,
  dash: DEFAULTS.TILTED_LINE.DASH,
  rotation: DEFAULTS.TILTED_LINE.ROTATION,
  points: [0, 0, 0, DEFAULTS.TILTED_LINE.HEIGHT],
}

export const cLineObj = {
  type: SHAPE_TYPES.C_LINE,
  width: DEFAULTS.C_LINE.WIDTH,
  height: DEFAULTS.C_LINE.HEIGHT,
  stroke: DEFAULTS.C_LINE.STROKE,
  strokeWidth: DEFAULTS.C_LINE.STROKE_WIDTH,
  dash: DEFAULTS.C_LINE.DASH,
  rotation: DEFAULTS.C_LINE.ROTATION,
}

export const sLineObj = {
  type: SHAPE_TYPES.S_LINE,
  width: DEFAULTS.S_LINE.WIDTH,
  height: DEFAULTS.S_LINE.HEIGHT,
  stroke: DEFAULTS.S_LINE.STROKE,
  strokeWidth: DEFAULTS.S_LINE.STROKE_WIDTH,
  dash: DEFAULTS.S_LINE.DASH,
  rotation: DEFAULTS.S_LINE.ROTATION,
}