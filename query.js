import chalk from 'chalk';
import 'console.table';

class Query {
    constructor (db) {
        this.db = db;
    }

    async query (sql, ...params) {
        try {
            return await this.db.promise().query(sql, params);
        } catch (err) {
            return console.error(err);
        }
    }

    async queryAndDisplay (sql, tableName, ...params) {
        const result = await this.query(sql, params);   
        console.table(tableName, result[0]);
    }

    displayDepartments () {
        const sql = `SELECT * from department`;
        this.queryAndDisplay(sql, 'Departments');
    }

    displayRoles () {
        const sql = `SELECT * from role`;
        this.queryAndDisplay(sql, 'Roles');
    }

    displayEmployees () {
        const sql = `
            SELECT 
                CONCAT(e.last_name, ', ', e.first_name) AS Name,
                e.id AS ID,
                CONCAT(m.last_name, ', ', m.first_name) AS Manager,
                e.manager_id AS "Manager ID",
                role.title AS Title,
                role.salary AS Salary,
                department.name AS Department
            FROM 
                employee e
            LEFT JOIN 
                employee m ON e.manager_id = m.id
            JOIN 
                role ON e.role_id = role.id
            JOIN 
                department ON role.department_id = department.id
            ORDER BY e.id;
        `;
        
        this.queryAndDisplay(sql, 'Employees');
    }

    addDepartment (name) {
        const sql = `INSERT INTO department (name) VALUES (?);`;

        this.query(sql, name);
        this.displayDepartments();
    }

    addRole (name, salary, department) {
        const sql = `
            INSERT INTO role (title, salary, department_id) 
            VALUES (?, ?, ?);
        `;

        this.query(sql, name, salary, department);
        this.displayRoles();
    }

    addEmployee (firstName, lastName, roleID, managerID) {
        const sql = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES (?, ?, ?, ?);
        `;

        this.query(sql, firstName, lastName, roleID, managerID);
        this.displayEmployees();
    }

    deleteDepartment (id) {
        const sql = `DELETE FROM department WHERE id = ?`;
        this.query(sql, id);
        this.displayDepartments();
    }

    deleteRole (id) {
        const sql = `DELETE FROM role WHERE id = ?`;
        this.query(sql, id);
        this.displayRoles();
    }

    deleteEmployee (id) {
        const sql = `DELETE FROM employee WHERE id = ?`;
        this.query(sql, id);
        this.displayEmployees();
    }

    updateEmployeeRole (employeeID, roleID) {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`;

        this.query(sql, roleID, employeeID);
        this.displayEmployees();
    }

    updateEmployeeManager (employeeID, managerID) {
        const sql = `UPDATE employee SET manager_id = ? WHERE id = ?;`;

        this.query(sql, managerID, employeeID);
        this.displayEmployees();
    }

    displayEmployeesByManager () {
        const sql = `            
            SELECT 
                CONCAT(m.last_name, ', ', m.first_name) AS Manager,
                m.id AS "Manager ID",
                CONCAT(e.last_name, ', ', e.first_name) AS Subordinate,
                e.id AS ID
            FROM employee m
            JOIN employee e
            ON m.id = e.manager_id
            ORDER BY e.manager_id;
        `;

        this.queryAndDisplay(sql, 'Employees by Manager');
    }

    displayEmployeesByDepartment () {
        const sql = `            
            SELECT 
                department.name AS Department,
                department.id AS "Department ID",
                CONCAT(employee.last_name, ', ', employee.first_name) AS Employee,
                employee.id AS "Employee ID"
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            ORDER BY department.id;
        `;

        this.queryAndDisplay(sql, 'Employees by Department');
    }

    displayDepartmentByBudget () {
        const sql = `
            SELECT
                SUM()

        `
    }
}

export { Query }