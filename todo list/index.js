const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios'); // Import the axios library
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const dbUrl = "mongodb://127.0.0.1:27017/todolistDB";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const taskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    category: String,
});

const Task = mongoose.model('Task', taskSchema);

app.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.render('index', { tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/work-tasks', (req, res) => {
    Task.find({ category: 'work' }).lean().exec()
        .then(workTasks => {
            res.render('work-tasks', { workTasks });
        })
        .catch(err => {
            console.error('Error fetching work tasks:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/add-multiple-tasks', async (req, res) => {
    const tasksToAdd = [
        { name: 'Task 1', completed: false, category: 'work' },
        { name: 'Task 2', completed: true, category: 'personal' },
        // Add more tasks as needed
    ];

    try {
        const response = await axios.post('http://localhost:3000/add-multiple-tasks', tasksToAdd);
        console.log('Tasks added to the database:', response.data);
        res.send('Tasks added successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to add tasks to the database');
    }
});

app.post('/add-task', async (req, res) => {
    // Handle the POST request to add a task to the database here
    // You can access the data sent in the request body using req.body

    try {
        // Create a new task and save it to the database
        const newTask = new Task({
            name: req.body.name, // Updated to req.body.name
            completed: false,
            category: req.body.category,
        });

        await newTask.save();

        res.send('Task added successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to add the task to the database');
    }
});



app.post('/complete-task/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId).lean().exec();
        if (!task) {
            res.status(404).send('Task not found');
            return;
        }

        task.completed = !task.completed;

        await Task.findByIdAndUpdate(taskId, { completed: task.completed });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
