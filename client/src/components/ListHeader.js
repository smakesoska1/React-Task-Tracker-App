const ListHeader = ({listName})=> {
  const signOut=()=>{
    console.log("signout");
  }
    return (
      <div className="list-header">
       <h1>{listName}</h1>
       <div className="button-container">
        <button className="create-button">ADD NEW</button>
        <button className="sign-out" onClick={signOut}>SIGN OUT</button>
        
       </div>
      </div>
    );
  }
  export default ListHeader;
  