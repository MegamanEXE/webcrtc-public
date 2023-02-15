import { SquareOutlined } from "@mui/icons-material";
import { Paper, ToggleButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SHAPE_TYPES } from "./ShapesData";


const handleDragStart = (event) => {
  const type = event.target.attributes.shape.value;

  if (type) {
    // x,y coordinates of the mouse pointer relative to the position of the padding edge of the target node
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    // dimensions of the node on the browser
    const clientWidth = event.target.clientWidth;
    const clientHeight = event.target.clientHeight;

    const dragPayload = JSON.stringify({
      type,
      offsetX,
      offsetY,
      clientWidth,
      clientHeight,
    });

    // console.log(dragPayload)
    event.dataTransfer.setData("dragged_shape",dragPayload);
  }
};

export default function Toolbox() {
  return (
  <Box p={1.5} sx={{ height: '100%' }}>
    <Paper sx={{height:'100%', p:1.5}}>

      <Box>
        <Typography mb={1}>Shapes</Typography>
          <ToggleButton value={SHAPE_TYPES.SQUARE} shape={SHAPE_TYPES.SQUARE} draggable onDragStart={handleDragStart}><SquareOutlined /></ToggleButton>
      </Box>

    </Paper>
  </Box>
  )
}