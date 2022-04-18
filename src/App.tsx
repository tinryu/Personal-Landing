import * as React from 'react';

import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';
import Box from '@mui/material/Box';

export default function App() {
  const customization = {
    isOpen: [], // for active default menu
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    opened: true
  };
  
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
