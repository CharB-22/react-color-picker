import React, {Component} from 'react';
import { ChromePicker } from 'react-color';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import Button from '@material-ui/core/Button';

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
        const {classes, colors, maxColor} = this.props;
        const {currentColor, newColorName} = this.state;
        const isPaletteFull = colors.length >= maxColor
        return(
            <div>
                <ChromePicker 
                color={currentColor}
                onChangeComplete={this.changeCurrentColor}
                />
                <ValidatorForm
                    onSubmit={()=> this.props.addNewColor(newColorName, currentColor)}
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
            </div>
        )
    }
}

export default ColorPickerForm;