//These are used internally exclusively within this file for easier adjustment
//Do not attempt to use these variable outside this file (hence the lack of export)
const defaultStrokeWidth = 3;
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

  PLUS: "plus",
  CROSS: "cross",
  ORTHOGONAL: "orthogonal",

  CIRCLE: "circle",
  SEMICIRCLE: "semi-circle",
  C_CIRCLE: "c_circle",
  CIRCLE_20MIN: "circle_20mins",
  QUARTER_CIRCLE: "quarter_circle",
  CIRCLE_10MIN: "circle_10mins",
  ELLIPSE_VERTICAL: "ellipse_vertical",
  ELLIPSE_DIAGONAL: "ellipse_diagonal",
  ELLIPSE_FOLDED: "ellipse_folded",

  SIMPLE_TRI: "simple_triangle",
  SIMPLE_TRI_SMALL: "simple_triangle_small",
  SIMPLE_TRI_BIG: "simple_triangle_big",
  SQUASHED_TRI: "squashed_triangle",
  RIGHT_TRI: "right_triangle",
  RIGHT_TRI_THIN: "right_triangle_thin",
  OBTUSE_TRI_SMALL: "obtuse_triangle_small",
  OBTUSE_TRI_BIG: "obtuse_triangle_big",
  OBTUSE_TRI_FOLDED: "obtuse_triangle_folded",
  OBTUSE_TRI_SLIGHT: "obtuse_triangle_slight",
  CONE: "cone",



};

//While these do seem redundant at first, they are more useful
//than expected whenever fine-tuning is required for shapes
//this is the one-stop place for a lot of shape modification
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
    ROTATION: 45,
    DASH: defaultDash,
  },
  TALL_FAT_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth-15,
    HEIGHT: defaultHeight+30,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TALL_THIN_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth-30,
    HEIGHT: defaultHeight+30,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TILTED_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultHeight-30,
    HEIGHT: defaultHeight+30,
    ROTATION: 0,
    DASH: defaultDash,
    SKEWX: -0.5,
  },
  FOLDED_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: null,
    WIDTH: defaultWidth-30,
    HEIGHT: (defaultHeight+30)/2,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TALL_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight+30,
    ROTATION: 0,
    DASH: defaultDash,
  },
  C_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: null,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight+30,
    ROTATION: 0,
    DASH: defaultDash,
  },
  TOP_LEFT_RECT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: null,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  STAR: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  STAR_MEDIUM: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth-20,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  STAR_THIN: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth-30,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  PLUS: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: null,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  CROSS: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: null,
    WIDTH: defaultWidth/2,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  ORTHOGONAL: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: null,
    WIDTH: defaultWidth,
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
  SEMICIRCLE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 90,
    DASH: defaultDash,
    OUTER_RADIUS: 25,
  },
  C_CIRCLE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: null,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 90,
    DASH: defaultDash,
    RADIUS: 25,
  },
  CIRCLE_20MIN: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 150,
    DASH: defaultDash,
    RADIUS: 50,
  },
  QUARTER_CIRCLE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 180,
    DASH: defaultDash,
    RADIUS: 50,
  },
  CIRCLE_10MIN: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 225,
    DASH: defaultDash,
    RADIUS: 50,
  },
  ELLIPSE_VERTICAL: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
    RADIUS_X: defaultWidth/4,
    RADIUS_Y: defaultHeight,
  },
  ELLIPSE_DIAGONAL: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 45,
    DASH: defaultDash,
    RADIUS_X: defaultWidth / 4,
    RADIUS_Y: defaultHeight,
  },
  ELLIPSE_FOLDED: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: null,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
    RADIUS_X: defaultWidth / 4,
    RADIUS_Y: defaultHeight / 2,
  },
  SIMPLE_TRI: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  SIMPLE_TRI_SMALL: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth/2,
    HEIGHT: defaultHeight/2,
    ROTATION: 0,
    DASH: defaultDash,
  },
  SIMPLE_TRI_BIG: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth+15,
    HEIGHT: defaultHeight+15,
    ROTATION: 0,
    DASH: defaultDash,
  },
  SQUASHED_TRI: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight/2.5,
    ROTATION: 0,
    DASH: defaultDash,
  },
  RIGHT_TRI: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  RIGHT_TRI_THIN: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth-15,
    HEIGHT: defaultHeight+15,
    ROTATION: 0,
    DASH: defaultDash,
  },
  OBTUSE_TRI_SMALL: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth/2,
    HEIGHT: defaultHeight/2,
    ROTATION: 0,
    DASH: defaultDash,
  },
  OBTUSE_TRI_BIG: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth-15,
    HEIGHT: defaultHeight+15,
    ROTATION: 0,
    DASH: defaultDash,
  },
  OBTUSE_TRI_FOLDED: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth-15,
    HEIGHT: defaultHeight+15,
    ROTATION: 0,
    DASH: defaultDash,
  },
  OBTUSE_TRI_SLIGHT: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth-30,
    HEIGHT: defaultHeight,
    ROTATION: 0,
    DASH: defaultDash,
  },
  CONE: {
    STROKE: defaultStroke,
    STROKE_WIDTH: defaultStrokeWidth,
    FILL: defaultFill,
    WIDTH: defaultWidth-30,
    HEIGHT: defaultHeight+15,
    ROTATION: 0,
    DASH: defaultDash,
  },

};

export const LIMITS = {
  RECT: {
    MAX: 180,
    MIN: 10,
  },
  CIRCLE: {
    MAX: 180,
    MIN: 10,
  },
};

export const SHAPE_ACTIONS = {
  STROKE_BOLD: "stroke_bold",
  STROKE_DASHED: "stroke_dashed",
  FILL_TEXTURE: "fill_texture"
}
