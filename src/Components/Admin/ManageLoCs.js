/* eslint-disable no-lone-blocks */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Button, Checkbox, Divider, ListItemButton, ListItemIcon, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';

import componentLibraries from '../../data/componentLibraries.json'

export default function ManageLoCs() {
  const [DATA, setDATA] = useState([]);

  const [LoCs, setLoCs] = useState([]);
  const [selectedLoCName, setSelectedLoCName] = useState("");
  const [selectedLoC, setSelectedLoC] = useState({});{/* only relevant row at a time */}
  const [addLoCTextField, setAddLoCTextField] = useState('');

  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState({}); 
  const [componentChecked, setComponentChecked] = useState([]);

  const [subcomponents, setSubcomponents] = useState([]);
  const [subcomponentChecked, setSubcomponentChecked] = useState([]);

  //Read data from whereever
  useEffect(()=>{
    setDATA(componentLibraries);
  },[]);

  //Get LoC names
  useEffect(() => {
    const generateLoCNames = () => {
      return [...new Set(DATA.map(d => d['loc_name']))]
    }

    setLoCs(generateLoCNames());
  }, [DATA]);

  const handleListItemClick = (loc) => {
    setSelectedLoCName(loc);
    
  };

  useEffect(() => { setSelectedLoC(DATA.find(r => r["loc_name"] === selectedLoCName)); },[selectedLoCName]);



  const handleDeleteLoC = (name, id) => {
    console.log(`Deleting id:${id}, ${name}`)
    
  }

  

  const handleAddClient = (e) => {
    if(e.key === 'Enter'){
      setLoCs([...LoCs, addLoCTextField]);
      console.log(`Adding ${addLoCTextField}`);
      setAddLoCTextField('');
      
    }
  }

  //Populates first list
  const selectableItems = () => {
    return LoCs.map((loc, index) => (
      <ListItem
        key={loc}
        secondaryAction={selectedLoCName === loc && (<IconButton edge="end" onClick={() => handleDeleteLoC(loc, index)}><DeleteForeverIcon /></IconButton>)}
        disablePadding
      >
        <ListItemButton
          onClick={(event) => handleListItemClick(loc)}
          selected={selectedLoCName === loc}
        >
          {loc}
        </ListItemButton>
      </ListItem>
    ));

    ;
  }

  //Returns Components under selected LoC
  useEffect(() => {
    const generateComponents = () => {
      let c = DATA.find(r => r["loc_name"] === selectedLoCName);
      if (c === undefined) { return []; }
      return Object.keys(c["components"]);
    }
    setComponents(generateComponents());
  }, [DATA, selectedLoCName]);

  const generateComponentsList = () => {
    const handleToggle = (value) => () => {
      const currentIndex = componentChecked.indexOf(value);
      const newChecked = [...componentChecked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setComponentChecked(newChecked);
    };

    const handleComponentClicked = (c) => {
      setSelectedComponent(c);
      setSubcomponents(Object.keys(selectedLoC["components"][c]["shapes"])); {/* Name and shame this heckin line of code that consumed half a day of my life */}
    }

    return components.map((c) => (
      <ListItem key={c} disablePadding>
        <ListItemButton onClick={()=>handleComponentClicked(c)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              onClick={handleToggle(c)}
              checked={componentChecked.indexOf(c) !== -1}
              inputProps={{ 'aria-labelledby': `label-${c}` }}
            />
          </ListItemIcon>

          <ListItemText id={`label-${c}`} primary={c} />

        </ListItemButton>
      </ListItem>)
    )
  }



  //Returns Sub-components under selected LoC
  const populateSubcomponentList = () =>{
    let sc = Object.keys(selectedLoC["components"][selectedComponent]["shapes"]);
    setSubcomponents(sc);
  }

  useEffect(()=>{},[]);
  //Checkbox handling#2
  const generateSubcomponentsList = () => {
    const handleToggle = (value) => () => {
      const currentIndex = subcomponentChecked.indexOf(value);
      const newChecked = [...subcomponentChecked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setSubcomponentChecked(newChecked);
    };
    

    return subcomponents.map((c) => (
      <ListItem key={c} disablePadding>
        <ListItemButton
          onClick={handleToggle(c)}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={subcomponentChecked.indexOf(c) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `label-${c}` }}
            />
          </ListItemIcon>

          <ListItemText id={`label-${c}`} primary={c} />

        </ListItemButton>
      </ListItem>)
    )
  }
  
  const deleteCurrentUser = () => {
    console.log(`Deleting ${selectedComponent["name"]}`);
    setDATA(DATA.filter(r=>r["id"]!==selectedComponent["id"]));
  }

  return (
    <Box className='clientsContainer'>
      <Typography variant="h6">Manage Component Libraries</Typography>
  
      <Box width='100%' height="83.4vh" display='flex' flexDirection='row' gap={2} >
      {/* LIST 1 */}
        <Box display='flex' flexDirection='column' width="30%"  >

          <List
            className='listShadow'
            sx={{ width: '100%',overflow:'auto'}}
            subheader={
              <ListSubheader className='listSubheader'><Typography variant='h6' fontWeight='bold' color='white'>Component Libraries</Typography></ListSubheader>
            }
          >
            {selectableItems()}
            
          </List>

          <Box display='flex'>
          <TextField
            id="new-client"
            label="Add new Component Library"
            value={addLoCTextField}
            size='small'
            margin='dense'
            InputProps={{ endAdornment: <IconButton ><AddCircleIcon /></IconButton> }}
            onChange = {(e)=>setAddLoCTextField(e.target.value)}
            onKeyPress = {handleAddClient}
            
            fullWidth /></Box>
        </Box>
        
        {/* LIST 2 */}
        <Box display='flex' width="30%">
          <List
            className='listShadow'
            sx={{ width: '100%', overflow:'auto' }}
            component="nav"
            subheader={
              <ListSubheader component="div">Components in {selectedLoCName}</ListSubheader>
            }
          >
              {generateComponentsList()}
              
            </List>
        </Box>

        {/* LIST 3 */}
        <Box display='flex' width="30%">
          <List
            className='listShadow'
            sx={{ width: '100%', overflow: 'auto' }}
            component="nav"
            subheader={
              <ListSubheader component="div">Sub-components</ListSubheader>
            }
          >
            {selectedComponent && generateSubcomponentsList()}
          </List>
        </Box>
      </Box>

      
    </Box>
  )
}
