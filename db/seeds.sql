INSERT INTO department (department_name)
VALUES
    ('Marketing'),
    ('Human Resources'),
    ('Finance'),
    ('Legal'),
    ('Information Technology');


INSERT INTO roles (role_name, department_id, salary)
VALUES
    ('Marketing Specialist', 1, 50000),
    ('Marketing research analyst', 1, 65000),
    ('Recruiter', 2, 55000),
    ('HR Manager', 2, 75000),
    ('Financial Advisor', 3, 100000),
    ('Accountant', 3, 150000),
    ('Junior Lawyer', 4, 100500),
    ('Senior Partner', 4, 250000),
    ('Entry Developer', 5, 80000),
    ('Senior Developer', 5, 95000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
-- these are the values inserted by the constructor based on input
    ('Bill', 'Jenkins', 1, 3),
    ('Andy', 'Lilo', 2, 3),
    ('Becky', 'Bouchard', 3, null),
    ('Ellen', 'Paige', 4, 6),
    ('Hughbert', 'Figsworth', 5, 6),
    ('Eleanor', 'Rigby', 6, null),
    ('Adam', 'Driver', 7, 9),
    ('Chris', 'Devine', 8, 9),
    ('Andrew', 'Filhouse', 9, null),
    ('John', 'Kennedy', 10, 9);
