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
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));

