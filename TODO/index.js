const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define an array to store tasks (in-memory storage for this example)
const tasks = [];


// Route to display tasks on the home page
app.get('/', (req, res) => {
    res.render('index', { tasks }); // Render the 'index.ejs' template and pass the 'tasks' array
  });
  

// Route to handle task creation
app.post('/create-task', (req, res) => {
    const { taskName } = req.body; // Assuming the form field is named 'taskName'
    
    // Add the new task to the 'tasks' array (example task structure: { name: 'Task Name', completed: false })
    tasks.push({ name: taskName, completed: false });
  
    // Redirect the user back to the home page
    res.redirect('/');
  });
  // Route to handle task completion
app.post('/complete-task/:taskId', (req, res) => {
    const taskId = req.params.taskId;
  
    // Find the task by ID (you should modify this part to match your data structure)
    const task = tasks.find(task => task._id === taskId);
  
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }
  
    // Toggle the task's completion status
    task.completed = !task.completed;
  
    res.json({ success: true, message: 'Task updated successfully' });
  });
  
// Listen on a port (e.g., 3000)
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
