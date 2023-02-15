import { Box, Paper, ToggleButton, Typography } from "@mui/material";


export default function RightBar(){


  return (
  <Box p={1.5} sx={{ height: '100%' }}>
    <Paper sx={{ height: '100%', p: 1.5 }}>

      <Box>
        <Typography mb={1}>Inspector</Typography>
      </Box>

    </Paper>
  </Box>);
}