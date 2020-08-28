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
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

const drawerWidth = 400;
const styles = theme => ({
    root: {
        display:"flex",
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px"
      },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    navBtn: {
        marginRight: "1rem",
    },
    button: {
        margin: "0 0.5rem",
    },
    link: {
        textDecoration: "none",
    }
})

class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            newPaletteName:"",
            isFormShowing: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
    }
    
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    showForm() {
        this.setState({isFormShowing: true})
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
                    <MenuIcon />
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
                {isFormShowing && (<PaletteMetaForm isOpen={isFormShowing} palettes={this.props.palettes} savePalette={this.props.savePalette}/>)}
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);