import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import clsx from 'clsx';
import DragabbleColorBox from './DragabbleColorBox'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  buttonRange: {
      display: "flex",
      justifyContent:"center",
      alignItems: "center"
  },
});



class NewPaletteForm extends Component {

    constructor(props){
        super(props);
        this.state = { 
            open: false,
            currentColor: "skyblue",
            newName: "",
            colors: []
        };
        this.changeCurrentColor = this.changeCurrentColor.bind(this)
        this.addNewColor = this.addNewColor.bind(this);
    }

    componentDidMount() {
        // custom rule will have name 'isColorNameUnique'
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            this.state.colors.every(
              ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value => 
            //Make sure that every single color from colors is unique
            this.state.colors.every (
                ({ color }) => color !== this.state.currentColor
            )
        );
    }


    handleDrawerOpen = () => {
        this.setState({open: true})
    };

    handleDrawerClose = () => {
        this.setState({open: false})
    };

    changeCurrentColor(newColor){
    this.setState({currentColor: newColor.hex})
    }

    addNewColor() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newName
        }
        this.setState({
            colors: [...this.state.colors, newColor]}
            );
        this.setState({newName: ""});
    }

    handleChange = (event) => {
        event.target.color = event.target.value;
        this.setState({newName: event.target.value});
    }


  render() {
    const {classes} = this.props;
    const {open, currentColor, colors} = this.state;
    return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Persistent drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <Typography variant="h4"> Design your Palette</Typography>
            <div className={classes.buttonRange}>
                <Button variant="contained" color="secondary">
                    Clear Palette
                </Button>
                <Button variant="contained" color="primary">
                    Random Color
                </Button>
            </div>
            <ChromePicker 
            color={currentColor}
            onChangeComplete={this.changeCurrentColor}
            />
            <ValidatorForm
                onSubmit={this.addNewColor}
                ref='form'
                instantValidate={false}
            >
                <TextValidator                    value={this.state.newName}
                    onChange={this.handleChange}
                    name= "NewColorName"
                    validators={['required', "isColorNameUnique", "isColorUnique"]}
                    errorMessages={[
                    'Enter a color name', 
                    'Color Name must be unique', 
                    "Color already used"]}
                />
                <Button 
                className={classes.buttonAddColor}
                variant="contained"
                color="primary"
                style={{backgroundColor: currentColor}}
                type="submit"
                >
                    Add Color
                </Button>
            </ValidatorForm>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {colors.map(color => <DragabbleColorBox key={color} color={color.color} name={color.name}/>)}
          </main>
        </div>
      );
  }

}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);