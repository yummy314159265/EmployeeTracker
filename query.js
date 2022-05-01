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

    async getDepartments () {
        const sql = `SELECT * from department`;

        try {
            return await this.query(sql);
        } catch (err) {
            console.error(err);
        }
    }

    async getRoles () {
        const sql = `SELECT * from role`;
        
        try {
            return await this.query(sql);
        } catch (err) {
            console.error(err);
        }
    }

    async getEmployees () {
        const sql = `SELECT * from employee`;
        
        try {
            return await this.query(sql);
        } catch (err) {
            console.error(err);
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
                department ON role.department_id = department.id;
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

    updateEmployee (employeeID, roleID) {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

        this.query(sql, roleID, employeeID);
        this.displayEmployees();
    }
}

export { Query }