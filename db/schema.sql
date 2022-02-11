DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS salary;

CREATE TABLE department (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE salary (
    salary_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    salary_value INTEGER NOT NULL
);

CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    department_id INTEGER NOT NULL,
    salary_id INTEGER NOT NULL,
    FOREIGN KEY (salary_id) REFERENCES salary(salary_id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE employee (
    employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INTEGER NOT NULL,
    salary_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE,
    FOREIGN KEY (salary_id) REFERENCES salary(salary_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    manager VARCHAR(50)
);

