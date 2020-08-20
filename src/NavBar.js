import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles/NavBarStyles";


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex", open: false};
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(e) {
        // Update state so the Select menu will get the selected value
        this.setState({format: e.target.value, open: true});
        // Send the selected value to the parent component so the values of colorbox are updated
        this.props.handleChange(e.target.value);
    }

    closeSnackbar() {
        this.setState({open:false});
    }

    render() {
        const {level, changeLevel, isShowingAllColors, classes} = this.props;
        const {format} = this.state;
        return(
            <header className={classes.Navbar}>
                <div className= {classes.logo}>
                    <Link exact to="/">reactcolorpicker</Link>
                </div>
                { isShowingAllColors && <div>
                    <span>Level: {level.level}</span>
                    <div className={classes.slider}>
                        <Slider defaultValue={level.level} 
                        min={100} 
                        max={900}
                        step={100}
                        onAfterChange={changeLevel} />
                    </div>
                </div>
                }
                <div className={classes.selectContainer}>
                    <Select  value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #FFF</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 0.1)</MenuItem>
                    </Select>
                </div>
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal:"left"}} 
                open={this.state.open}
                autoHideDuration={3000}
                message={<span>Format changed to : {format.toUpperCase()} </span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                onClose={this.closeSnackbar}
                action={[
                    <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                ]}
                 />
            </header>
        )
    }
}

export default withStyles(styles)(NavBar);