import { Accordion, AccordionDetails, AccordionSummary, Chip, FormControl, FormLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import componentLibraries from '../../data/componentLibraries.json'
import mockQuizQuestions from '../../data/mockQuizQuestions.json'
import { useEffect } from "react";
import produce from "immer";



export default function TestModalSettings(props) {
  const [derivedFrom, setDerivedFrom] = useState(-1);
  const [loc, setLoC] = useState("None");


  const commentsRef = props.commentsRef;
  const locRef = props.locRef;
  const selectedTest = props.selectedTest;
  const setSelectedTest = props.setSelectedTest;

  const API = mockQuizQuestions; //change source in production

  //INITIALLY USE VALUES FROM API
  useEffect(() => {
    setLoC(selectedTest["loc_name"]); 
    document.getElementById("comments").value = selectedTest["comments"];
    document.getElementById("testTime").value = selectedTest["time"];
    if(selectedTest.hasOwnProperty('derivedFrom') && selectedTest.derivedFrom !== -1) setDerivedFrom(selectedTest.derivedFrom);
  },[]);

  //LoCs DROPDOWN
  const populateLoCs = () => {
    return componentLibraries.map(loc => <MenuItem key={loc['loc_name']} value={loc['loc_name']}>{loc["loc_name"]}</MenuItem>);
  }

  //DERIVE FROM DROPDOWN
  const populateDerivedFrom = () => {
    return Object.keys(API).map(t => <MenuItem key={t} value={t} disabled={selectedTest["test_name"] === t}>{t}</MenuItem>)
  }

  //DERIVE
  const handleDerivation = (e) => {
    if (e.target.value === -1) { //None
      //Remove questions which have a 'derivedFrom' property
      setSelectedTest(prev => produce(prev, d => {
        delete d.derivedFrom;
        d.questions = d.questions.filter(q => !q.hasOwnProperty('derivedFrom'))
      }));
      setDerivedFrom(-1);
      
    } else {
      const testName = e.target.value;
      setDerivedFrom(testName);

      //Append questions from said test, add some extra attributes for future features if required
      //questionNumber is useless and never used throughout the program but whatever, will throw it a bone
      const offset = selectedTest.questions.length;
      const derivedQuestions = API[testName].questions.map(q => { return { ...q, derivedFrom: testName, "number": q.number + offset } });
      setSelectedTest(prev => produce(prev, d => {
        d['derivedFrom'] = testName;
        d.questions.push(...derivedQuestions);
      }));
    }
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
                  onChange={handleDerivation}
                >
                  <MenuItem value={-1}>None</MenuItem>
                  {populateDerivedFrom()}
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