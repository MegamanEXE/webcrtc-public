/* eslint-disable no-lone-blocks */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, ListItemButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';

import mockUserData from '../../data/mockUserData.json'
import mockResultData from '../../data/mockTestResults.json'

import { json, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { dblClick } from '@testing-library/user-event/dist/click';
import { ViewTestModal } from './ViewTestModal';
import { useRef } from 'react';

export default function ManageClients() {
  // let clients = [`Dexter's Lab`, 'Bare Bears', 'Amazing World', 'Gravity Falls'];
  // const candidatesSTATIC = ['Dexter', 'Dee Dee', 'Mandark'];


  const [DATA, setDATA] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [clients, setClients] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [addClientTextField, setAddClientTextField] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); {/* uses the entire data row */}

  const { enqueueSnackbar } = useSnackbar(); //Little alerts that show on the bottom left
  const confirm = useConfirm(); //Confirmation dialog

  const [modalOpen, setModalOpen] = useState(false);
  const [testDATA, setTestDATA] = useState(null); //test view modal
  // const [rowData, setRowData] = useState(null);
  const rowData = useRef(null);

  //Read data from whereever
  useEffect(()=>{
    setDATA(mockUserData);
    setTestDATA(mockResultData);
  },[]);

  //UPDATE API HERE
  useEffect(() => {
    
  },[DATA])

  const handleListItemClick = (client) => {
    setSelectedClient(client);
  };

  const handleDeleteClient = (name, id) => {
    confirm({ title: 'Confirm Deletion', description: `Are you sure you want to delete the client: ${name}?` }
    ).then(() => {
      console.log(`Deleting id:${id}, ${name}`)
      setClients(clients.filter(c => c !== name));
      //Delete ID from API
      const newData = DATA.filter(r => r.client !== name)
      setDATA(newData);
      enqueueSnackbar(`${name} deleted`,{variant:'success'});
    }).catch(() => {
      console.log('Deletion cancelled');
    });

    
  }

  const handleAddClient = (e) => {
    if(e.key === 'Enter'){
      handleAddButton()
    }
  }

  const handleAddButton = (e) => {
    if(clients.includes(addClientTextField)){
      console.log('already exists')
      enqueueSnackbar(`${addClientTextField} already exists.`, {variant:'error'});
      return;
    }

      setClients([...clients, addClientTextField]);
      console.log(`Adding ${addClientTextField}`);
      setAddClientTextField('');
  }

  const selectableItems = () => {
    return clients.map((client, index) => (
      <ListItem
        key={index}
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

  //Returns unique client names from JSON data
  useEffect(()=>{
    const generateClientNames = () => {
      return [...new Set(DATA.map(d => d['client']))]
    }

    setClients(generateClientNames().sort());
  },[DATA]);

  //Returns users under selected client name
  useEffect(()=>{
    const generateCandidates = () => {
      return DATA.filter((r) => r["client"] === selectedClient);
    }
    setCandidates(generateCandidates());
  },[selectedClient, DATA]);

  const generateCandidatesList = () => {
    return candidates.map((c)=><ListItemButton key={c["id"]} onClick={()=>setSelectedUser(c)}>{c["name"]}</ListItemButton>);
  }

  const testIDs = () => {
    const read = JSON.parse(selectedUser["test-IDs"]);
    if(!read) return;

    return read.map((t,i) => <>
      <Link key={i} onClick={()=> {
        const temp = testDATA.find(rd => rd.id === t);
        rowData.current = temp
        setModalOpen(true)}}
      >
          {t}
      </Link>
      {i !== read.length-1 ? ", " : null}
       

    </>);
  }

  const generateDetails = () => {
    return <TableBody>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Age:</TableCell>
        <TableCell>{selectedUser["age"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Occupation:</TableCell>
        <TableCell>{selectedUser["occupation"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Education Level:</TableCell>
        <TableCell>{selectedUser["education-level"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Country:</TableCell>
        <TableCell>{selectedUser["country"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' style={{ width: '35%', fontWeight: 'bold' }}>Test IDs:</TableCell>
        <TableCell>{testIDs()}</TableCell> 
      </TableRow>
    </TableBody>
  }
  
  const deleteCurrentUser = () => {
    confirm({ title: 'Confirm Deletion', description: `Are you sure you want to delete the user: ${selectedUser["name"]}?` }
    ).then(() => {
      setDATA(DATA.filter(r => r["id"] !== selectedUser["id"]));
      setSelectedUser({});

      enqueueSnackbar(`${selectedUser["name"]} deleted`, { variant: 'success' });
    }).catch(() => {
      console.log('Deletion cancelled');
    });


  }

  return (
    <Box className='clientsContainer'>
      <Typography variant="h6">Manage Clients</Typography>
  
      <Box width='100%' height="83.4vh" display='flex' flexDirection='row' gap={2} >
      {/* LIST 1 */}
        <Box display='flex' flexDirection='column' width="30%"  >

          <List
            className='listShadow'
            sx={{ width: '100%',overflow:'auto'}}
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
              InputProps={{ endAdornment: <IconButton onClick={handleAddButton}><AddCircleIcon /></IconButton> }}
            onChange = {(e)=>setAddClientTextField(e.target.value)}
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
              <ListSubheader component="div">Candidates at {selectedClient}</ListSubheader>
            }
          >
              {generateCandidatesList()}
              
            </List>
        </Box>

        {/* LIST 3 */}
        <Box display='flex' width="30%" className='userDetailsCard'>
          <Card sx={{width:'100%'}} >
            {selectedUser && <>
              <CardHeader title={selectedUser["name"]} />
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
            </>}
            
          </Card>
        </Box>
      </Box>

      {rowData && modalOpen && <ViewTestModal modalOpen={modalOpen} setModalOpen={setModalOpen} rowData={rowData} setDATA={setTestDATA} />}
    </Box>
  )
}
