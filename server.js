const inquirer = require('inquirer')
const db = require('./db/connections')

//inquirer questions
const questions = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please chose an action",
            choices: ["View all employees", "Add employee", "Update Employee role", "View all roles", "Add Role", "View all departments", "Add Department","Exit"]
        }
    ])
        .then(data => {
            console.log(data)
            if (data.action === "View all departments") {
                dataFromDepartments()
            }if (data.action === "View all employees") {
                dataFromEmployees()
            }if (data.action === "View all roles") {
                dataFromRole()
            }if (data.action === "Add employee") {
                addNewEmployee()

//View all departments
const dataFromDepartments = () => {
    db.query(`SELECT id AS value, name FROM department`, (err, data) => {
        if (err) throw err
        console.table(data)

    });
}

//view all employees
const dataFromEmployees = () => {
    db.query(`SELECT id AS value, name FROM employee`, (err, data) => {
        if (err) throw err
        console.table(data)

    });
}
//view all roles
const dataFromRole = () => {
    db.query(`SELECT id AS value, name FROM role`, (err, data) => {
        if (err) throw err
        console.table(data)

    });
}
//add new employee
const addNewEmployee = () => {
    const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'role',
        'manager'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO employee(first_name, last_name, role, manager) VALUES(?,?,?,?)`;
    const params = [
        body.first_name,
        body.last_name,
        body.role,
        body.manager
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
};

//update an employees role

const updateEmployeeRole = () => {
    const errors = inputCheck(req.body, 'department_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `UPDATE employee SET role_id =?
                WHERE id= ?`;
    const params = [req.body.party_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }

    });
};
questions()
}
};