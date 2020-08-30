import React, {PureComponent} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends PureComponent {
    constructor(props){
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }

    deletePalette(e){
        e.stopPropagation();
        console.log(this.props)
        this.props.openDialog(this.props.id)
    }
    render(){
        const {classes, paletteName, emoji, colors, goToPalette, id} = this.props;
        const miniColorBoxes = colors.map(color => (
            <div 
            key={color.name} 
            className={classes.miniColor} 
            style={{backgroundColor: color.color}}>
            </div>
        ))
        
        return (
            <div className={classes.root} onClick={() => goToPalette(id)}>
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