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
    WIDTH: 50,
    HEIGHT: 50,
    ROTATION: 0,
  },
  RECT: {
    STROKE: defaultStroke,
    FILL: defaultFill,
    WIDTH: 80,
    HEIGHT: 50,
    ROTATION: 0,
  },
  CIRCLE: {
    STROKE: defaultStroke,
    FILL: defaultFill,
    RADIUS: 25,
  },
};

export const LIMITS = {
  RECT: {
    MAX: 100,
    MIN: 10,
  },
  CIRCLE: {
    MAX: 100,
    MIN: 10,
  },
};
