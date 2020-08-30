import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/CheckCircle';


import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {openDialog: false, deletingId: ""};
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }


    openDialog(id){
        this.setState({openDialog: true, deletingId: id})
        }

    closeDialog(){
        this.setState({openDialog: false, deletingId: ""})
    }

    handleDelete() {
        this.props.remove(this.state.deletingId);
        this.closeDialog()
    }

    render() {
        const {palette, classes} = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.container} >
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link exact to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                            {palette.map(p =>
                            <CSSTransition key={p.id} classNames="fade" timeout={2000}>
                                <MiniPalette key={p.id} {...p} 
                                goToPalette={() => this.goToPalette(p.id)} 
                                //remove={this.props.remove}
                                openDialog={this.openDialog}
                                /></CSSTransition>)}
                    </TransitionGroup>
                </div>
                <Dialog open={this.state.openDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
                        <DialogTitle id="delete-dialog-title">Do you really want to delete?</DialogTitle>
                        <ListItem button onClick={this.handleDelete} >
                            <Avatar style={{backgroundColor: "blue" }}>
                                <CheckIcon />
                            </Avatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem button onClick={this.closeDialog} >
                            <Avatar style={{backgroundColor: "red" }}>
                                <CloseIcon />
                            </Avatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);