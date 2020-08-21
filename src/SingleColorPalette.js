import React, {Component} from "react";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import ColorBox from "./ColorBox";
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorPaletteStyles";


class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShade(this.props.palette, this.props.colorId);
        this.state= {format:"hex"};
        this.changeValue = this.changeValue.bind(this);
    }
    gatherShade(palette, colorToFilterBy) {
        //return all shades of given colors
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1);

    }

    changeValue(value) {
        this.setState({format: value})
    }

    render() {
        // For each level of colors, pick the one matching with the color id of the page
        const {classes} = this.props;
        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;
        const colorBoxes = this._shades.map(color => 
        <ColorBox key={color.name} 
        name={color.name} 
        background={color[format]}
        showFullPalette={false} />)
        return(
            <div>
                <NavBar 
                handleChange={this.changeValue}
                isShowingAllColors = {false} />
                <div className= {classes.Palette}>
                    <div className={classes.paletteSwatch}>
                        {colorBoxes}
                        <div className={classes.goBack}>
                            <Link exact to={`/palette/${id}`}>GO BACK</Link>    
                        </div>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);