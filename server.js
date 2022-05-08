const db = require('./database');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash')
const session = require('express-session')

app.set('view engine', 'ejs');

// set where view files will be directed to
app.set('views', __dirname + '/views')
// set where layout files will be directed to
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// router imports
const indexRoute = require('./routes/indexRoute')
const projectsRoute = require('./routes/projectRoutes')
// const projectsEditRoute = require('./routes/editProject')
const formRoute = require('./routes/formRoute')
const notesRoute = require('./routes/addNotes')
const notesTable = require('./routes/notesTable')
const editRoute = require('./routes/editProject')

// express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect((err) => {
    if (!err) console.log("Connected to project database Successfully");
    else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
  });

// launch server on given port
app.listen(process.env.PORT || 8081)
let id = 2
app.get('/', (req, res) => {
    // db.query(`SELECT * FROM project_info.project_notes WHERE project_id = 2`, (err, rows) => {
    // db.query(`SELECT * FROM project_info.projects_table, project_info.project_notes`, (err, rows) => {
    db.query(`SELECT * FROM project_info.projects_table WHERE project_id = ${req.params.id}`, (err, rows) => {
        res.send(rows)
    })
})
app.use('/home', indexRoute)
app.use('/projects', projectsRoute)
app.use('/delete-project', projectsRoute)
// app.use('/edit-project', projectsEditRoute)
app.use('/edit-project', editRoute)
app.use('/project/edit', editRoute) //edit route

app.use('/create-project', formRoute)
app.use('/project/add', formRoute)
app.use('/project-notes', notesRoute)
app.use('/add-notes', notesRoute)
app.use('/notes', notesTable)