const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app=express();

app.use(cors());
app.use(express.static('my-react-app/build'));
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user: 'root',
    password: 'root',
    database:'db'
})

app.get('/users', (req,res)=>{
    const sql =  "SELECT * FROM user";

    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const sql = `SELECT * FROM user WHERE User_Id = ${userId}`;
    
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(data[0]);
    });
  });



  app.put('/users/:userId/edit', (req, res) => {
    const userId = req.params.userId;
    const updatedData = req.body;
    console.log('Received userId:', userId);
  
    const sql =
      'UPDATE user SET Username = ?, Email = ?, Password = ?, Role = ?, Language = ?, Profile_Picture = ? WHERE User_Id = ?';
  
    const values = [
      updatedData.Username,
      updatedData.Email,
      updatedData.Password,
      updatedData.Role,
      updatedData.Language,
      updatedData.Profile_Picture,
      userId,
    ];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Assuming result.affectedRows tells us how many rows were affected
      if (result.affectedRows > 0) {
        // Task updated successfully
        res.json({ success: true });
      } else {
        // No task found with the provided taskId
        res.status(404).json({ error: 'User not found' });
      }
    });
  });

app.get('/tasks', (req,res)=>{
    const sql =  "SELECT * FROM task";

    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});


app.get('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    console.log(taskId);
    const sql = `SELECT * FROM task WHERE Task_Id = ${taskId}`;
    
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.json(data[0]);
    });
  });


  app.put('/tasks/:taskId/edit', (req, res) => {
    const taskId = req.params.taskId;
    const updatedTaskData = req.body;
  
    const sql =
      'UPDATE task SET Title = ?, Description = ?, Priority = ?, Category_Id = ?, Is_Finished = ? WHERE Task_Id = ?';
  
    const values = [
      updatedTaskData.Title,
      updatedTaskData.Description,
      updatedTaskData.Priority,
      updatedTaskData.Category_Id,
      updatedTaskData.Is_Finished,
      taskId,
    ];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Assuming result.affectedRows tells us how many rows were affected
      if (result.affectedRows > 0) {
        // Task updated successfully
        res.json({ success: true });
      } else {
        // No task found with the provided taskId
        res.status(404).json({ error: 'Task not found' });
      }
    });
  });


  app.post('/tasks/add', (req, res) => {
    const newTaskData = req.body;
  
    const sql =
      'INSERT INTO task ( Task_Id, Title, Description, Priority, Category_Id, Deadline, Is_Finished) VALUES (?, ?, ?, ?, ?, ?, false)';
  
    const values = [
      newTaskData.Task_Id,
      newTaskData.Title,
      newTaskData.Description,
      newTaskData.Priority,
      newTaskData.Category_Id,
      newTaskData.Deadline
    ];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Assuming result.affectedRows tells us how many rows were affected
      if (result.affectedRows > 0) {
        // Task added successfully
        res.json({ success: true });
      } else {
        // Task not added
        res.status(500).json({ error: 'Failed to add task' });
      }
    });
  });

app.get('/categories', (req,res)=>{
    const sql =  "SELECT * FROM category";

    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get('/categories/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    console.log('categoryid' + categoryId);
    const sql = `SELECT * FROM category WHERE Category_Id = ${categoryId}`;
    
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
      return res.json(data[0]);
    });
  });

  app.put('/categories/:categoryId/edit', (req, res) => {
    const categoryId = req.params.categoryId;
    const updatedData = req.body;
    console.log('Received userId:', categoryId);
  
    const sql =
      'UPDATE category SET Name = ?, Description = ? WHERE Category_Id = ?';
     
    const values = [
      updatedData.Name,
      updatedData.Description,
      categoryId,
    ];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Assuming result.affectedRows tells us how many rows were affected
      if (result.affectedRows > 0) {
        // Task updated successfully
        res.json({ success: true });
      } else {
        // No task found with the provided taskId
        res.status(404).json({ error: 'Category not found' });
      }
    });
  });

app.get('/assignedUsers', (req,res)=>{
    const sql =  "SELECT * FROM assigneduser";
    
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});



app.get('/assignedUsers/:assignedId', (req, res) => {
    const assignedId = req.params.assignedId;
    const sql = `SELECT * FROM assigneduser WHERE AssigedUser_Id = ${assignedId}`;
    
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) {
        return res.status(404).json({ message: 'Assigned User not found' });
      }
      return res.json(data[0]);
    });
  });

app.listen(5000, ()=>{
    console.log("listening on port 5000");
});