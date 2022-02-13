const db = require("../db/connection")

const getBudget = () => {
    return db.promise().query(`SELECT department.department_name as Department, COUNT(1) as 'Employees per Dept', SUM(roles.salary) AS budget
    FROM employee
    LEFT JOIN roles on employee.role_id = roles.role_id
    LEFT JOIN department ON roles.department_id = department.department_id
    GROUP BY department.department_id;`)
}

module.exports = getBudget