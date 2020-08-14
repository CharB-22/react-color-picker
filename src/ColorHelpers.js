  import chroma from "chroma-js";

  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  function generatePalette(starterPalette) {
      let newPalette = {
          paletteName : starterPalette.paletteName,
          id: starterPalette.id,
          emoji: starterPalette.emoji,
          colors: {}
      };
      // Loop through each level to include them in the colors object
      for (let level of levels){
          newPalette.colors[level] = [];
      }
      
      //Loop through all the colors
      for (let color of starterPalette.colors) {
        let scale = generateScale(color.color, 10).reverse();
        //for each of theses colors in the scale, add it to the palette
        for (let i in scale){
            newPalette.colors[levels[i]].push({
                name:`${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                // regular expression meaning replace a space globally with a dash
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ",1.0)")
            })
        }
      }
      return newPalette;
  }

  function getRange(hexColor) {
      const end = "#fff";
      return (
          [chroma(hexColor)
            .darken(1.4)
            .hex(),
            hexColor,
            end
          ]
      )
  }

// Gives us 10 colors based of an input color
  function generateScale(hexColor, numberOfColors) {
    return chroma
    .scale(getRange(hexColor))
    .mode("lab")
    .colors(numberOfColors);
  }


  export {generatePalette};