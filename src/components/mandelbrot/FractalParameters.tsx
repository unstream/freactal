import React, {FormEvent} from 'react';
import './Mandelbrot.css';
import FractalInterface from "./FractalInterface";
import {Button, Grid, InputLabel, Select, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./FractalParameters.css"
import { MenuItem } from '@mui/material';

class FractalParameters extends React.Component<FractalInterface, {}> {

    state: any;

    constructor(props: FractalInterface) {
        super(props);
        this.state = {
            c0: props.c0,
            c0i: props.c0i,
            c1: props.c1,
            c1i: props.c1i,
            maxIterations: props.maxIterations,
            imageCompression: props.imageCompression,
        };
    }

    public updateState(props: any) : void {
        this.setState({
            c0: props.c0,
            c0i: props.c0i,
            c1: props.c1,
            c1i: props.c1i,
            maxIterations: props.maxIterations,
            imageCompression: props.imageCompression,
        });
    }

    render() {
        // @ts-ignore
        return (

            <Box component="form" noValidate sx={{mt: 1}}>
                <Typography variant="h6" gutterBottom>
                    Mandelbrot set parameters
                </Typography>
                <Grid container direction={"column"} spacing={3}>
                    <Grid item xs={8}>
                        <TextField id="c0" label="c0"
                                   fullWidth
                                   name={"c0"}
                                   value={this.state.c0}
                                   onChange={ (event) => {this.setState({c0: event.target.value })}}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="c0i" label="c0i"
                                   fullWidth
                                   name={"c0i"}
                                   value={this.state.c0i}
                                   onChange={ (event) => {this.setState({c0i: event.target.value })}}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="c1" label="c1"
                                   fullWidth
                                   name={"c1"}
                                   value={this.state.c1}
                                   onChange={ (event) => {this.setState({c1: event.target.value })}}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="c1i" label="c1i"
                                   fullWidth
                                   name={"c1i"}
                                   value={this.state.c1i}
                                   onChange={ (event) => {this.setState({c1i: event.target.value })}}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="maxIterations" label="maxIterations"
                                   fullWidth
                                   name={"maxIterations"}
                                   value={this.state.maxIterations}
                                   onChange={ (event) => {this.setState({maxIterations: event.target.value })}}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <InputLabel id="ImageCompressionLabelId">Image Compression</InputLabel>
                            <Select
                                labelId="ImageCompressionLabelId"
                                id="ImageCompression"
                                label="ImageCompression"
                                name={"imageCompression"}
                                value={this.state.imageCompression}
                                onChange={ (event) => {this.setState({imageCompression: event.target.value })}}
                            >
                            <MenuItem value={-2}>Default Compression</MenuItem>
                            <MenuItem value={-1}>No Compression</MenuItem>
                        </Select>
                    </Grid>

                    
                    <Grid item xs={8}>
                        <Button
                            type="button"
                            variant="contained"
                            fullWidth
                            sx={{mt: 3, mb: 2}}
                            onClick={() => {
                                console.log(this.state);
                                this.props.onChangeParams(this.state)
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid></Box>

        );
    }


}

export default FractalParameters;