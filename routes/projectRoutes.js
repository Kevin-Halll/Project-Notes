const db = require('../database');
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    // res.send('test message')
    db.query("SELECT * FROM project_info.projects_table", (err, rows) => {
        res.render('project_template', {
            tittle: 'Project Table',
            projects: rows
        })
    });
})

router.get('/:id', (req, res) => {
    db.query(`DELETE FROM project_info.projects_table WHERE project_id = ${req.params.id}`, (err, rows) => {
        
        if(err) {
            res.send(err)
        }else {
            res.redirect('/projects')
            // next()
        }
    })

})


module.exports = router