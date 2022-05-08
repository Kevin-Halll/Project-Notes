const db = require('../database');
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    // res.send('test message')
    db.query(`SELECT * FROM project_info.projects_table pt, project_info.project_notes pn 
    WHERE pt.project_id = pn.project_id`, 
    (err, rows) => {
        res.render('noteTable_template', {
            tittle: 'Notes Table',
            notes: rows
        })
    });
})

module.exports = router