import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
 import "./index.css";
 import Auth from "./components/Auth";
 import { useEffect,useState } from "react";
 import { useCookies } from "react-cookie";

const App = ()=> {
  const [cookies,setCookie, removeCookie]=useCookies(null);
  const userEmail=cookies.Email;
  const authToken=cookies.AuthToken;
  const [tasks,setTasks]= useState(null);



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
  },[authToken]);
   
  console.log(tasks);

  //sort tasks by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a) - new Date(b)) || [];

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken && 
      <>
      <ListHeader listName={'📝TO DO LIST'} getData={getData}/>
      <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks?.map((task)=> <ListItem key={task.id} task={task} getData={getData}/>) }
      </>
      }
    </div>
  );
}

export default App;
