const db = require('../db/connection');
const inquirer = require('inquirer');
const viewFromDatabase = require('../lib/viewRequests')

//needed to do research on how to validate whether a response was a number rather than just a string
const validateNumbers = moreValidationChecks => ({
    validate: input => {
        if(input === ''){
            return 'Please provide a valid number greate than 0'
        }
        return moreValidationChecks ? moreValidationChecks(input) : true
    },
    filter: input => {
        return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
    }
})
//all create requests go through this function based on what is being created
const addToDatabase = async item => {
    //department creation
    if (item === 'addToDepartment') {
        const sql = `INSERT INTO department (department_name) VALUES (?)`
        const request = await inquirer.prompt({
            type:'input',
            name:'department',
            message:'What is the name of the Department you wish to add?'
        });
        return db.promise().execute(sql, [request.department], (err, result) => {
            if(err) {
                console.log('Error')
            } else {
                console.log('Success')
            }
        })
    } else if (item === 'newRole') {
        //new role creation
        const [departments] = await viewFromDatabase('department')
        const deptList = departments.map(({department_id, department_name}) => ({
            name: department_name,
            value: department_id,
        }));
        const sql = `INSERT INTO roles (role_name, department_id, salary) VALUES (?,?,?)`
        const request = await inquirer.prompt([
            {
                type:'input',
                name: 'role',
                message: 'What is the new Job Title?'
            },
            {
                type:'list',
                name: 'department',
                message: 'Which department will it be labeled as?',
                choices: deptList
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this position?',
                ...validateNumbers(),
            },
        ]);
        await db.promise().execute(sql, [request.role, request.department, request.salary], (err, result) => {
            if(err) {
                console.log('Error')
            } else {
                console.log('Success')
            }
        })
    } else if (item === 'newEmployee') {
        //new employee creation
        const [roles] = await viewFromDatabase('roles')
        const roleList = roles.map(({id, Title}) => ({
            name: Title,
            value: id,
        }))
        const [managers] = await viewFromDatabase('isManager')
        console.log(managers)
        const managerList = managers.map(({id, Name}) => ({
            name: Name,
            value: id,
        }))
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
        const request = await inquirer.prompt([
            {
                type:'input',
                name: 'first_name',
                message: 'What is the first name of the new employee?'
            },
            {
                type:'input',
                name: 'last_name',
                message: 'What is the last name of the new employee'
            },
            {
                type:'list',
                name: 'role',
                choices: roleList
            },
            {
                type:'confirm',
                name:'isManager',
                message: 'Is this employee a manager?',
                default: true
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Please select who this employee will report to',
                choices: managerList,
                when: ({isManager}) => {
                    return !isManager;
                }
            }
        ])
        await db.promise().execute(sql, [request.first_name, request.last_name, request.role, request.manager || null], (err, result) => {
            if(err) {
                console.log('Error')
            } else {
                console.log('Success')
            }
        })
    }
}

const deleteFromDatabase = async item => {
    console.log(item)
}

module.exports = { addToDatabase , deleteFromDatabase }