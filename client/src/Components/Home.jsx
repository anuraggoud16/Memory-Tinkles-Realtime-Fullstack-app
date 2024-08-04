import React, {useEffect, useState} from "react";
import Memory from "./Memory";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CreateArea from "./createArea";


function Home(){
  const location = useLocation();
  const { id } = location.state || {};
  const [memories, setMemories]=useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/fetch", { params: { username: id } });
      setMemories(res.data.memories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  async function addMemory(title, description){
    const res= await axios.post("http://localhost:3000/add",{id,title,description});
    if(res==="inserted"){
      console.log("inserted");
    }
    setMemories([]);
    fetchData();
  }

  async function deleteMemory(memid){
    console.log(memid)
    console.log(id)
    const res= await axios.post("http://localhost:3000/delete",{username:id, memid});
    if(res==="deleted"){
      setMemories([]);
      fetchData();
      console.log("deleted");
    }
  }

    return (
       <div>
        <div className="wishdiv">
        <h1 className="wish">Hi {id}, You look great today! </h1>
        </div>
        <CreateArea 
         onAdd={addMemory}
        />
        { memories.map( (memoryItem) => {
           return <Memory 
           key={memoryItem._id}
            id={memoryItem._id}
           title={memoryItem.title}
           description={memoryItem.description}
           onDelete={deleteMemory} />
        })}
       </div>
    )
}
 export default Home;