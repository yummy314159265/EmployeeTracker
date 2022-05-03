INSERT INTO department (name)
VALUES  ('Executive'),
        ('Sales'),
        ('R&D'),
        ('Customer Service'),
        ('Management'),
        ('HR'),
        ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES  ('VP', 1000000, 1),
        ('Sales Lead', 100000, 2),
        ('Engineer', 80000, 3),
        ('Customer Service Rep', 30000, 4),
        ('Receptionist', 35000, 4),
        ('Manager', 60000, 5),
        ('Hiring Manager', 55000, 6),
        ('Recruiter', 30000, 6),
        ('Telemarketer', 40000, 7),
        ('Graphic Designer', 70000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Daria', 'Sloan', 1, NULL),
        ('Edgar', 'Peacock', 2, 1),
        ('Liyana', 'Betts', 3, 2),
        ('Cherise', 'Collier', 4, 3),
        ('Florrie', 'Kearns', 5, 3),
        ('Bailey', 'Fleming', 6, 4),
        ('Devin', 'Martins', 7, 4),
        ('Sally', 'Nash', 8, 5),
        ('Oliwier', 'Berg', 9, 5),
        ('Rebecca', 'Hopper', 10, 5),
        ('Yannis', 'Quintero', 4, 6),
        ('Scarlet', 'Sawyer', 1, 6);
