import {useState} from 'react';


const Modal = ({mode,setShowModal,task,getData}) => {
 
  const editMode=mode==="edit" ? true: false;
  const[data,setData]=useState({
    user_email:editMode? task.user_email: 'sara_mdz@gmail.com',
    title:editMode? task.title: '',
    progress:editMode? task.progress: 50,
    date: editMode? task.date : new Date(),
  });

  const postData=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch('http://localhost:8002/todos/',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    });
   if(response.status===200){
    console.log('Radi');
    setShowModal(false);
    getData();
   }
    }catch(error){
      console.error(error);
    }
  }

  const editData=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`http://localhost:8002/todos/${task.id}`,{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
      })
      if(response.status===200){
        console.log('Update works!!');
        setShowModal(false);
        getData();
      }
    }catch(error){
      console.error(error);
    }
  }

 
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
            <input className={mode} type="submit" id="submit" onClick={editMode? editData:postData}/>
          </form>
        </div>    
      </div>
    );
  }
  
  export default Modal;
  