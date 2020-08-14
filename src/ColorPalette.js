import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./ColorPalette.css";
import ColorBox from "./ColorBox";

class ColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 200 }
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(newLevel) {
        this.setState({level: newLevel})
    }
    render() {
        const {colors} =  this.props.palette;
        const {level} = this.state;
        const palette= colors[level].map(color =>
            <ColorBox key={color.name} name={color.name} background={color.hex}/>)
        return(
            <div className="Palette">
                <div className="slider">
                    <Slider defaultValue={level} 
                    min={100} 
                    max={900}
                    step={100}
                    onAfterChange={this.changeLevel} />
                </div>
                {/*NavBar will go here */}
                <div className="Palette-Swatch">
                    {palette}
                </div>
                {/*Footer will go here */}
            </div>
        )
    }
}

export default ColorPalette;