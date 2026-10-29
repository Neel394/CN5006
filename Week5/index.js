
const express = require('express');
const fs= require('fs')
const app = express();

// Middleware for form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Hello! This is my first Express application.');
});

// Home URL route
app.get('/home', (req, res) => {
    res.send('Welcome to the Home page.');
});

// About route
app.get('/about', (req, res) => {
    res.send('Welcome to the About page.');
});

// Users, books and parameters route
app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params);
});

//for studen.json
app.get('/GetStudents', (req, res) => { 
    fs.readFile('./Students.json', 'utf8', (err, data) => { 
 
        if (err) { 
            return res.status(500).json({ 
                status: false, 
                statusCode: 500, 
                message: 'Error reading Students.json' 
            }); 
        } 
 
        res.status(200).json({ 
            status: true, 
            statusCode: 200, 
            requestedAt: new Date().toISOString(), 
            requestUrl: req.originalUrl, 
            requestMethod: req.method, 
            studentData: JSON.parse(data) 
        }); 
    }); 
});


app.get('/GetStudent/:id', (req, res) => { 
 
    console.log("GetStudent called"); 
 
    fs.readFile(__dirname + "/Students.json", "utf8", (err, data) => { 
 
        if (err) { 
            return res.status(500).json({ 
                status: false, 
                statusCode: 500,
                message: "Error reading Students.json" 
                 
            }); 
        } 
 
        const students = JSON.parse(data); 
        const student = students["Student" + req.params.id]; 
 
        console.log(student); 
 
        if (student) { 
            res.status(200).json(student); 
        } else { 
            res.status(404).json({ 
                status: false, 
                statusCode: 404, 
                message: "Student Not Found", 
                requestedAt: new Date().toISOString(), 
                requestUrl: req.originalUrl, 
                requestMethod: req.method 
            }); 
        } 
    }); 
}); 

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});