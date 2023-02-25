//These are used internally exclusively within this file for easier adjustment
//Do not attempt to use these variable outside this file (hence the lack of export)
const defaultStrokeWidth = 2;
const defaultStroke = "#000000";
const defaultFill = "#ffff";
const defaultDash = [0,0];
const defaultHeight = 50;
const defaultWidth = 50;

export const SHAPE_TYPES = {
  
  RECT: "rect",

  VERTICAL_LINE: "vertical_line",
  TILTED_LINE: "tilted_line",
  C_LINE: "c_line",
  EIGHT_LINE: "eight_line",
  S_LINE: "s_line",

  SQUARE: "square",
  DIAMOND: "diamond",
  TALL_FAT_RECT: "tall_fat_rect",
  TALL_THIN_RECT: "tall_thin_rect",
  TILTED_RECT: "tilted_rect",
  FOLDED_RECT: "folded_rect",
  TALL_RECT: "tall_rect",
  C_RECT: "c_rect",
  TOP_LEFT_RECT: "top_left_rect",
  STAR: "star",
  STAR_MEDIUM: "star_medium",
  STAR_THIN: "star_thin",

  CIRCLE: "circle",



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
  EIGHT_LINE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    WIDTH: defaultHeight / 2,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  DIAMOND: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TALL_FAT_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TALL_THIN_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TILTED_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  FOLDED_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TALL_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  C_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TOP_LEFT_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  STAR: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  STAR_MEDIUM: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  STAR_THIN: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight,
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
