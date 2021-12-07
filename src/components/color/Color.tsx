import React from "react";
import {SketchPicker, ColorResult, RGBColor, ColorChangeHandler} from "react-color";
import "./Color.css";
import tinycolor from "tinycolor2";

type ColorProp = {
    color: RGBColor;
    onChange?: ColorChangeHandler | undefined;
};

type ColorState = {
    color: RGBColor;
    displayColorPicker: boolean;
};

export class Color extends React.Component<ColorProp, ColorState> {

    state: ColorState = {
        color: this.props.color,
        displayColorPicker: false,
    };


    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false})
    };

    handleChange = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            color: color.rgb,
        })
        if (this.props.onChange) {
            this.props.onChange(color, event);
        }
    };

    render() {
        return (
            <div>
                <div className={'swatch'} onClick={this.handleClick}>
                    <div className={'color'} style={{
                        background:
                            "rgb(" +
                            this.state.color.r +
                            "," +
                            this.state.color.g +
                            "," +
                            this.state.color.b +
                            ")"
                    }}/>

                </div>
                {this.state.displayColorPicker ? <div className={'popover'}>
                    <div className={'clover'} onClick={this.handleClose}/>
                    <SketchPicker color={this.state.color} onChange={this.handleChange}/>
                </div> : null}
            </div>
        )
    }
}