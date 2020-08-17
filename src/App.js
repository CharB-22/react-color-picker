import React, {Component} from 'react';
import ColorPalette from "./ColorPalette";
import {Route, Switch} from "react-router-dom";
import ColorSeed from "./ColorSeed";
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
        <Route exact path="/" render={() => <h1>We will have the list of Palettes here</h1>}/>
        <Route exact path="/palette/:id" render={(routeProps) => <ColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/> }/>
      </Switch>
    </div>
  );
  }
}

export default App;
