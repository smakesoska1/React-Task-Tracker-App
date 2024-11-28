import {useState} from 'react';


const Modal = ({mode,setShowModal}) => {
 
  const editMode=mode==="edit" ? true: false;
  const[data,setData]=useState({
    user_email:"",
    title:"",
    progress:"",
    date: editMode? "": new Date()
  });

 
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setData(data => ({
      ...data,
      [name]:value
    }))
    console.log(data);
  }
    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">   
          <h3>Let's {mode} your task</h3>
          <button onClick={()=>setShowModal(false)}>X</button>
          </div>

          <form>
            <input maxLength={30} placeholder=" Task name" value={data.title} name="title" required 
            onChange={handleChange}/>
            <br/>
            <label for="range">Drag to select your current progress</label>
            <input type ="range" id="range" min="0" max="100" 
            name="progress" value={data.progress} onChange={handleChange} required/>
            <input className={mode} type="submit" id="submit"/>
          </form>
        </div>    
      </div>
    );
  }
  
  export default Modal;
  