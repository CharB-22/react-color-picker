import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends Component {
    constructor(props){
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }

    deletePalette(e){
        e.stopPropagation();
        console.log(this.props)
        this.props.remove(this.props.id)
    }
    render(){
        const {classes, paletteName, emoji, colors, goToPalette} = this.props;
        const miniColorBoxes = colors.map(color => (
            <div 
            key={color.name} 
            className={classes.miniColor} 
            style={{backgroundColor: color.color}}>
            </div>
        ))
        
        return (
            <div className={classes.root} onClick={goToPalette}>
                <DeleteIcon className={classes.deleteIcon} onClick={this.deletePalette}/>
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);