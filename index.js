
// -------------------------setting up the express server
const express = require('express');
const port = 8000;
const app = express();



// --------------------------getting the established connection of the database and the schema
const db = require('./config/mongoose');
const Task = require('./models/taskDetails');  

const path = require('path');



// ------------------------setting up the engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// -------------------------setting up the middlewares and joining the static folder
app.use(express.urlencoded());
app.use(express.static('assets'));


// --------------------------root url of the application
app.get('/', function (req, res) {

    Task.find({}, function (err, tasks) {

        if (err) {
            console.log('error in fetching tasks from database');
            return;
        }
        return res.render("home", {
            title: "TODO APP",
            task_details: tasks,
        });
    });

});


// post method for creating a new document entry in the database using the form mentioned in home.ejs
app.post('/create-task', function (req, res) {

    // creating a task
    Task.create({
        TaskName: req.body.TaskName,
        date: req.body.date,
        category_type: req.body.category_type,
        marked: false,
        color: 'white'
    }, function (err, newTask) {

        if (err) {
            console.log('error in creating a contact');
            return;
        }
        
        // console.log('task created successfully');
        return res.redirect('back');
    });

});


//------------------------ deleting the task by using the id passed with the query
app.get('/delete-task', function (req, res) {

    let id = req.query.id;

    Task.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('Error in deleting an object from database');
            return;
        }

        return res.redirect('back');
    });
});


//----------------------- Delete all the completed tasks in one click
app.post('/delete-all-completed', function(req,res){
    
    Task.find({marked:true}, function (err, tasks) {

        if (err) {
            console.log('error in fetching tasks from database');
            return;
        }
        let completed_tasks = tasks;
        // console.log(completed_tasks.length);
        for( let ele=0;ele<completed_tasks.length;ele++){
            Task.findByIdAndDelete(completed_tasks[ele].id, function (err) {
                if (err) {
                    console.log('Error in deleting an object from database');
                    return;
                }   
            });
        }
        
        return res.redirect('back');
    });
})


app.get('/task-completed', function (req, res) {
    let id = req.query.id;
    Task.findById(id, function(err, docs){
        if(err){
            console.log(err);
            return;
        }
        let value= !docs.marked;  // inverting the value of the marked attribute
        
        Task.findByIdAndUpdate(id, {"marked": value} ,function (err, docs) {   // updating in the database
            if (err) {
                console.log(err);
                return;
            }
            
        });
        

        // changing the color attribute to reflect it in the background
        let color = 'white';
        if(value){
            color='#EFDCF9';
        }else{
            color='white';
        }

        Task.findByIdAndUpdate(id, {"color": color} ,function (err, docs) {  // updating in the databse
            if (err) {
                console.log(err);
                return;
            }
            
        });
    });
    

    res.redirect('back');
})

app.listen(port, function (err) {
    if (err) {
        console.log("Error in runnung the server");
        return;
    }

    console.log("Yup! my server is running on port", port);
});