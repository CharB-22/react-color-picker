import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
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
                            {palette.map(p =><CSSTransition key={p.id} classNames="fade" timeout={2000}><MiniPalette key={p.id} {...p} goToPalette={() => this.goToPalette(p.id)} remove={this.props.remove}/></CSSTransition>)}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);