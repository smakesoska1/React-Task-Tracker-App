import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
 import "./index.css";
 import { useEffect,useState } from "react";

const App = ()=> {
  const userEmail="sara_mdz@gmail.com";
  const [tasks,setTasks]= useState(null);
  const getData=async()=>{
    try{
      const response=await fetch(`http://localhost:8002/todos/${userEmail}`);
      const json=await response.json();
      setTasks(json); 
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=> getData, []);
  console.log(tasks);

  //sort tasks by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a) - new Date(b)) || [];

  return (
    <div className="app">
      <ListHeader listName={'📝TO DO LIST'} getData={getData}/>
      {sortedTasks?.map((task)=> <ListItem key={task.id} task={task} getData={getData}/>)}
    </div>
  );
}

export default App;
