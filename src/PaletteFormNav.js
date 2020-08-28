import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from "./PaletteMetaForm";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import styles from "./styles/PaletteFormNavStyles";


class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            newPaletteName:"",
            isFormShowing: false,
            open: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }
    
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    showForm() {
        this.setState({isFormShowing: true})
    }

    hideForm() {
        this.setState({isFormShowing: false})
    }
    render(){
        const {classes, open} = this.props;
        const {isFormShowing} = this.state;
        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                color="default"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.props.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <EditIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                    Create a palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtn}>
                        <Link exact to="/" className={classes.link}>
                            <Button 
                            variant="contained" 
                            color="secondary"
                            className={classes.button}
                            >
                            Go Back
                            </Button>
                        </Link>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.showForm}
                        >
                            Save Palette
                        </Button>
                    </div>
                </AppBar>
                {isFormShowing && (<PaletteMetaForm hideForm={this.hideForm} palettes={this.props.palettes} savePalette={this.props.savePalette}/>)}
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);