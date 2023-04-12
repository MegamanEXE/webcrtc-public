/* eslint-disable no-lone-blocks */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter } from '@mui/x-data-grid';
import mockResultData from '../../data/mockTestResults.json'
import { Link } from 'react-router-dom';
import { ViewTestModal } from './ViewTestModal';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import produce from 'immer';
import { useConfirm } from 'material-ui-confirm';
import { UseServerContext } from '../UseServerContext';
import axios from 'axios';
import { useContext } from 'react';


export default function ViewTestResults() {
  const [DATA, setDATA] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowData = useRef(null);
  const confirm = useConfirm(); //Confirmation dialog
  const useServer = useContext(UseServerContext);


  //LOAD DATA FROM API
  useEffect(() => {
    if(useServer.serverEnabled){
      console.log("Using server")
      axios.get(useServer.serverAddress + "testResults")
        .then(res => {
          setDATA(res.data)
        })

    } else {
      console.log("Using mock data")
      setDATA(mockResultData);
    }
  },[]);

  //UPDATE IN API HERE
  useEffect(() => {
     //Server code here 
  },[DATA]);

  //HANDLE DELETE
  const handleDelete = (row) => {

    confirm({title:'Confirm Deletion', description: `Are you sure you want to delete Test#${row.id}?` }
    ).then(() => {
      //Delete from mockTestResults
      setDATA(old => produce(old, d => {
        const idx = d.findIndex(r => r.id === row.id);
        if (idx !== -1) d.splice(idx, 1);
      }))
      //Delete from mockTestResults_Images
      // const idx = mockTestResults_Images.findIndex(i => i.id === rowData.id);
      // setImageData(mockTestResults_Images[idx]);

      if (useServer.serverEnabled) {
        axios.post(useServer.serverAddress + "deleteTest", {testID: row.id})
          .then(res => {
            console.log(res)
          })
      }

    }).catch(() => {
      console.log("Deletion cancelled");
    }

    );

  }

  const viewDeleteColumn = (row) => {
    return <Box sx={{ color: '#5C54D6', fontWeight: 'bold' }}>
      <Link onClick={() => {
          rowData.current = row;
          setModalOpen(true);
        }}
      >View Test</Link>
      {', '}
      <Link onClick={()=>handleDelete(row)}>Delete</Link>
    </Box>
  }

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Box display='flex' flexGrow='1' />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field:'id', headerName: "ID", headerClassName:'dataGridHeader'},
    { field: 'name', headerName: "Name", headerClassName: 'dataGridHeader', flex:1 },
    { field: 'score', headerName: "Score", headerClassName: 'dataGridHeader', type:'number', headerAlign:'left', align:'left' },
    { field: 'client', headerName: "Client", headerClassName: 'dataGridHeader', flex:1 },
    { field: 'date', headerName: "Date", headerClassName: 'dataGridHeader' },
    { field: 'time', headerName: "Time", headerClassName: 'dataGridHeader' },
    { field: 'test', headerName: "Test", headerClassName: 'dataGridHeader', flex:1 },
    { field: 'action', headerName: 'Action', flex:1, renderCell:(row)=> viewDeleteColumn(row.row)}
  ]
  return (
    <Box className='ViewResultsContainer'>
      <Typography variant="h6">View Test Results</Typography>
      <Box height={'84vh'} sx={{'& .MuiDataGrid-columnHeaderTitle':{fontWeight:600} }}>
        {DATA && <DataGrid 
          rows={DATA} 
          columns={columns} 
          components={{Toolbar: CustomToolbar}}
          componentsProps={{ toolbar:{showQuickFilter: true, quickFilterProps:{debounceMs:500}} }} 
          sx={{border:0}} />}
      </Box>
      {modalOpen && <ViewTestModal modalOpen={modalOpen} setModalOpen={setModalOpen} rowData={rowData} setDATA={setDATA} />}
    </Box>
  )
}
