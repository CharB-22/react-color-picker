import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import ColorPalette from "./ColorPalette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Page from "./Page";
import ColorSeed from "./ColorSeed";
import {generatePalette} from "./ColorHelpers";

class App extends Component {
  constructor(props) {
    super(props);
    //Check if there is already some palettes saved in Local Storage
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    this.state = {
      // Palettes will be then either savedPalettes if any or original ColorSeed
      palettes : savedPalettes || ColorSeed,
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.removePalette = this.removePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function(palette){
      return palette.id ===id;
    })
  }

  removePalette(id){
    this.setState(st => ({palettes: st.palettes.filter( p => p.id !== id)}), this.synchLocalStorage);

  }

  savePalette(newPalette) {
    // Set the new state with the new palette created and then after, callback function to save it to the local storage
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.synchLocalStorage)
  }

  synchLocalStorage(){
    //Save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }

  render() {
    return (
    <div>
      <Route render={({location})=>
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="page" timeout={500}>
                <Switch location={location}>
                  <Route exact path="/palette/new" render={(routeProps)=> <Page><NewPaletteForm {...routeProps} palettes={this.state.palettes} savePalette={this.savePalette}/></Page> }/>
                  <Route exact path="/" render={(routeProps) => <Page><PaletteList palette={this.state.palettes} {...routeProps} remove={this.removePalette}/></Page> } />
                  <Route exact path="/palette/:id" 
                    render={(routeProps) =><Page><ColorPalette 
                      palette={generatePalette(this.findPalette(routeProps.match.params.id))}/></Page> }/>
                  <Route exact path="/palette/:paletteId/:colorId" 
                    render={(routeProps)=> <Page><SingleColorPalette 
                      colorId = {routeProps.match.params.colorId}
                      palette ={generatePalette(this.findPalette(routeProps.match.params.paletteId))}/></Page> }
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
      }/>
    </div>
  );
  }
}

export default App;
