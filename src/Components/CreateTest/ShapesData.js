const defaultStroke = "#000000";
const defaultFill = "#ffff"

export const SHAPE_TYPES = {
  SQUARE: "square",
  RECT: "rect",
  CIRCLE: "circle",
};

export const DEFAULTS = {
  SQUARE: {
    STROKE: defaultStroke,
    FILL: defaultFill,
    WIDTH: 100,
    HEIGHT: 100,
    ROTATION: 0,
  },
  RECT: {
    STROKE: defaultStroke,
    FILL: defaultFill,
    WIDTH: 150,
    HEIGHT: 100,
    ROTATION: 0,
  },
  CIRCLE: {
    STROKE: defaultStroke,
    FILL: defaultFill,
    RADIUS: 50,
  },
};