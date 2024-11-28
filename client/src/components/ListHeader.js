import Modal from "./Modal";
import { useState } from "react";

const ListHeader = ({listName, getData})=> {
  const[showModal,setShowModal]=useState(false);
  const signOut=()=>{
    console.log("signout");
  }
    return (
      <div className="list-header">
       <h1>{listName}</h1>
       <div className="button-container">
        <button className="create-button" onClick={()=>setShowModal(true)}>ADD NEW</button>
        <button className="sign-out" onClick={signOut}>SIGN OUT</button>
        
       </div>
       {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>}
      </div>
    );
  }
  export default ListHeader;
  