import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import clsx from 'clsx';
import DragabbleColorList from './DragabbleColorList'
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
import { Link } from '@material-ui/core';
import {arrayMove} from 'react-sortable-hoc';

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
    static defaultProps = {
      maxColor: 20
    }
    constructor(props){
        super(props);
        this.state = { 
            open: false,
            currentColor: "skyblue",
            newColorName: "",
            colors: this.props.palettes[0].colors,
            newNamePalette: "",
        };
        this.changeCurrentColor = this.changeCurrentColor.bind(this)
        this.addNewColor = this.addNewColor.bind(this);
        this.savePalette = this.savePalette.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.randomColor = this.randomColor.bind(this);
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
                ({ color }) => color.toLowerCase() !== this.state.currentColor.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("UniquePaletteName", value => 
        //Make sure that every single color from colors is unique
        this.props.palettes.every (
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
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
            name: this.state.newColorName
        }
        this.setState({
            colors: [...this.state.colors, newColor]}
            );
        this.setState({newColorName: ""});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    savePalette() {
      let newNamePalette = this.state.newNamePalette;
      const newPalette = {
        paletteName: newNamePalette,
        id: newNamePalette.toLowerCase().replace(/ /g, "-"),
        emoji: ":)",
        colors: this.state.colors
      }
      this.props.savePalette(newPalette);
      // redirect to the homepage to see the new Palette
      this.props.history.push("/")
    }

    removeColor(colorName) {
      this.setState({
        colors: this.state.colors.filter(color => color.name !== colorName )
      })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    };

    clearPalette() {
      this.setState({colors: []});
    };

    randomColor() {
        //pick random colors from existing palette;
      //1. Combine colors from all palettes into one array:
      
      const allColors = this.props.palettes.map(palette => palette.colors).flat()
      let x = Math.floor(Math.random() * allColors.length)
      const randomPick = allColors[x];
      console.log(randomPick)
      const randomColor = {
        name: randomPick.name,
        color: randomPick.color,
      }
      this.setState({colors: [...this.state.colors, randomColor]})
    }


  render() {
    const {classes, maxColor} = this.props;
    const {open, currentColor,colors} = this.state;
    const isPaletteFull = colors.length >= maxColor
    return (
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
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Create a palette
              </Typography>
              <ValidatorForm
              onSubmit={this.savePalette}
              ref='form'
              instantValidate={false}
              >
              <TextValidator
               label = "Name the Palette"
               value={this.state.newNamePalette}
               onChange={this.handleChange}
               name= "newNamePalette"
               validators={['required', 'UniquePaletteName']}
               errorMessages={[
                    'Enter a Palette name',
                    'Choose a unique name'
                  ]}
               />
              <Link exact to="/">
                <Button variant="contained" color="secondary">
                    Go Back
                </Button>
              </Link>
                <Button 
                variant="contained" 
                color="primary"
                type="submit"
                >
                    Save Palette
                </Button>
              </ValidatorForm>
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
                <Button 
                variant="contained" 
                color="secondary"
                onClick = {this.clearPalette}
                >
                    Clear Palette
                </Button>
                <Button 
                variant="contained" 
                color={isPaletteFull ? "gray":"primary"}
                onClick={this.randomColor}
                disabled = {isPaletteFull}
                >
                    {isPaletteFull? "Palette Full":"Random Color"}
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
                <TextValidator                    
                    value={this.state.newColorName}
                    onChange={this.handleChange}
                    name= "newColorName"
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
                style={{backgroundColor: isPaletteFull ? "gray": currentColor}}
                type="submit"
                disabled = {isPaletteFull}
                >
                    {isPaletteFull ? "Palette Full":"Add Color"}
                </Button>
            </ValidatorForm>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader}/> 
            <DragabbleColorList 
            colors= {this.state.colors} 
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            />
          </main>
        </div>
      );
  }

}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);