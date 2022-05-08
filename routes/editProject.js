const db = require("../database");
const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  db.query(
    // `SELECT * FROM project_info.projects_table WHERE project_id = ${req.params.id}`,
    `SELECT date_format(project_due_dt, '%Y-%m-%d')  AS project_due_dt, project_tittle, project_description FROM project_info.projects_table WHERE project_id = ${req.params.id}`,
 function (err, rows) {
      if (err) {
        res.send(err);
      } else {
        res.render("projectEdit_template", {
          tittle: `${rows[0].project_tittle}`,
          project: rows[0]
        });
      }
    }
  );
});

router.post("/:id", (req, res, next) => {

    let edit = [req.body, req.params.id];
    db.query(
      `UPDATE projects_table SET ? WHERE project_id = ?`,
      edit,
      (err, results) => {
        res.redirect("/projects");
      }
    );
  });

module.exports = router;
