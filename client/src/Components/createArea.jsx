import React, {useState} from "react";

function CreateArea(props) {


    const [memory, setMemory]= useState({
        title:"",
        description:""
    });
    function handleChange(event){
        const {name, value}= event.target;
        setMemory(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }
    function submitMemory(event){
        event.preventDefault();
        props.onAdd(memory.title, memory.description);
        setMemory({
            title:"",
            description:""
        });
        
    }
    return (
        <div>
            <form>
                <input name="title" onChange={handleChange} value={memory.title}  placeholder="Title" />
                <textarea name="description" onChange={handleChange} value={memory.description} placeholder="Enter Memory..." rows="3"/>
                <button onClick={submitMemory} >Add</button>
            </form>
        </div>
    );
}

export default CreateArea;