INSERT INTO department (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('IT');

INSERT INTO salary (salary_value)
VALUES
    ('10000'),
    ('40000'),
    ('60000'),
    ('90000'),
    ('150000'),
    ('100000000');

INSERT INTO roles (role_name, department_id, salary_id)
VALUES
    ('Salesperson', 1, 1),
    ('Entry Engineer', 2, 2),
    ('Software Engineer', 2, 3),
    ('Lead Engineer', 2, 3),
    ('Lawyer', 4, 5),
    ('Financial Advisor', 3, 4),
    ('CFO', 3, 6),
    ('CEO', 1, 6),
    ('CIO', 2, 6),
    ('IT Help Desk', 5, 6);

INSERT INTO employee (first_name, last_name, role_id, department_id, salary_id, manager)
VALUES
-- these are the values inserted by the constructor based on input
    ('Bill', 'Jenkins', 1, 1, 1, null),
    ('Andy', 'Lilo', 2, 2, 2, null),
    ('Becky', 'Bouchard', 3, 2, 3, null),
    ('Ellen', 'Paige', 4, 2, 3, null),
    ('Hughbert', 'Figsworth', 5, 4, 5, null),
    ('Eleanor', 'Rigby', 6, 3, 4, null);
