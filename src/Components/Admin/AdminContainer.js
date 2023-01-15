import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import '../../App.css'
import crtcTheme from '../../crtcTheme';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { useState } from 'react';

import ViewTestResults from './ViewTestResults';
import ManageClients from './ManageClients';
import ManageLoCs from './ManageLoCs';
import IntelligenceTests from './IntelligenceTests';
import ViewDatabase from './ViewDatabase';

const drawerWidth = 240;
const theme = crtcTheme();

export default function AdminContainer() {
  const pages = ['View Test Results', 'Manage Clients', 'Manage LoCs', 'Intelligence Tests', 'View Database'];
  const [currentPage, setCurrentPage] = useState('View Test Results');

  const sidebarList = () => {
    return pages.map((page, i)=>(
      <ListItem key={page} disablePadding>
        <ListItemButton onClick={()=>setCurrentPage(page)} selected={page===currentPage ? true : false}><ListItemText>{page}</ListItemText></ListItemButton>
      </ListItem>
  ));
  }

  const renderPage = () => {
    switch(currentPage){
      case 'View Test Results':
        return <ViewTestResults />
      case 'Manage Clients':
        return <ManageClients />
      case 'Manage LoCs':
        return <ManageLoCs />
      case 'Intelligence Tests':
        return <IntelligenceTests />
      case 'View Database':
        return <ViewDatabase />
      default:
        return <>Something went wrong</>
    }
    
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {/* HEADER */}
          <AppBar className='adminHeader' sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Toolbar variant='dense'>
              <Box sx={{ flexGrow: 1 }}></Box>

              <Typography variant="subtitle1" mr={2} noWrap>Administrator</Typography>
              <Button variant="outlined">Sign Out</Button>
            </Toolbar>
          </AppBar>

          {/* MENU */}
          <Drawer
            sx={{width: drawerWidth, 
              flexShrink: 0, 
              '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor:'#1e1e1e', color:'white' },
            }}
            
            variant="permanent"
            anchor="left"
          >
            <Toolbar variant='dense' sx={{fontWeight:'bold', fontSize:'20px'}}>CRTc - Admin Panel</Toolbar>
            <Divider />
            <List sx={{ '& .MuiListItemButton-root.Mui-selected': { backgroundColor:'#303A41'}}}>
              {sidebarList()}
            </List>
            <Divider />
          </Drawer>

          {/* CONTENT */}
          <Box className="adminContent">
            {renderPage()}
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>);

}
