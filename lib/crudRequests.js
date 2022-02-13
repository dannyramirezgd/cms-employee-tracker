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
            err ? console.log('Error') : console.log('Success')
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
            err ? console.log('Error') : console.log('Success')
        })
    } else if (item === 'newEmployee') {
        //new employee creation
        const [roles] = await viewFromDatabase('roles')
        const roleList = roles.map(({id, Title}) => ({
            name: Title,
            value: id,
        }))
        const [managers] = await viewFromDatabase('isManager')
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
            err ? console.log('Error') : console.log('Success')
        })
    }
}
const updateEmployee = async () => {
    const [employees] = await viewFromDatabase('employeeUpdate')
    const employeeList = employees.map(({id, last_name, first_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }))
    const [roles] = await viewFromDatabase('roles')
    const roleList = roles.map(({id, Title}) => ({
        name: Title,
        value: id,
    }))
    const [managers] = await viewFromDatabase('isManager')
    const managerList = managers.map(({id, Name}) => ({
        name: Name,
        value: id,
    }))
    const request = await inquirer.prompt ([
        {
            type:'list',
            name: 'employee',
            message:'Which employee do you want to update?',
            choices: employeeList,
        },
        {
            type: 'list',
            name:'role',
            message: 'What is the new role of this employee?',
            choices: roleList
        },
        {
            type: 'confirm',
            name: 'isManager',
            message: 'Is the employee now a Manager?',
            default: true,
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
    const sql = `UPDATE employee SET role_id = ?, manager_id = ? WHERE employee_id = ?;`
    const params = [request.role, request.manager || null, request.employee]

    await db.promise().execute(sql, params, (err, result) => {
        err ? console.log('Error') : console.log('Success')
    })
}
const deleteFromDatabase = async item => {
    if (item === 'department'){
        const [departments] = await viewFromDatabase('department')
        const deptList = departments.map(({department_id, department_name}) => ({
            name: department_name,
            value: department_id,
        }));
        const request = await inquirer.prompt(
            {
                type:'list',
                name: 'department',
                message: 'Which department would you like to delete?',
                choices: deptList
            })
        
        const sql = `DELETE FROM department where department_id =?`
        const params = [request.department]

        await db.promise().execute(sql, params, (err, result) => {
            err ? console.log('Error') : console.log('Success')
        })
    } else if (item === 'role'){
        const [roles] = await viewFromDatabase('roles')
        const roleList = roles.map(({id, Title}) => ({
        name: Title,
        value: id,
        }))
        const request = await inquirer.prompt(
            {
                type:'list',
                name: 'role',
                message: 'Which role would you like to delete?',
                choices: roleList
            })
        
        const sql = `DELETE FROM roles where role_id =?`
        const params = [request.role]

        await db.promise().execute(sql, params, (err, result) => {
            err ? console.log('Error') : console.log('Success')
        })
    } else if (item === 'employee') {
        const [employees] = await viewFromDatabase('employeeUpdate')
        const employeeList = employees.map(({id, last_name, first_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        })) 
        const request = await inquirer.prompt(
            {
                type:'list',
                name: 'employee',
                message: 'Which employee would you like to delete?',
                choices: employeeList
            })
        
        const sql = `DELETE FROM employee where employee_id =?`
        const params = [request.employee]

        await db.promise().execute(sql, params, (err, result) => {
            err ? console.log('Error') : console.log('Success')
        })
    }
}

module.exports = { addToDatabase , deleteFromDatabase , updateEmployee }