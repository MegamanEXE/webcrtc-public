/* eslint-disable no-lone-blocks */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import { Button, Card, CardActions, CardContent, CardHeader, ListItemButton, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import mockQuizQuestions from '../../data/mockQuizQuestions.json'
import { Edit } from '@mui/icons-material';
import TestModal from './TestModal';

export default function IntelligenceTests() {
   const [DATA, setDATA] = useState([]);

  const [selectedTestName, setSelectedTestName] = useState("");
  const [tests, setTests] = useState([]);
  const [addTestTextField, setAddTestTextField] = useState('');
  const [selectedTest, setSelectedTest] = useState({}); {/* uses the entire data row */ }
  const [modalOpen, setModalOpen] = useState(false);
  let stl = selectedTest.length; //temporary; testing if this works

  //Read data from whereever
  useEffect(() => {
    setDATA(mockQuizQuestions);
  }, []);

  //Returns unique test names from JSON data
  useEffect(() => {
    const generateTestList = () => {
      return Object.keys(DATA);
    }
    setTests(generateTestList().sort());
  }, [DATA]);

  const handleListItemClick = (test) => {
    setSelectedTestName(test);
    setSelectedTest(DATA[test]);
  };

  const handleDeleteClient = (name, id) => {
    console.log(`Deleting id:${id}, ${name}`)

  }

  const handleAddClient = (e) => {
    if (e.key === 'Enter') {
      setTests([...tests, addTestTextField]);
      console.log(`Adding ${addTestTextField}`);
      setAddTestTextField('');

    }
  }

  const selectableItems = () => {
    return tests.map((test, index) => (
      <ListItem
        key={test}
        secondaryAction={selectedTestName === test && (<IconButton edge="end" onClick={() => handleDeleteClient(test, index)}><DeleteForeverIcon /></IconButton>)}
        disablePadding
      >
        <ListItemButton
          onClick={(event) => handleListItemClick(test)}
          selected={selectedTestName === test}
        >
          {test}
        </ListItemButton>
      </ListItem>
    ));

    ;
  }

  const generateDetails = () => {
    return <TableBody>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Name:</TableCell>
        <TableCell>{selectedTest["test_name"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Component Library:</TableCell>
        <TableCell>{selectedTest["loc_name"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Number of Questions:</TableCell>
        <TableCell>{selectedTest.questions!==undefined ? selectedTest.questions.length : null}</TableCell>{/* TODO: Calculate this from array*/}
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Time:</TableCell>
        <TableCell>{selectedTest.time!==undefined ? `${selectedTest["time"]} minutes` : null}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Comments:</TableCell>
        <TableCell>{selectedTest["comments"]}</TableCell>
      </TableRow>
    </TableBody>
  }

  const deleteCurrentUser = () => {
    console.log(`Deleting ${selectedTest["name"]}`);
    setDATA(DATA.filter(r => r["id"] !== selectedTest["id"]));
  }

  const openTest = () => {
    setModalOpen(true)
  }

  return (
    <Box className='clientsContainer'>
      <Typography variant="h6">Intelligence Tests</Typography>

      <Box width='100%' height="83.4vh" display='flex' flexDirection='row' gap={2} >
        {/* LIST 1 */}
        <Box display='flex' flexDirection='column' width="30%"  >

          <List
            className='listShadow'
            sx={{ width: '100%', overflow: 'auto' }}
            subheader={
              <ListSubheader className='listSubheader'><Typography variant='h6' fontWeight='bold' color='white'>Tests</Typography></ListSubheader>
            }
          >

            {selectableItems()}

          </List>

          <Box display='flex'>
            <TextField
              id="new-client"
              label="Add new test"
              value={addTestTextField}
              size='small'
              margin='dense'
              InputProps={{ endAdornment: <IconButton ><AddCircleIcon /></IconButton> }}
              onChange={(e) => setAddTestTextField(e.target.value)}
              onKeyPress={handleAddClient}

              fullWidth /></Box>
        </Box>

        {/* BOX 2 */}
        <Box display='flex' flexGrow="1" className='userDetailsCard'>
          <Card sx={{ width: '100%' }} >
            <CardHeader title={selectedTest["name"]} />
            <CardContent>
              <TableContainer>
                <Table size='small' sx={{ '& .MuiTableCell-root': { border: 0, py: 0.2, px: 0.5 } }}>
                  {selectedTest && generateDetails()}
                </Table>
              </TableContainer>

            </CardContent>
            <CardActions disableSpacing >
              <Button size="small" onClick={() => openTest()} sx={{ marginLeft: 'auto' }}><Edit />Modify</Button>
              <Button size="small" color="error" onClick={() => deleteCurrentUser()} ><DeleteForeverIcon /> Delete Test</Button>
              
            </CardActions>
          </Card>
        </Box>
      </Box>


      {modalOpen && selectedTest && <TestModal setModalOpen={setModalOpen} modalOpen={modalOpen} testData={selectedTest} setTestData={setSelectedTest}  />}
    </Box>
  )
}
