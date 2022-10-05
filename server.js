const inquirer = require('inquirer')
const db = require('./db/connections')

const questions =() => {
    return inquirer.prompt([
        {
            type:"list",
            name:"action",
            message:"Please chose an action",
            choices:["View all employees", "Add employee", "Update Employee role", "View all roles","Add Role", "View all departments", "Add Department"]
        }
    ])
    .then(data => {
        console.log(data)
        if(data.action==="View all departments"){
            dataFromDepartments()
        }
    })
}


const dataFromDepartments = () => {
    db.query(`SELECT id AS value, name FROM department`, (err, data) => {
        if (err) throw err
        console.table(data)

    });
}

const addNewEmployee = () =>{
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
};
questions();