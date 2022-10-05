const express = require('express');
const router = express.Router();
const db = require('../../db/connections');
const inputCheck = require('../../utils/inputCheck');

//get all employees with department
router.get('/employees', (req, res) => {
    const sql = `SELECT employees. *, department.name
                  AS department_name
                  FROM employees
                  LEFT JOIN department
                  ON employees.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });

});
//get a single employee with department
router.get('/employee/:id',(req,res) => {
    const sql = `SELECT employee.*, department.name.
                 AS department_name
                 FROM employee
                 LEFT JOIN department
                 ON employee.department_id = department.id
                 WHERE employee.id =?`;
    const params =[req.params.id];

    db.query(sql,params, (err,row)=> {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message:'success',
            data:row
        });
    });
});
//create a new employee
router.post('/employee', ({ body }, res) =>{
    const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'role',
        'manager'
    );
    if (errors) {
        res.status(400).json({ error:errors });
        return;
    }

    const sql =`INSERT INTO employee(first_name, last_name, role, manager) VALUES(?,?,?,?)`;
    const params =[
        body.first_name,
        body.last_name,
        body.role,
        body.manager
    ];

    db.query(sql,params,(err,result)=> {
        if (err) {
            res.status(400).json({ error:err.message });
            return;
        }
        res.json({
            message:'success',
            data:body
        });
    });
});
//update an employees role
router.put('/employee/:id', (req,res) => {
    const errors = inputCheck(req.body, 'department_id');
    if (errors) {
        res.status(400).json({ error:errors });
        return;
    }
    const sql = `UPDATE employees SET role_id =?
                WHERE id= ?`;
    const params = [req.body.party_id, req.params.id];

    db.query(sql,params,(err,result) => {
        if (err){
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json ({
                message: 'Employee not found'
            });
        }else {
            res.json({
                message: 'success',
                data:req.body,
                changes:result.affectedRows
            });
        }
    });
});

//delete an employee
router.delete('/employee/:id', (req,res)=> {
    const sql =`DELETE FROM employees WHERE id =?`;

    db.query(sql, req.params.id, (err,result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message:"Employee not found"
            });
        }else {
            res.json({
                message:"Deleted",
                changes:result.affectedRows,
                id:req.params.id
            });
        }
    });
});
module.exports = router;