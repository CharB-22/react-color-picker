import React, {Component} from "react";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
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

        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Save Palette
                </Button>
                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <ValidatorForm
                        onSubmit={() => this.props.savePalette(newPaletteName)}
                        ref='form'
                        instantValidate={false}
                        >
                        <TextValidator
                        label = "Name the Palette"
                        value={newPaletteName}
                        onChange={this.handleChange}
                        name= "newPaletteName"
                        validators={['required', 'UniquePaletteName']}
                        errorMessages={[
                            'Enter a Palette name',
                            'Choose a unique name'
                            ]}
                        />
                        <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                        >
                            Save Palette
                        </Button>
                        </ValidatorForm>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Subscribe
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default PaletteMetaForm;