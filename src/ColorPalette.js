import React, { Component } from "react";
import NavBar from "./NavBar";
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
                <NavBar level={this.state} changeLevel={this.changeLevel} />
                <div className="Palette-Swatch">
                    {palette}
                </div>
                {/*Footer will go here */}
            </div>
        )
    }
}

export default ColorPalette;