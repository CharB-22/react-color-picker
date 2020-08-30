import React from "react";
import {SortableContainer} from 'react-sortable-hoc';
import DragabbleColorBox from "./DragabbleColorBox";

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