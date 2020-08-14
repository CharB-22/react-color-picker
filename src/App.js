import React, {Component} from 'react';
import ColorPalette from "./ColorPalette";
import ColorSeed from "./ColorSeed";
import {generatePalette} from "./ColorHelpers";

class App extends Component {
  render() {
    console.log(generatePalette(ColorSeed[4]))
    return (
    <div>
      <ColorPalette palette= {generatePalette(ColorSeed[4])} />
    </div>
  );
  }
}

export default App;
