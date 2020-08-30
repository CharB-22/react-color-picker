import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {arrayMove} from 'react-sortable-hoc';
import ColorPickerForm from "./ColorPickerForm";
import DragabbleColorList from './DragabbleColorList';
import PaletteFormNav from "./PaletteFormNav";
import ColorSeed from "./ColorSeed"
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import styles from "./styles/NewPaletteFormStyles";



class NewPaletteForm extends Component {
    static defaultProps = {
      maxColor: 20
    }
    constructor(props){
        super(props);
        this.state = { 
            colors: ColorSeed[0].colors,
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

    savePalette(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")
        newPalette.colors = this.state.colors
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
      let x;
      let randomColor;
      let isDuplicateColor = true;
      while(isDuplicateColor){
        x = Math.floor(Math.random() * allColors.length);
        randomColor = allColors[x];
        isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name)
      }
      this.setState({colors: [...this.state.colors, randomColor]})
    }


  render() {
    const {classes, maxColor, palettes} = this.props;
    const {open, colors, newNamePalette} = this.state;
    const isPaletteFull = colors.length >= maxColor
    return (
        <div className={classes.root}>
          <PaletteFormNav 
          open={this.state.open} 
          handleDrawerOpen={this.handleDrawerOpen} 
          handleDrawerClose={this.handleDrawerClose}
          savePalette={this.savePalette}
          paletteName={newNamePalette}
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
            <div className={classes.container}>
              <Typography variant="h4" gutterBottom> Design your Palette</Typography>
              <div className={classes.buttons}>
                  <Button
                  className={classes.button}
                  variant="contained" 
                  color="secondary"
                  onClick = {this.clearPalette}
                  >
                      Clear Palette
                  </Button>
                  <Button 
                  className={classes.button}
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
            </div>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader}/> 
            <DragabbleColorList 
            colors= {colors} 
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
            />
          </main>
        </div>
      );
  }

}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);