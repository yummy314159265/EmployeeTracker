INSERT INTO department (name)
VALUES  ('Sales'),
        ('R&D'),
        ('Customer Service'),
        ('Management');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Lead', 120000.21, 1),
        ('VP', 1032000.23, 4),
        ('Engineer', 63000.58, 2),
        ('Customer Service Rep', 32123.45, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Charlie', 'Murphy', 2, NULL),
        ('Elon', 'Musk', 3, 1),
        ('Johnny', 'Depp', 4, 2),
        ('Bill', 'Gates', 1, NULL);