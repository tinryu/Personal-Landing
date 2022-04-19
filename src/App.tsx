import * as React from 'react';
import { useSelector } from 'react-redux';

import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';
import Box from '@mui/material/Box';

export default function App() {
  interface RootState {
    customization: any
  }
  const customization = useSelector((state: RootState) => state.customization);
  
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <Box className='wrapper'>
                  <Routes/>
                </Box>
            </ThemeProvider>
        </StyledEngineProvider>
    </div>
  );
}
