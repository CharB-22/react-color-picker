import React from "react";
import DragabbleColorBox from "./DragabbleColorBox";
import {SortableContainer} from 'react-sortable-hoc';

 const DraggableColorList = SortableContainer(({colors, removeColor}) =>{
    return(
        <div style={{height: "100%"}}>
        {colors.map((color, i) => (
            <DragabbleColorBox 
            key={color} 
            color={color.color}
            index = {i} 
            name={color.name} 
            handleClick ={() => removeColor(color.name)}
            />
    ))}
        </div>
    );
})

export default DraggableColorList;