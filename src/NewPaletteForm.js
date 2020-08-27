import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ColorPickerForm from "./ColorPickerForm";
import clsx from 'clsx';
import DragabbleColorList from './DragabbleColorList';
import PaletteFormNav from "./PaletteFormNav";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {arrayMove} from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
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
            colors: this.props.palettes[0].colors,
        };
        this.addNewColor = this.addNewColor.bind(this);
        this.savePalette = this.savePalette.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.randomColor = this.randomColor.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);       
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
    }


    handleDrawerOpen = () => {
        this.setState({open: true})
    };

    handleDrawerClose = () => {
        this.setState({open: false})
    };


    addNewColor(colorName, color) {
        const newColor = {
            color: color,
            name: colorName
        }
        this.setState({
            colors: [...this.state.colors, newColor]}
            );
        this.setState({newColorName: ""});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    savePalette(newPaletteName) {
      const newPalette = {
        paletteName: newPaletteName,
        id: newPaletteName.toLowerCase().replace(/ /g, "-"),
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
      //Combine colors from all palettes into one array:
      
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
    const {classes, maxColor, palettes} = this.props;
    const {open, colors} = this.state;
    const isPaletteFull = colors.length >= maxColor
    return (
        <div className={classes.root}>
          <PaletteFormNav 
          open={this.state.open} 
          handleDrawerOpen={this.handleDrawerOpen} 
          handleDrawerClose={this.handleDrawerClose}
          savePalette={this.savePalette}
          paletteName={this.state.newNamePalette}
          handleChange={this.handleChange}
          palettes = {palettes}
          />
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
            <ColorPickerForm 
            classes = {classes} 
            maxColor = {maxColor} 
            colors={colors}
            addNewColor = {this.addNewColor}
            />
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