import { Label } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Chip, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function TestModalSettings() {
  const [derivedFrom, setDerivedFrom] = useState("None");
  const [selectedChip, setSelectedChip] = useState(1);

  const difficultyChips = [
    { key: 1, label: "Easy", color: "primary" }, { key: 2, label: "Medium", color: "secondary" }, { key: 3, label: "Hard", color: "error" }
  ];

  const handleDifficulty = (k) => {
    console.log(k)
    setSelectedChip(k);
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
          <Box display="flex" flexDirection="row" gap="35px">

            <Box display="flex" flexDirection="row" flexGrow="1" alignItems="flex-start" justifyContent="center">
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


            <Box display="flex" flexDirection="row" flexGrow="0.1" alignItems="flex-start" justifyContent="center">
              <FormLabel component="legend" sx={{ minWidth: '70px', alignSelf: 'center' }}>Timer</FormLabel>
              <FormControl fullWidth size="small">
                <TextField id="testTime" variant="outlined" size="small" placeholder="20m, 1200s, etc." />
              </FormControl>
            </Box>


            <Box display="flex" flexDirection="row" flexGrow="1" alignItems="flex-start" justifyContent="center">
              <FormLabel component="legend" sx={{ minWidth: '150px', alignSelf: 'center' }}>Component Library</FormLabel>
              <FormControl fullWidth size="small">
                <Select
                  id="select_derived"
                  value={derivedFrom}
                  onChange={(e) => setDerivedFrom(e.target.value)}
                >
                  <MenuItem disabled value={-1}>None</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" flexDirection="row" flexGrow="1" alignItems="flex-start" justifyContent="center">
              <FormLabel component="legend" sx={{ minWidth: '80px', alignSelf: 'center' }}>Difficulty</FormLabel>
              <Stack direction="row" size="small" spacing="8px">
                {difficultyChips.map(c => <Chip key={c.key} label={c.label} color={selectedChip === c.key ? c.color : 'default'} onClick={() => setSelectedChip(c.key)} />)}

              </Stack>
            </Box>


          </Box>
        </AccordionDetails></Accordion>
    </Box>
  </>)
}