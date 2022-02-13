const db = require('../db/connection');


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
            B.first_name as 'Manager First Name', 
            B.last_name as 'Manager Last Name'
            FROM employee A
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

module.exports = viewFromDatabase