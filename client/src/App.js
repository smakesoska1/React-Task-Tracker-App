import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
 import "./index.css";
 import Auth from "./components/Auth";
 import { useEffect,useState } from "react";

const App = ()=> {
  const userEmail="sara_mdz@gmail.com";
  const [tasks,setTasks]= useState(null);

  const authToken=false;

  const getData=async()=>{
    try{
      const response=await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`);
      const json=await response.json();
      setTasks(json); 
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    if(authToken){
      getData();
    }
  },[]);
   
  console.log(tasks);

  //sort tasks by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a) - new Date(b)) || [];

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken && 
      <>
      <ListHeader listName={'📝TO DO LIST'} getData={getData}/>
      {sortedTasks?.map((task)=> <ListItem key={task.id} task={task} getData={getData}/>) }
      </>
      }
    </div>
  );
}

export default App;
