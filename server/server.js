const PORT=process.env.PORT ?? 8002 //if PORT doesn't exist, use default PORT 8000
const express=require('express');
const {v4:uuidv4}=require('uuid');
const cors=require('cors')
const pool=require('./db.js');
const app=express();

app.use(cors());
app.use(express.json());

//get all TO DO TASKS

app.get('/todos/:userEmail',async(req,res)=>{
    
    const {userEmail}=req.params;
    console.log(userEmail);
    try{
       const todos = await pool.query('SELECT * FROM todos WHERE user_email=$1',[userEmail]);
       res.json(todos.rows);
    }catch(error){
        console.log(error);

    }

})


// create a new task

app.post('/todos',async(req,res)=>{
    const{user_email,title,progress,date}=req.body;
    const id=uuidv4();
    try{
        const newToDo=await pool.query(`INSERT INTO todos(id,user_email,title,progress,date) VALUES ($1,$2,$3,$4,$5)`,
            [id,user_email,title,progress,date]);
            res.json(newToDo);
    }catch(error){
        res.status(500).json({ error: 'Database error' });
    }
})

//update task

app.put('/todos/:id',async(req,res)=>{
    const {id}=req.params;
    const{user_email,title,progress,date}=req.body;
    try{
        const editToDo=await pool.query('UPDATE todos SET user_email=$1, title=$2, progress=$3, date=$4 WHERE id=$5;',
            [user_email,title,progress,date,id]);
            res.json(editToDo);
    }catch(error){
        console.error(error);
    }
});

//delete data

app.delete('/todos/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const deleteToDo=await pool.query("DELETE FROM todos WHERE id=$1",[id]);
        res.json(deleteToDo);
    }catch(error){
        console.error(error);
    }
})
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));

