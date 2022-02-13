const db = require("../db/connection");
const inquirer = require('inquirer');

// class Organization {
//     getFromDatabase(table){
//         if(table === 'department') {
//             return db.promise().query(`SELECT * FROM department`)
//         } else if (table === 'roles') {
//             return db.promise().query(`SELECT * FROM roles`)
//         } else if (table === 'employees') {
//             return db.promise().query(`SELECT * FROM employee`)
//         }
//     }
// }

// module.exports = new Organization; 

const getFromDatabase = table => {
    if(table === 'department'){
        return db.promise().query(`SELECT * FROM department`)
    } else if (table === 'roles') {
        return db.promise().query(`SELECT * FROM roles`)
    } else if (table === 'employees') {
        return db.promise().query(`SELECT * FROM employee`)
    }
}

//module.exports = getFromDatabase;