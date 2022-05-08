const db = require('../database');
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    // res.send('test message')
    res.render('form_template')
})

router.post('/', (req, res) => {
    // let data = {
    //     project_tittle: req.body.project_tittle,
    //     project_description: req.body.project_description,
    //     project_start_dt: req.body.project_start_dt,
    //     project_due_dt: req.body.project_due_dt,
    // }

    // IF THE FORM INPUT NAMES === THE TABLE FIELD NAMES, THE FORM VALUES CAN BE CALLED AS "req.body" ///

    let sql = "INSERT INTO projects_table SET ?" 
    db.query(sql, req.body, (err, results) => {
        if (err) throw err;
        // alert('Project added')
        res.redirect('/projects')
        // res.send(JSONResponse(results));
    })
})

module.exports = router