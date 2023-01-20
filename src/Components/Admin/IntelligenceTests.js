/* eslint-disable no-lone-blocks */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, ListItemButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import mockUserData from '../../data/mockUserData.json'

export default function IntelligenceTests() {
   const [DATA, setDATA] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [tests, setTests] = useState([]);
  const [addClientTextField, setAddClientTextField] = useState('');
  const [selectedTest, setSelectedTest] = useState({}); {/* uses the entire data row */ }

  //Read data from whereever
  useEffect(() => {
    setDATA(mockUserData);
  }, []);

  const handleListItemClick = (client) => {
    setSelectedClient(client);
  };

  const handleDeleteClient = (name, id) => {
    console.log(`Deleting id:${id}, ${name}`)

  }

  const handleAddClient = (e) => {
    if (e.key === 'Enter') {
      setTests([...tests, addClientTextField]);
      console.log(`Adding ${addClientTextField}`);
      setAddClientTextField('');

    }
  }

  const selectableItems = () => {
    return tests.map((client, index) => (
      <ListItem
        key={client}
        secondaryAction={selectedClient === client && (<IconButton edge="end" onClick={() => handleDeleteClient(client, index)}><DeleteForeverIcon /></IconButton>)}
        disablePadding
      >
        <ListItemButton
          onClick={(event) => handleListItemClick(client)}
          selected={selectedClient === client}
        >
          {client}
        </ListItemButton>
      </ListItem>
    ));

    ;
  }

  //Returns unique test names from JSON data
  useEffect(() => {
    const generateTestList = () => {
      return [...new Set(DATA.map(d => d['client']))]
    }
    setTests(generateTestList().sort());
  }, [DATA]);


  const generateDetails = () => {
    return <TableBody>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Age:</TableCell>
        <TableCell>{selectedTest["age"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Occupation:</TableCell>
        <TableCell>{selectedTest["occupation"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Education Level:</TableCell>
        <TableCell>{selectedTest["education-level"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Country:</TableCell>
        <TableCell>{selectedTest["country"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Test IDs:</TableCell>
        <TableCell>{selectedTest["test-IDs"]}</TableCell>
      </TableRow>
    </TableBody>
  }

  const deleteCurrentUser = () => {
    console.log(`Deleting ${selectedTest["name"]}`);
    setDATA(DATA.filter(r => r["id"] !== selectedTest["id"]));
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
              <ListSubheader className='listSubheader'><Typography variant='h6' fontWeight='bold' color='white'>Clients</Typography></ListSubheader>
            }
          >

            {selectableItems()}

          </List>

          <Box display='flex'>
            <TextField
              id="new-client"
              label="Add new client"
              value={addClientTextField}
              size='small'
              margin='dense'
              InputProps={{ endAdornment: <IconButton ><AddCircleIcon /></IconButton> }}
              onChange={(e) => setAddClientTextField(e.target.value)}
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
                  {generateDetails()}
                </Table>
              </TableContainer>

            </CardContent>
            <CardActions disableSpacing >
              <Button size="small" color="error" onClick={() => deleteCurrentUser()} sx={{ marginLeft: 'auto' }}><DeleteForeverIcon /> Delete User</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>


    </Box>
  )
}
