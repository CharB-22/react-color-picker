import React, {Component} from 'react';
import ColorPalette from "./ColorPalette";
import PaletteList from "./PaletteList";
import ColorSeed from "./ColorSeed";
import SingleColorPalette from "./SingleColorPalette"
import {Route, Switch} from "react-router-dom";
import {generatePalette} from "./ColorHelpers";

class App extends Component {
  findPalette(id) {
    return ColorSeed.find(function(palette){
      return palette.id ===id;
    })
  }
  render() {
    return (
    <div>
      <Switch>
        <Route exact path="/" render={(routeProps) => <PaletteList palette={ColorSeed} {...routeProps} /> } />
        <Route exact path="/palette/:id" 
          render={(routeProps) => <ColorPalette 
            palette={generatePalette(this.findPalette(routeProps.match.params.id))}/> }/>
        <Route exact path="/palette/:paletteId/:colorId" 
          render={(routeProps)=> <SingleColorPalette 
            colorId = {routeProps.match.params.colorId}
            palette ={generatePalette(this.findPalette(routeProps.match.params.paletteId))}/> }
         />
      </Switch>
    </div>
  );
  }
}

export default App;
