import React from "react";

function Memory(props) {
function handleClick() {
    props.onDelete(props.id);
}
   return (
    <div className="note">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <button onClick={handleClick} >delete</button>
    </div>
   );
}

export default Memory;