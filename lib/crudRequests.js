const db = require('../db/connection');
const inquirer = require('inquirer');
const viewFromDatabase = require('../lib/viewRequests')

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
const addToDatabase = async item => {
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
    }
}

const deleteFromDatabase = async item => {
    console.log(item)
}

module.exports = { addToDatabase , deleteFromDatabase }