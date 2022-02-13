const inquirer = require('inquirer');
const cTable = require('console.table');
const viewFromDatabase = require('./lib/viewRequests')
const { addToDatabase, deleteFromDatabase } = require('./lib/crudRequests')


const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

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
            'Create a new department',
            'Create a new role',
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
            break;
        case 'View all employees by department':
            const [emplyByDept] = await viewFromDatabase('emplyByDept');
            console.table(emplyByDept);
            break;
        case 'Create a new department':
            await addToDatabase('addToDepartment')
            break;
        case 'Create a new role':
            await addToDatabase('newRole')
            break;
        default:
            console.log('Try again');
            break;
    }
    await sleep();
    init();
}

init();