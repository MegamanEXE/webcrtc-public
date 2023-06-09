/* eslint-disable no-lone-blocks */
// NOTE: This component is an abomination and valuable lessons were learnt.
// I asked only to not be judged on how I approached this
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
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { enqueueSnackbar, useSnackbar } from 'notistack';


import componentLibraries from '../../data/componentLibraries.json'
import componentLibrary_template from '../../data/componentLibrary_template.json' //use to create new LoC

import axios from 'axios';
import { UseServerContext } from '../UseServerContext';

import { useConfirm } from 'material-ui-confirm';
import produce from 'immer';
import { useContext } from 'react';

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

  const { enqueueSnackbar } = useSnackbar(); //Little alerts that show on the bottom left
  const confirm = useConfirm(); //Confirmation dialog

  const useServer = useContext(UseServerContext);

  

  //Read data from whereever
  useEffect(()=>{
    if(useServer.serverEnabled){
      console.log("Using server")
      axios.get(useServer.serverAddress + "componentLibraries")
      .then(res => {
        console.log(res)
        setDATA(res.data)
      })
    }
    else{
      console.log("Using mock data")
      setDATA(componentLibraries);
    }

  },[]);

  //UPDATE API HERE

  //used to skip the call to backend on the first 3 renders; one when empty, one when data is loaded for the first time
  //To be honest, I don't know when the 3rd render occurs, but putting 3 here makes it work expectedly
  const renderCount = useRef(0) 
  useEffect(() => {
    if(useServer.serverEnabled){
      if(renderCount.current < 3){
        renderCount.current += 1;
        return;
      }

      axios.post(useServer.serverAddress + "updateLoC", {selectedLoC: selectedLoC})
      .then(res => {
        console.log(res)
      })
    }

  }, [DATA])

  //Get LoC names
  useEffect(() => {
    const generateLoCNames = () => {
      return [...new Set(DATA.map(d => d['loc_name']))]
    }

    setLoCs(generateLoCNames());
  }, [DATA]);

  const markEnabledComponents = () => {
    if (selectedLoC === undefined || selectedLoC["components"] === undefined) return; //starting to hate React at this point. UPDATE 10-Mar-2023: React's alright
    let ticked = [];
    for (const [k, v] of Object.entries(selectedLoC["components"])) {
      if (selectedLoC["components"][k].enabled === true) {
        ticked.push(k);
      }
    }
    setComponentChecked(ticked);
  }

  const markEnabledSubcomponents = (c) => { //Slightly different, relies on handleComponentClicked() 
    let ticked = [];
    for (const [k, v] of Object.entries(selectedLoC["components"][c]["shapes"])) {
      if (selectedLoC["components"][c]["shapes"][k] === true) {
        ticked.push(k);
      }
    }
    setSubcomponentChecked(ticked);
  }

  const handleListItemClick = (loc) => {
    setSelectedLoCName(loc);
  };

  useEffect(() => { setSelectedLoC(DATA.find((r) => (r["loc_name"] === selectedLoCName)));}, [selectedLoCName, selectedLoC]);
  useEffect(()=>{ markEnabledComponents();},[selectedLoC]);

  const handleDeleteLoC = (name, idx) => {
    confirm({ title: 'Confirm Deletion', description: `Are you sure you want to delete the component library: ${name}?` }
    ).then(() => {
      console.log(`Deleting id:${idx}, ${name}`);
      setDATA(DATA.filter(r => r["loc_name"] !== name));

      //Delete ID from API
      if(useServer.serverEnabled){
        axios.post(useServer.serverAddress + "deleteLoC", {loc_name:name})
          .then(res => {
            console.log(res)
          })
      }

      enqueueSnackbar(`${name} deleted`, { variant: 'success' });
    }).catch(() => {
      console.log('Deletion cancelled');
    });    
  }

  const handleAddLoC = (e) => {
    if(e.key === 'Enter'){
      handleAddButton();
    }
  }

  const handleAddButton = (e) => {
    if (LoCs.includes(addLoCTextField)) {
      console.log('already exists')
      enqueueSnackbar(`${addLoCTextField} already exists.`, { variant: 'error' });
      return;
    }
    setLoCs([...LoCs, addLoCTextField]);

    const newLoC = {
      id: DATA.length + 1,
      loc_name: addLoCTextField,
      components: componentLibrary_template.components
    }

    //Add to API as well
    setDATA([...DATA,newLoC]);

    if(useServer.serverEnabled){
      axios.post(useServer.serverAddress + "addLoC", {newLoC:newLoC})
        .then(res => {
          console.log(res)
        })
    }

    console.log(`Adding ${addLoCTextField}`);
    setAddLoCTextField('');
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
      updateComponentInAPI(value, newChecked);
    };

    const handleComponentClicked = (c) => {
      setSelectedComponent(c);
      setSubcomponents(Object.keys(selectedLoC["components"][c]["shapes"])); // Name and shame this heckin line of code that consumed half a day of my life
      markEnabledSubcomponents(c);
    }


    //Component updated in API/view here
    const updateComponentInAPI = (c, newChecked) => {
      const difference = components.filter(x => !newChecked.includes(x)); //basically ['a','b'] - ['a'] = ['b']
      console.log(difference)

      //Update API
      setDATA(prev => produce(prev,d=>{
        const idx = d.findIndex(r => r['loc_name'] === selectedLoCName);
        if (idx !== -1) {

          components.forEach(sc => {
            if (difference.includes(c)) {
              d[idx].components[c].enabled = false;
            } else {
              d[idx].components[c].enabled = true;
            }
          })
        }
      }));

      //Update View
      setSelectedLoC(prev => produce(prev, d => {
          components.forEach(sc => {
            if (difference.includes(c)) {
              d.components[c].enabled = false;
            } else {
              d.components[c].enabled = true;
            }
          })
        
      }));
      enqueueSnackbar(`${selectedLoCName} updated`, { variant: 'success' })

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
  const generateSubcomponentsList = () => {
    //I did not write this; default MUI checkbox code. atrocious honestly
    const handleToggle = (value) => () => {
      const currentIndex = subcomponentChecked.indexOf(value);
      const newChecked = [...subcomponentChecked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setSubcomponentChecked(newChecked);
      enqueueSnackbar(`${selectedLoCName} updated`, { variant: 'success' })
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



  //UPDATE SUB-COMPONENT IN API
  useEffect(() => {
    let difference = subcomponents.filter(x => !subcomponentChecked.includes(x)); //basically ['a','b'] - ['a'] = ['b']

    setDATA(prev => produce(prev, d => {
      const idx = d.findIndex(r => r['loc_name'] === selectedLoCName);
      if (idx !== -1) {
        subcomponents.forEach(sc => {
          if(difference.includes(sc)){
            d[idx].components[selectedComponent].shapes[sc] = false;
          } else {
            d[idx].components[selectedComponent].shapes[sc] = true;
          }
        })
      }
    }));

    //Also update current view
    setSelectedLoC(prev => produce(prev, d => {
        //only difference being we don't need to search for its index
        subcomponents.forEach(sc => {
          if (difference.includes(sc)) {
            d.components[selectedComponent].shapes[sc] = false;
          } else {
            d.components[selectedComponent].shapes[sc] = true;
          }
        })
    }));
  }, [subcomponentChecked, subcomponents])

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
            InputProps={{ endAdornment: <IconButton onClick={handleAddButton}><AddCircleIcon /></IconButton> }}
            onChange = {(e)=>setAddLoCTextField(e.target.value)}
            onKeyPress = {handleAddLoC}
            
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
