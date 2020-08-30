import React, {Component} from 'react';
import ColorPalette from "./ColorPalette";
import PaletteList from "./PaletteList";
import ColorSeed from "./ColorSeed";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import {Route, Switch} from "react-router-dom";
import {generatePalette} from "./ColorHelpers";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import "./App.css";

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
              <CSSTransition key={location.key} classNames="fade" timeout={500}>
                <Switch location={location}>
                  <Route exact path="/palette/new" render={(routeProps)=> <div className="page"><NewPaletteForm {...routeProps} palettes={this.state.palettes} savePalette={this.savePalette}/></div> }/>
                  <Route exact path="/" render={(routeProps) => <div className="page"><PaletteList palette={this.state.palettes} {...routeProps} remove={this.removePalette}/></div> } />
                  <Route exact path="/palette/:id" 
                    render={(routeProps) =><div className="page"><ColorPalette 
                      palette={generatePalette(this.findPalette(routeProps.match.params.id))}/></div> }/>
                  <Route exact path="/palette/:paletteId/:colorId" 
                    render={(routeProps)=> <div className="page"><SingleColorPalette 
                      colorId = {routeProps.match.params.colorId}
                      palette ={generatePalette(this.findPalette(routeProps.match.params.paletteId))}/></div> }
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
