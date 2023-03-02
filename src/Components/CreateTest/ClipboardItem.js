import { Close, Delete } from "@mui/icons-material";
import { Button, Fab, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import produce from "immer";
import { nanoid } from "nanoid";
import { useState } from "react";


export default function ClipboardItem(props){
  const clipboard = props.clipboard;
  const setClipboard = props.setClipboard;
  const setShapes = props.setShapes;
  const selectedMatrix = props.selectedMatrix;
  const data = props.data;
  const idx = parseInt(props.id.split('-')[1])


  const [hovered, setHovered] = useState(false);
  const handleClick = (e) => {
    //Because you can't have duplicate id/key
    let newShapes = data.map(s => {
      return { ...s, id: nanoid()}
    })
    

    setShapes(prevState => produce(prevState, (draft) => {
      draft[selectedMatrix].push(...newShapes);
    }));
  }

  const deleteItem = () => {
    console.log(`Deleting clipboard item#${idx}`)
    setClipboard(ps => produce(ps, d => {
      if (!isNaN(idx)) d.splice(idx, 1)
    }))
  }

  return (

    <Grid item className="clipboardItem" >

      <Box 
        sx={{position:'relative'}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>

        <img src={props.src} id={props.id} alt="clipboard-item"  />

        <Box hidden={!hovered} 
          onClick={handleClick}
          sx={{ position: 'absolute', left: 0, top: 0, width:'100%', height:'100%',backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          
          <Fab sx={{float:'right', marginRight:'0.4em', marginTop:'0.4em'}} color="error" size="small" onClick={deleteItem}><Close fontSize="small" /></Fab>
          
        </Box>


      </Box>
    </Grid>

  );   
  
}