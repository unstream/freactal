import React from "react";
import tinygradient from "tinygradient";
import {SketchPicker, ColorResult, RGBColor} from "react-color";
import {Classes} from "reactcss";
import {Color} from '../color/Color';
import tinycolor from "tinycolor2";

export class ColorGradient extends React.Component {

    color1: RGBColor = {
        r: 0,
        g: 0,
        b: 0,
    }
    color2: RGBColor = {
        r: 0,
        g: 0,
        b: 255,
    }
    state = {
        color1: this.color1,
        color2: this.color2,
    };

    handleChange1 = (color: ColorResult) => {
        this.setState({color1: color.rgb})
    };
    handleChange2 = (color: ColorResult) => {
        this.setState({color2: color.rgb})
    };


    render() {
        const gradient = tinygradient(this.state.color1, this.state.color2).css()

         return (
            <div>
                <div style={{background: gradient}}>
                    &nbsp;
                </div>
                <div style={{width: '100%', border: 5}}>
                    <div style={{float: 'left'}}>
                        <Color
                            color = { tinycolor(this.state.color1).toRgb() }
                            onChange={this.handleChange1}
                        />
                    </div>
                    <div style={{float: 'right'}}>
                        <Color
                            color = { tinycolor(this.state.color2).toRgb() }
                            onChange={this.handleChange2}
                        />
                    </div>
                </div>
            </div>
        )
    }
}