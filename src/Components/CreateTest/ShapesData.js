//These are used internally exclusively within this file for easier adjustment
//Do not attempt to use these variable outside this file (hence the lack of export)
const defaultStrokeWidth = 2;
const defaultStroke = "#000000";
const defaultFill = "#ffff";
const defaultDash = [0,0];
const defaultHeight = 50;
const defaultWidth = 50;

export const SHAPE_TYPES = {
  SQUARE: "square",
  RECT: "rect",
  CIRCLE: "circle",
  VERTICAL_LINE: "vertical_line",
  TILTED_LINE: "tilted_line",
  C_LINE: "c_line",
  EIGHT_LINE: "eight_line",
  S_LINE: "s_line"

};

export const DEFAULTS = {
  SQUARE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: 80,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  CIRCLE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    RADIUS: 25,
    DASH: defaultDash,
  }, 
  VERTICAL_LINE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TILTED_LINE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    HEIGHT: defaultHeight,
    ROTATION: 45,
    DASH: defaultDash,
  },
  C_LINE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    HEIGHT: defaultHeight,
    WIDTH: defaultHeight / 2,
    ROTATION: 0,
    DASH: defaultDash,
  },
  S_LINE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    WIDTH: defaultHeight/2,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
};

export const LIMITS = {
  RECT: {
    MAX: 125,
    MIN: 10,
  },
  CIRCLE: {
    MAX: 150,
    MIN: 10,
  },
};

export const SHAPE_ACTIONS = {
  STROKE_BOLD: "stroke_bold",
  STROKE_DASHED: "stroke_dashed",
  FILL_TEXTURE: "fill_texture"
}
