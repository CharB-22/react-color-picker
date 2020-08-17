import React, { Component } from "react";
import NavBar from "./NavBar";
import "./ColorPalette.css";
import ColorBox from "./ColorBox";

class ColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 200, format:"hex" }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }
    changeLevel(newLevel) {
        this.setState({level: newLevel})
    }

    changeValue(value) {
        this.setState({format: value})
    }

    render() {
        const {colors,paletteName, emoji} =  this.props.palette;
        const {level, format} = this.state;
        const palette= colors[level].map(color =>
            <ColorBox key={color.name} name={color.name} background={color[format]}/>)
        return(
            <div className="Palette">
                <NavBar level={this.state} changeLevel={this.changeLevel} handleChange={this.changeValue} />
                <div className="Palette-Swatch">
                    {palette}
                </div>
                <footer className="Palette-footer">
                    {paletteName}
                    <span className="paletteEmoji">{emoji}</span>
                </footer>
            </div>
        )
    }
}

export default ColorPalette;