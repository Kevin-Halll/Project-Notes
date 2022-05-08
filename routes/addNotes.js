const db = require('../database');
const express = require('express')
const router = express.Router()


router.get('/:id', (req, res) => {
    // db.query(`SELECT * FROM project_info.projects_table, project_info.project_notes WHERE project_id = ${req.params.id}`, function(err, rows) {
    db.query(`SELECT * FROM project_info.projects_table pt JOIN project_info.project_notes pn ON pt.project_id = pn.project_id`, function(err, rows) {
        if (err) {
            res.send(err)
            // req.flash()
        } 
        else {
            res.render('addNotes_template', {
            tittle : `${rows[0].project_tittle}`,
            project: rows[0]
        })
        }
        // res.send(rows)
    })
    // res.render('addNotes_template')
})

router.post('/', (req, res) => {

        let data = [
            req.body,
            req.body.project_id
        ]
    
            let sql = "UPDATE project_notes SET ? WHERE project_id = ?" 
            db.query(sql, data, (err, results) => {
                if (err) throw err;
                // alert('Project added')
                res.redirect('/projects')
                // res.send('notes added')
                // res.send(JSONResponse(results));
            })
})




module.exports = router