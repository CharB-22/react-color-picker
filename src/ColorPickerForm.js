import React, {Component} from 'react';
import { ChromePicker } from 'react-color';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from "./styles/ColorPickerFormStyles";


class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "skyBlue",
            newColorName: "",
        }
        this.changeCurrentColor = this.changeCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // custom rule will have name 'isColorNameUnique'
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            this.props.colors.every(
              ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value => 
            //Make sure that every single color from colors is unique
            this.props.colors.every (
                ({ color }) => color.toLowerCase() !== this.state.currentColor.toLowerCase()
            )
        );
    }

    changeCurrentColor(newColor){
        this.setState({currentColor: newColor.hex})
        }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const {classes, colors, maxColor, addNewColor} = this.props;
        const {currentColor, newColorName} = this.state;
        const isPaletteFull = colors.length >= maxColor
        return(
            <div className={classes.picker}>
                <ChromePicker 
                color={currentColor}
                onChangeComplete={this.changeCurrentColor}
                className={classes.picker}
                />
                <ValidatorForm
                    onSubmit={()=> addNewColor(newColorName, currentColor)}
                    ref='form'
                    instantValidate={false}
                >
                    <TextValidator                    
                        className={classes.colorNameInput}
                        variant="filled"
                        margin= "normal"
                        placeholder="Name the color"
                        value={newColorName}
                        onChange={this.handleChange}
                        name= "newColorName"
                        validators={['required', "isColorNameUnique", "isColorUnique"]}
                        errorMessages={[
                        'Enter a color name', 
                        'Color Name must be unique', 
                        "Color already used"]}
                    />
                    <Button 
                    className={classes.addColor}
                    variant="contained"
                    color="primary"
                    style={{backgroundColor: isPaletteFull ? "gray": currentColor}}
                    type="submit"
                    disabled = {isPaletteFull}
                    >
                        {isPaletteFull ? "Palette Full":"Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);