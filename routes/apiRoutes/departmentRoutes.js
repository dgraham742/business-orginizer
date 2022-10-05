const express = require('express');
const router = express.Router();
const db=require('../../db/connections');

//get all departments
router.get('/department', (req,res)=> {
    const sql=`SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500). json({ error:err.message });
            return
        }
        res.json({
            message:'success',
            data:rows
        });
    });
});

//get a single party
router.get('/department/:id',(req,res)=> {
    const sql ='SELECT * FROM department WHERE id = ?';
    const params =[req.params.id];

    db.query(sql, params, (err,rows) => {
        if (err) {
            res.status(400).json({ error:err.message });
            return;
        }
        res.json({
            message:'success',
            data: rows
        });
    });
});
//delete a department
router.delete('/department/:id', (req,res)=> {
    const sql = `DELETE FROM department WHERE id =?`;

    db.query(sql,req)
})