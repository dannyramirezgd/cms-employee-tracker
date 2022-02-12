const inquirer = require('inquirer');
const cTable = require('console.table');
const Organization = require('./lib/Organization');


const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const init = async () => {
    console.log (`Please indicate desired request`);

    const request = await inquirer.prompt({
        type:'list',
        name:'options',
        message:'Select an option',
        choices: [
            'GET all departments',
            'GET all roles',
            'GET all employees',
            'GET all employees by Manager',
            'GET all employees by department',
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
    console.log(option)
    switch (option) {
        case 'GET all departments':
            const [department] = await Organization.getFromDatabase('department');
            console.table(department);
            break;
        case 'GET all roles':
            const [roles] = await Organization.getFromDatabase('roles')
            console.table(roles);
            break;
        case 'GET all employees':
            const [employees] = await Organization.getFromDatabase('employees')
            console.table(employees);
            break;
        default:
            console.log('Try again');
            break;
    }
    await sleep();
    init();
}

init();