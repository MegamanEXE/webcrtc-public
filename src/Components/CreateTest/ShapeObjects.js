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

 In the IDE, open tabs in the order: ShapeObjects > Toolbox > Matrix > GenericShape for easier insertions
 **/


import { DEFAULTS, SHAPE_TYPES } from "./ShapesData";

//LINES
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

export const eightLineObj = {
  type: SHAPE_TYPES.EIGHT_LINE,
  width: DEFAULTS.EIGHT_LINE.WIDTH,
  height: DEFAULTS.EIGHT_LINE.HEIGHT,
  stroke: DEFAULTS.EIGHT_LINE.STROKE,
  strokeWidth: DEFAULTS.EIGHT_LINE.STROKE_WIDTH,
  dash: DEFAULTS.EIGHT_LINE.DASH,
  rotation: DEFAULTS.EIGHT_LINE.ROTATION,
}

// RECT
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

export const diamondObj = {
  type: SHAPE_TYPES.DIAMOND,
  width: DEFAULTS.DIAMOND.WIDTH,
  height: DEFAULTS.DIAMOND.HEIGHT,
  fill: DEFAULTS.DIAMOND.FILL,
  stroke: DEFAULTS.DIAMOND.STROKE,
  strokeWidth: DEFAULTS.DIAMOND.STROKE_WIDTH,
  dash: DEFAULTS.DIAMOND.DASH,
  rotation: DEFAULTS.DIAMOND.ROTATION,
}

export const tallFatRectObj = {
  type: SHAPE_TYPES.TALL_FAT_RECT,
  width: DEFAULTS.TALL_FAT_RECT.WIDTH,
  height: DEFAULTS.TALL_FAT_RECT.HEIGHT,
  fill: DEFAULTS.TALL_FAT_RECT.FILL,
  stroke: DEFAULTS.TALL_FAT_RECT.STROKE,
  strokeWidth: DEFAULTS.TALL_FAT_RECT.STROKE_WIDTH,
  dash: DEFAULTS.TALL_FAT_RECT.DASH,
  rotation: DEFAULTS.TALL_FAT_RECT.ROTATION,
}

export const tallThinRectObj = {
  type: SHAPE_TYPES.TALL_THIN_RECT,
  width: DEFAULTS.TALL_THIN_RECT.WIDTH,
  height: DEFAULTS.TALL_THIN_RECT.HEIGHT,
  fill: DEFAULTS.TALL_THIN_RECT.FILL,
  stroke: DEFAULTS.TALL_THIN_RECT.STROKE,
  strokeWidth: DEFAULTS.TALL_THIN_RECT.STROKE_WIDTH,
  dash: DEFAULTS.TALL_THIN_RECT.DASH,
  rotation: DEFAULTS.TALL_THIN_RECT.ROTATION,
}

export const tiltedRectObj = {
  type: SHAPE_TYPES.TILTED_RECT,
  width: DEFAULTS.TILTED_RECT.WIDTH,
  height: DEFAULTS.TILTED_RECT.HEIGHT,
  fill: DEFAULTS.TILTED_RECT.FILL,
  stroke: DEFAULTS.TILTED_RECT.STROKE,
  strokeWidth: DEFAULTS.TILTED_RECT.STROKE_WIDTH,
  dash: DEFAULTS.TILTED_RECT.DASH,
  rotation: DEFAULTS.TILTED_RECT.ROTATION,
  skewX: DEFAULTS.TILTED_RECT.SKEWX,
}

export const foldedRectObj = {
  type: SHAPE_TYPES.FOLDED_RECT,
  width: DEFAULTS.FOLDED_RECT.WIDTH,
  height: DEFAULTS.FOLDED_RECT.HEIGHT,
  fill: DEFAULTS.FOLDED_RECT.FILL,
  stroke: DEFAULTS.FOLDED_RECT.STROKE,
  strokeWidth: DEFAULTS.FOLDED_RECT.STROKE_WIDTH,
  dash: DEFAULTS.FOLDED_RECT.DASH,
  rotation: DEFAULTS.FOLDED_RECT.ROTATION,
}

export const tallRectObj = {
  type: SHAPE_TYPES.TALL_RECT,
  width: DEFAULTS.TALL_RECT.WIDTH,
  height: DEFAULTS.TALL_RECT.HEIGHT,
  fill: DEFAULTS.TALL_RECT.FILL,
  stroke: DEFAULTS.TALL_RECT.STROKE,
  strokeWidth: DEFAULTS.TALL_RECT.STROKE_WIDTH,
  dash: DEFAULTS.TALL_RECT.DASH,
  rotation: DEFAULTS.TALL_RECT.ROTATION,
}

export const cRectObj = {
  type: SHAPE_TYPES.C_RECT,
  width: DEFAULTS.C_RECT.WIDTH,
  height: DEFAULTS.C_RECT.HEIGHT,
  fill: DEFAULTS.C_RECT.FILL,
  stroke: DEFAULTS.C_RECT.STROKE,
  strokeWidth: DEFAULTS.C_RECT.STROKE_WIDTH,
  dash: DEFAULTS.C_RECT.DASH,
  rotation: DEFAULTS.C_RECT.ROTATION,
}

export const topLeftRectObj = {
  type: SHAPE_TYPES.TOP_LEFT_RECT,
  width: DEFAULTS.TOP_LEFT_RECT.WIDTH,
  height: DEFAULTS.TOP_LEFT_RECT.HEIGHT,
  fill: DEFAULTS.TOP_LEFT_RECT.FILL,
  stroke: DEFAULTS.TOP_LEFT_RECT.STROKE,
  strokeWidth: DEFAULTS.TOP_LEFT_RECT.STROKE_WIDTH,
  dash: DEFAULTS.TOP_LEFT_RECT.DASH,
  rotation: DEFAULTS.TOP_LEFT_RECT.ROTATION,
}

export const starObj = {
  type: SHAPE_TYPES.STAR,
  width: DEFAULTS.STAR.WIDTH,
  height: DEFAULTS.STAR.HEIGHT,
  fill: DEFAULTS.STAR.FILL,
  stroke: DEFAULTS.STAR.STROKE,
  strokeWidth: DEFAULTS.STAR.STROKE_WIDTH,
  dash: DEFAULTS.STAR.DASH,
  rotation: DEFAULTS.STAR.ROTATION,

}

export const starMediumObj = {
  type: SHAPE_TYPES.STAR_MEDIUM,
  width: DEFAULTS.STAR_MEDIUM.WIDTH,
  height: DEFAULTS.STAR_MEDIUM.HEIGHT,
  fill: DEFAULTS.STAR_MEDIUM.FILL,
  stroke: DEFAULTS.STAR_MEDIUM.STROKE,
  strokeWidth: DEFAULTS.STAR_MEDIUM.STROKE_WIDTH,
  dash: DEFAULTS.STAR_MEDIUM.DASH,
  rotation: DEFAULTS.STAR_MEDIUM.ROTATION,
}

export const starThinObj = {
  type: SHAPE_TYPES.STAR_THIN,
  width: DEFAULTS.STAR_THIN.WIDTH,
  height: DEFAULTS.STAR_THIN.HEIGHT,
  fill: DEFAULTS.STAR_THIN.FILL,
  stroke: DEFAULTS.STAR_THIN.STROKE,
  strokeWidth: DEFAULTS.STAR_THIN.STROKE_WIDTH,
  dash: DEFAULTS.STAR_THIN.DASH,
  rotation: DEFAULTS.STAR_THIN.ROTATION,
}

//CROSS
export const plusObj = {
  type: SHAPE_TYPES.PLUS,
  width: DEFAULTS.PLUS.WIDTH,
  height: DEFAULTS.PLUS.HEIGHT,
  fill: DEFAULTS.PLUS.FILL,
  stroke: DEFAULTS.PLUS.STROKE,
  strokeWidth: DEFAULTS.PLUS.STROKE_WIDTH,
  dash: DEFAULTS.PLUS.DASH,
  rotation: DEFAULTS.PLUS.ROTATION,
}

export const crossObj = {
  type: SHAPE_TYPES.CROSS,
  width: DEFAULTS.CROSS.WIDTH,
  height: DEFAULTS.CROSS.HEIGHT,
  fill: DEFAULTS.CROSS.FILL,
  stroke: DEFAULTS.CROSS.STROKE,
  strokeWidth: DEFAULTS.CROSS.STROKE_WIDTH,
  dash: DEFAULTS.CROSS.DASH,
  rotation: DEFAULTS.CROSS.ROTATION,
}

export const orthogonalObj = {
  type: SHAPE_TYPES.ORTHOGONAL,
  width: DEFAULTS.ORTHOGONAL.WIDTH,
  height: DEFAULTS.ORTHOGONAL.HEIGHT,
  fill: DEFAULTS.ORTHOGONAL.FILL,
  stroke: DEFAULTS.ORTHOGONAL.STROKE,
  strokeWidth: DEFAULTS.ORTHOGONAL.STROKE_WIDTH,
  dash: DEFAULTS.ORTHOGONAL.DASH,
  rotation: DEFAULTS.ORTHOGONAL.ROTATION,
}

//CIRCLES
export const circleObj = {
  type: SHAPE_TYPES.CIRCLE,
  radius: DEFAULTS.CIRCLE.RADIUS,
  fill: DEFAULTS.CIRCLE.FILL,
  stroke: DEFAULTS.CIRCLE.STROKE,
  strokeWidth: DEFAULTS.CIRCLE.STROKE_WIDTH,
  dash: DEFAULTS.CIRCLE.DASH,
}

export const semicircleObj = {
  type: SHAPE_TYPES.SEMICIRCLE,
  width: DEFAULTS.SEMICIRCLE.WIDTH,
  height: DEFAULTS.SEMICIRCLE.HEIGHT,
  fill: DEFAULTS.SEMICIRCLE.FILL,
  stroke: DEFAULTS.SEMICIRCLE.STROKE,
  strokeWidth: DEFAULTS.SEMICIRCLE.STROKE_WIDTH,
  dash: DEFAULTS.SEMICIRCLE.DASH,
  rotation: DEFAULTS.SEMICIRCLE.ROTATION,
  angle: 180,
  innerRadius: 0,
  outerRadius: DEFAULTS.SEMICIRCLE.OUTER_RADIUS,
}

export const cCircleObj = {
  type: SHAPE_TYPES.C_CIRCLE,
  width: DEFAULTS.C_CIRCLE.WIDTH,
  height: DEFAULTS.C_CIRCLE.HEIGHT,
  fill: DEFAULTS.C_CIRCLE.FILL,
  stroke: DEFAULTS.C_CIRCLE.STROKE,
  strokeWidth: DEFAULTS.C_CIRCLE.STROKE_WIDTH,
  dash: DEFAULTS.C_CIRCLE.DASH,
  rotation: DEFAULTS.C_CIRCLE.ROTATION,
  innerRadius: DEFAULTS.C_CIRCLE.RADIUS,
  outerRadius: DEFAULTS.C_CIRCLE.RADIUS,
  angle: 180,
}

export const circle20MinObj = {
  type: SHAPE_TYPES.CIRCLE_20MIN,
  width: DEFAULTS.CIRCLE_20MIN.WIDTH,
  height: DEFAULTS.CIRCLE_20MIN.HEIGHT,
  fill: DEFAULTS.CIRCLE_20MIN.FILL,
  stroke: DEFAULTS.CIRCLE_20MIN.STROKE,
  strokeWidth: DEFAULTS.CIRCLE_20MIN.STROKE_WIDTH,
  dash: DEFAULTS.CIRCLE_20MIN.DASH,
  rotation: DEFAULTS.CIRCLE_20MIN.ROTATION,
  innerRadius: 0,
  outerRadius: DEFAULTS.CIRCLE_20MIN.RADIUS,
  angle:120,
}

export const quarterCircleObj = {
  type: SHAPE_TYPES.QUARTER_CIRCLE,
  width: DEFAULTS.QUARTER_CIRCLE.WIDTH,
  height: DEFAULTS.QUARTER_CIRCLE.HEIGHT,
  fill: DEFAULTS.QUARTER_CIRCLE.FILL,
  stroke: DEFAULTS.QUARTER_CIRCLE.STROKE,
  strokeWidth: DEFAULTS.QUARTER_CIRCLE.STROKE_WIDTH,
  dash: DEFAULTS.QUARTER_CIRCLE.DASH,
  rotation: DEFAULTS.QUARTER_CIRCLE.ROTATION,
  innerRadius: 0,
  outerRadius: DEFAULTS.QUARTER_CIRCLE.RADIUS,
  angle: 90,
}

export const circle10MinObj = {
  type: SHAPE_TYPES.CIRCLE_10MIN,
  width: DEFAULTS.CIRCLE_10MIN.WIDTH,
  height: DEFAULTS.CIRCLE_10MIN.HEIGHT,
  fill: DEFAULTS.CIRCLE_10MIN.FILL,
  stroke: DEFAULTS.CIRCLE_10MIN.STROKE,
  strokeWidth: DEFAULTS.CIRCLE_10MIN.STROKE_WIDTH,
  dash: DEFAULTS.CIRCLE_10MIN.DASH,
  rotation: DEFAULTS.CIRCLE_10MIN.ROTATION,
  innerRadius: 0,
  outerRadius: DEFAULTS.CIRCLE_10MIN.RADIUS,
  angle: 45,
}

export const ellipseVerticalObj = {
  type: SHAPE_TYPES.ELLIPSE_VERTICAL,
  width: DEFAULTS.ELLIPSE_VERTICAL.WIDTH,
  height: DEFAULTS.ELLIPSE_VERTICAL.HEIGHT,
  fill: DEFAULTS.ELLIPSE_VERTICAL.FILL,
  stroke: DEFAULTS.ELLIPSE_VERTICAL.STROKE,
  strokeWidth: DEFAULTS.ELLIPSE_VERTICAL.STROKE_WIDTH,
  dash: DEFAULTS.ELLIPSE_VERTICAL.DASH,
  rotation: DEFAULTS.ELLIPSE_VERTICAL.ROTATION,
  radiusX: DEFAULTS.ELLIPSE_VERTICAL.RADIUS_X,
  radiusY: DEFAULTS.ELLIPSE_VERTICAL.RADIUS_Y,
}

export const ellipseDiagonalObj = {
  type: SHAPE_TYPES.ELLIPSE_DIAGONAL,
  width: DEFAULTS.ELLIPSE_DIAGONAL.WIDTH,
  height: DEFAULTS.ELLIPSE_DIAGONAL.HEIGHT,
  fill: DEFAULTS.ELLIPSE_DIAGONAL.FILL,
  stroke: DEFAULTS.ELLIPSE_DIAGONAL.STROKE,
  strokeWidth: DEFAULTS.ELLIPSE_DIAGONAL.STROKE_WIDTH,
  dash: DEFAULTS.ELLIPSE_DIAGONAL.DASH,
  rotation: DEFAULTS.ELLIPSE_DIAGONAL.ROTATION,
  radiusX: DEFAULTS.ELLIPSE_DIAGONAL.RADIUS_X,
  radiusY: DEFAULTS.ELLIPSE_DIAGONAL.RADIUS_Y,
}

export const ellipseFoldedObj = {
  type: SHAPE_TYPES.ELLIPSE_FOLDED,
  width: DEFAULTS.ELLIPSE_FOLDED.WIDTH,
  height: DEFAULTS.ELLIPSE_FOLDED.HEIGHT,
  fill: DEFAULTS.ELLIPSE_FOLDED.FILL,
  stroke: DEFAULTS.ELLIPSE_FOLDED.STROKE,
  strokeWidth: DEFAULTS.ELLIPSE_FOLDED.STROKE_WIDTH,
  dash: DEFAULTS.ELLIPSE_FOLDED.DASH,
  rotation: DEFAULTS.ELLIPSE_FOLDED.ROTATION,
  radiusX: DEFAULTS.ELLIPSE_FOLDED.RADIUS_X,
  radiusY: DEFAULTS.ELLIPSE_FOLDED.RADIUS_Y,
}

//TRIANGLES
export const simpleTriObj = {
  type: SHAPE_TYPES.SIMPLE_TRI,
  width: DEFAULTS.SIMPLE_TRI.WIDTH,
  height: DEFAULTS.SIMPLE_TRI.HEIGHT,
  fill: DEFAULTS.SIMPLE_TRI.FILL,
  stroke: DEFAULTS.SIMPLE_TRI.STROKE,
  strokeWidth: DEFAULTS.SIMPLE_TRI.STROKE_WIDTH,
  dash: DEFAULTS.SIMPLE_TRI.DASH,
}

export const simpleTriSmallObj = {
  type: SHAPE_TYPES.SIMPLE_TRI,
  width: DEFAULTS.SIMPLE_TRI.WIDTH,
  height: DEFAULTS.SIMPLE_TRI.HEIGHT,
  fill: DEFAULTS.SIMPLE_TRI.FILL,
  stroke: DEFAULTS.SIMPLE_TRI.STROKE,
  strokeWidth: DEFAULTS.SIMPLE_TRI.STROKE_WIDTH,
  dash: DEFAULTS.SIMPLE_TRI.DASH,
}

export const simpleTriBigObj = {
  type: SHAPE_TYPES.SIMPLE_TRI,
  width: DEFAULTS.SIMPLE_TRI.WIDTH,
  height: DEFAULTS.SIMPLE_TRI.HEIGHT,
  fill: DEFAULTS.SIMPLE_TRI.FILL,
  stroke: DEFAULTS.SIMPLE_TRI.STROKE,
  strokeWidth: DEFAULTS.SIMPLE_TRI.STROKE_WIDTH,
  dash: DEFAULTS.SIMPLE_TRI.DASH,
}

export const squashedTriObj = {
  type: SHAPE_TYPES.SIMPLE_TRI,
  width: DEFAULTS.SIMPLE_TRI.WIDTH,
  height: DEFAULTS.SIMPLE_TRI.HEIGHT,
  fill: DEFAULTS.SIMPLE_TRI.FILL,
  stroke: DEFAULTS.SIMPLE_TRI.STROKE,
  strokeWidth: DEFAULTS.SIMPLE_TRI.STROKE_WIDTH,
  dash: DEFAULTS.SIMPLE_TRI.DASH,
}

export const rightTriObj = {
  type: SHAPE_TYPES.SIMPLE_TRI,
  width: DEFAULTS.SIMPLE_TRI.WIDTH,
  height: DEFAULTS.SIMPLE_TRI.HEIGHT,
  fill: DEFAULTS.SIMPLE_TRI.FILL,
  stroke: DEFAULTS.SIMPLE_TRI.STROKE,
  strokeWidth: DEFAULTS.SIMPLE_TRI.STROKE_WIDTH,
  dash: DEFAULTS.SIMPLE_TRI.DASH,
}
