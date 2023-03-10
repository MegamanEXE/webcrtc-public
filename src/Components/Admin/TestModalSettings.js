import { Label } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Chip, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import componentLibraries from '../../data/componentLibraries.json'
import { useEffect } from "react";



export default function TestModalSettings(props) {
  const [derivedFrom, setDerivedFrom] = useState("None");
  const [loc, setLoC] = useState("None");

  const commentsRef = props.commentsRef;
  const locRef = props.locRef;
  const selectedTest = props.selectedTest;

  //INITIALLY USE VALUES FROM API
  useEffect(() => {
    setLoC(selectedTest["loc_name"]); 
    document.getElementById("comments").value = selectedTest["comments"];
    document.getElementById("testTime").value = selectedTest["time"];
  },[]);

  const populateLoCs = () => {
    return componentLibraries.map(loc => <MenuItem key={loc['loc_name']} value={loc['loc_name']}>{loc["loc_name"]}</MenuItem>);
  }

  return (<>
    <Box id="modalSettingsContainer">
      <Accordion sx={{mx:0}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="additionalSettingsAccordion">
          <Typography marginLeft="auto">Additional Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box gap="35px" sx={{ display:"flex", flexDirection:"row", flexWrap:"wrap" }}>

            <Box display="flex" flexDirection="row" flexGrow="0.7" alignItems="flex-start" justifyContent="center">
              <FormLabel component="legend" sx={{ minWidth: '100px', alignSelf: 'center' }}>Derive From</FormLabel>
              <FormControl fullWidth size="small">
                <Select
                  id="select_derived"
                  value={derivedFrom}
                  onChange={(e) => setDerivedFrom(e.target.value)}
                >
                  <MenuItem disabled value={10}>None</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* TODO, write regex or function for time and reflect it on IntelligenceTests*/}
            <Box display="flex" flexDirection="row" flexGrow="0.1" alignItems="flex-start" justifyContent="center" columnGap="0.5em">
              <FormLabel component="legend" sx={{  alignSelf: 'center' }}>Timer</FormLabel>
              <FormControl fullWidth size="small">
                <TextField id="testTime" variant="outlined" size="small" placeholder="20m, 1200s, etc." />
              </FormControl>
            </Box>


            <Box display="flex" flexDirection="row" flexGrow="0.7" alignItems="flex-start" justifyContent="center">
              <FormLabel component="legend" sx={{ minWidth: '150px', alignSelf: 'center' }}>Component Library</FormLabel>
              <FormControl fullWidth size="small">
                <Select
                  id="locDropdown"
                  value={loc}
                  onChange={(e) => {setLoC(e.target.value); locRef.current = e.target.value;}}
                  
                >
                  <MenuItem disabled value={-1}>None</MenuItem>
                  {populateLoCs()}

                </Select>
              </FormControl>
            </Box>

            <Box display="flex" flexDirection="row" flexGrow="0.5" alignItems="flex-start" justifyContent="center">
              <FormLabel component="legend" sx={{ minWidth: '85px', alignSelf: 'center' }}>Comments</FormLabel>
              <FormControl fullWidth size="small">
                <TextField inputRef={commentsRef} id="comments" variant="outlined" size="small" placeholder="Test comments" />
              </FormControl>
            </Box>


          </Box>
        </AccordionDetails></Accordion>
    </Box>
  </>)
}