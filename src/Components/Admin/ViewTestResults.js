/* eslint-disable no-lone-blocks */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter } from '@mui/x-data-grid';
import mockResultData from '../../data/mockTestResults.json'
import { Link } from 'react-router-dom';

{/* TODO: Make ViewTest/Delete work when I actually make the component*/}


export default function ViewTestResults() {
  const viewDeleteColumn = (row) => {
    return <Box sx={{ color: '#5C54D6', fontWeight:'bold'}}>
      <Link onClick={()=>console.log(row.name)}>View Test</Link>
      {', '}
      <Link>Delete</Link>
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
        <DataGrid 
          rows={mockResultData} 
          columns={columns} 
          components={{Toolbar: CustomToolbar}}
          componentsProps={{ toolbar:{showQuickFilter: true, quickFilterProps:{debounceMs:500}} }} 
          sx={{border:0}} />
      </Box>
    </Box>
  )
}
