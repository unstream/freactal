import React from 'react';
import './App.css';
import MandelbrotImage from "./components/mandelbrot/MandelbrotImage";
import {Container, Grid, Toolbar} from "@mui/material";
import FractalParameters from "./components/mandelbrot/FractalParameters";
import MandelbrotAppBar from "./application/MandelbrotAppBar";
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';

function App() {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <MandelbrotAppBar/>
            <MandelbrotImage/>
        </Box>
    );
}

export default App;
