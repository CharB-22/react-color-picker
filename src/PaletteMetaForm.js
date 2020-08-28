import React, {Component} from "react";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            newPaletteName:"",
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

        ValidatorForm.addValidationRule("UniquePaletteName", value => 
        //Make sure that every single color from colors is unique
        this.props.palettes.every (
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    );
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClickOpen(){
        this.setState({open: true})
    }

    handleClose() {
        this.setState({open: false})
    }

    render(){
        const {open, newPaletteName} = this.state;
        const {hideForm, savePalette} = this.props;

        return(
            <div>
                <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <Picker set='apple' />
                    <ValidatorForm
                        onSubmit={() => savePalette(newPaletteName)}
                        ref='form'
                        instantValidate={false}
                        >
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new beautiful palette. Make sure it is unique!
                            </DialogContentText>
                            <TextValidator
                            label = "Name the Palette"
                            value={newPaletteName}
                            onChange={this.handleChange}
                            name= "newPaletteName"
                            fullWidth
                            margin= "normal"
                            validators={['required', 'UniquePaletteName']}
                            errorMessages={[
                                'Enter a Palette name',
                                'Choose a unique name'
                                ]}
                            />
                        </ DialogContent>
                        <DialogActions>
                            <Button 
                            onClick={hideForm} 
                            color="primary">
                                Cancel
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary"
                                type="submit"
                                >
                                    Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}

export default PaletteMetaForm;