import React, { useCallback } from 'react';
import './Mandelbrot.css';
import FractalInterface from "./FractalInterface";
import FractalParameters from './FractalParameters';
import { Grid } from '@mui/material';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useRef } from 'react';
import { RefObject } from 'react';
import { Paper } from '@mui/material';
import { Container } from '@mui/material';

class MandelbrotImage extends React.Component<{}, FractalInterface>  {
    onCropComplete: ((crop: Crop, percentageCrop: Crop) => void) | undefined;
    onCropChange: ((crop: Crop, percentageCrop: Crop) => void) | undefined;
    imageWidth = 0;
    imageHeight = 0;
    child: RefObject<FractalParameters>;

    constructor (props: FractalInterface) {
        super(props);
        this.child = React.createRef();
        this.state = {
            c0: props.c0,
            c0i: props.c0i,
            c1: props.c1,
            c1i: props.c1i,
            width: props.width,
            height: props.height,
            maxIterations: props.maxIterations,
            imageCompression: props.imageCompression,
            onChangeParams: props.onChangeParams,
            crop: {
                unit: '%', // default, can be 'px' or ''%
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
        };

    }

    public rerender(params: FractalInterface) {
        let crop = this.state.crop;
        crop.width = 0;
        crop.height = 0;
        this.setState({
            c0: params.c0,
            c0i: params.c0i,
            c1: params.c1,
            c1i: params.c1i,
            maxIterations: params.maxIterations,
            imageCompression: params.imageCompression,
            crop: crop,
        });
    }

    public static defaultProps = {
        c0: -1.5,
        c0i: -1,
        c1: 0.5,
        c1i: 1,
        // c0: -0.8665014418863999,
        // c0i: -0.24407616104639998,
        // c1: -0.8640678719007999,
        // c1i: -0.24164259106080002,
        maxIterations: 100,
        imageCompression: -2,
        width: 1000,
        height: 1000,
    };

    computeImageUrl(): string {
        //C02F94VEMD6R
        //http://localhost:8081
        let url = "http://localhost:8081/api/v1/mandelbrot"
            + "?c0=" + this.state.c0
            + "&c0i=" + this.state.c0i
            + "&c1=" + this.state.c1
            + "&c1i=" + this.state.c1i
            + "&max_iterations=" + this.state.maxIterations
            + "&w=" + this.state.width
            + "&h=" + this.state.height
            + "&image_compression=" + this.state.imageCompression;
        return url;
    }

    onChange = (crop: Crop) => {
        crop.aspect = 1;
        this.setState({crop});
    };

    onImageLoaded = (image: HTMLImageElement) => {
        this.imageWidth = image.width;
        this.imageHeight = image.height;
        console.log("loaded")
        return false; // Return false when setting crop state in here.
    };

    onDragEnd = (e: Event) => {
        let rx = (this.state.c1 - this.state.c0) / this.imageWidth;
        this.child.current!.updateState({
            c0: this.state.c0 + this.state.crop.x * rx,
            c0i: this.state.c0i + this.state.crop.y * rx,
            c1: this.state.c0 + (this.state.crop.x + this.state.crop.width) * rx,
            c1i: this.state.c0i + (this.state.crop.y + this.state.crop.height) * rx,
            maxIterations: this.state.maxIterations,
            imageCompression: this.state.imageCompression,
        })
    };

    render() {

        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                //height: 240,
                            }}
                        >
                            <ReactCrop
                                className={"crop"}
                                src={this.computeImageUrl()}
                                crop={this.state.crop}
                                imageAlt={"Mandelbrot image"}
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onChange}
                                onDragEnd={this.onDragEnd}
                                // minWidth={250}
                                // maxWidth={1000}
                                // minHeight={250}
                                // maxHeight={1000}
                            />

                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                //height: 240,
                            }}
                        >
                            <FractalParameters
                                ref={this.child}
                                c0={this.state.c0} c0i={this.state.c0i} c1={this.state.c1} c1i={this.state.c1i}
                                maxIterations={this.state.maxIterations}
                                width={this.state.width} height={this.state.height} imageCompression={this.state.imageCompression}
                                crop={this.state.crop}
                                onChangeParams={(params: FractalInterface) => this.rerender(params)}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default MandelbrotImage;