const express = require('express');
const router =express.Router();
const db = require('../../db/connections');
const inputCheck = require('../../utils/inputCheck');

router.get('/employees',(req,res)=> {
    const sql = `SELECT employees. *, department.name
                  AS department_name
                  FROM employees
                  LEFT JOIN department
                  ON employees.department_id = department.id`;
})