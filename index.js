const inquirer = require('inquirer');
const cTable = require('console.table');
const Organization = require('./lib/Organization');
const db = require('./db/connection');
//const getFromDatabase = require('./lib/Organization');


const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));


const viewFromDatabase = table => {
    if(table === 'department'){
        return db.promise().query(`SELECT * FROM department`)
    } else if (table === 'roles') {
        return db.promise().query(
            `SELECT role_id as id, 
            role_name as 'Job Title', 
            salary, 
            department.department_name as 'Department Name'
            FROM roles
            LEFT JOIN department 
            ON roles.department_id = department.department_id`)
    } else if (table === 'employees') {
        return db.promise().query(
            `SELECT first_name as 'First Name',
            last_name as 'Last Name',
            roles.role_name as 'Job Title',
            department.department_name as 'Department Name',
            roles.salary as Salary,
            manager_id as Manager
            FROM employee
            LEFT JOIN roles
            ON employee.role_id = roles.role_id
            LEFT JOIN department
            ON roles.department_id = department.department_id
            `)
    } else if (table === 'managers'){
        return db.promise().query(
            `SELECT A.employee_id as id, 
            A.first_name as 'First Name', 
            A.last_name as 'Last Name', 
            roles.role_id as 'Job Title',
            roles.salary as Salary,
            department.department_name as Department,
            B.first_name as 'Manager First Name', 
            B.last_name as 'Manager Last Name'
            FROM employee A
            LEFT JOIN roles ON A.role_id = roles.role_id
            LEFT JOIN department ON roles.department_id = department.department_id
            LEFT JOIN employee B on A.manager_id = B.employee_id
            ORDER BY A.manager_id DESC;
        `)
    } else if (table === 'emplyByDept'){
        return db.promise().query(
            `SELECT employee.employee_id as id,
            employee.first_name as 'First Name',
            employee.last_name as 'Last Name',
            department.department_name as Department
            FROM employee
            LEFT JOIN roles ON employee.role_id = roles.role_id
            LEFT JOIN department ON roles.department_id = department.department_id
            ORDER BY department.department_id 

            `)
    }
}

const init = async () => {
    console.log (`Please indicate desired request`);

    const request = await inquirer.prompt({
        type:'list',
        name:'options',
        message:'Select an option',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'View all employees by Manager',
            'View all employees by department',
            'POST a department',
            'POST a role',
            'POST an employee',
            'PUT Employee Role',
            'DELETE department',
            'DELETE role',
            'DELETE employee',
            'View total budget by Department'
        ],
    });
    requestActions(request.options);
};

async function requestActions(option) {
    switch (option) {
        case 'View all departments':
            const [department] = await viewFromDatabase('department');
            console.table(department);
            break;
        case 'View all roles':
            const [roles] = await viewFromDatabase('roles');
            console.table(roles);
            break;
        case 'View all employees':
            const [employees] = await viewFromDatabase('employees');
            console.table(employees);
            break;
        case 'View all employees by Manager':
            const [managers] = await viewFromDatabase('managers');
            console.table(managers);
        case 'View all employees by department':
            const [emplyByDept] = await viewFromDatabase('emplyByDept');
            console.table(emplyByDept);
        default:
            console.log('Try again');
            break;
    }
    await sleep();
    init();
}

init();