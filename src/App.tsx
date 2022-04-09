import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Player from  './components/Player/Player';
// import Loading from './components/Loading/Loading';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop: any) => prop !== 'open' })<{open?: boolean;}>
(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop: any) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  boxShadow: 'none',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {
  // const obj = { isLoading: true };
  // const [state, setLoadding] = useState(obj);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
      setOpen(true);
  };

  const handleDrawerClose = () => {
      setOpen(false);
  };
  
  // useEffect(() => {
  //   const closeLoading = () => {
  //     setLoadding({isLoading: false});
  //   }
  //   const timerID = setInterval(() => {
  //     closeLoading();
  //   }, 3000); 
  //   return () => clearInterval(timerID);    
  // })
  
  return (
    <div className="App">
      {/* <Loading isLoad={state.isLoading}/> */}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" color="inherit" open={open}>
            <Toolbar>
                <IconButton
                    classes="iconButton"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    size="medium"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                <MenuIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {['Home', 'About', 'Player'].map((text, index) => (
                <ListItem key={text}>
                  <ListItemButton component="a" href={"/"+text}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
        <Main open={open} className='wrapper'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Player" element={<Player />} />
          </Routes>
        </Main>
      </Box>
    </div>
  );
}

export default App;
