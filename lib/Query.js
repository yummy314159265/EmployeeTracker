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

    async getDepartments () {
        const sql = `SELECT * FROM department`;
        const departments = await this.query(sql);
        return departments[0];
    }

    async getRoles () {
        const sql = `SELECT * FROM role`;
        const roles = await this.query(sql);
        return roles[0];
    }

    async getEmployees () {
        const sql = `SELECT * FROM employee`;
        const employees = await this.query(sql);
        return employees[0];
    }

    displayDepartments () {
        const sql = `
            SELECT 
                department.id,
                department.name AS Department
            FROM department
        `;
        this.queryAndDisplay(sql, '\n\n\nDepartments');
    }

    displayRoles () {
        const sql = `
            SELECT
                role.id,
                role.title AS Title,
                role.salary AS Salary,
                department.name AS Department 
            FROM role
            JOIN department ON department.id = role.department_id 
            ORDER BY role.id;
        `;
        this.queryAndDisplay(sql, '\n\n\nRoles');
    }

    displayEmployees () {
        const sql = `
            SELECT 
                e.id AS ID,
                CONCAT(e.last_name, ', ', e.first_name) AS Name,
                e.manager_id AS "Manager ID",
                CONCAT(m.last_name, ', ', m.first_name) AS Manager,
                role.title AS Title,
                e.role_id AS "Role ID",
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
        
        this.queryAndDisplay(sql, '\n\n\nEmployees');
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
                m.id AS "Manager ID",
                CONCAT(m.last_name, ', ', m.first_name) AS Manager,
                e.id AS ID,
                CONCAT(e.last_name, ', ', e.first_name) AS Subordinate
            FROM employee m
            JOIN employee e
            ON m.id = e.manager_id
            ORDER BY e.manager_id;
        `;

        this.queryAndDisplay(sql, '\n\n\nEmployees by Manager');
    }

    displayEmployeesByDepartment () {
        const sql = `            
            SELECT 
                department.id AS "Department ID",
                department.name AS Department,
                employee.id AS "Employee ID",
                CONCAT(employee.last_name, ', ', employee.first_name) AS Employee
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            ORDER BY department.id;
        `;

        this.queryAndDisplay(sql, '\n\n\nEmployees by Department');
    }

    displayDepartmentsByBudget () {
        const sql = `
            SELECT 
                department.id,
                department.name AS Department,
                SUM(role.salary) AS "Total Budget"
            FROM employee
            JOIN role ON role.id = employee.role_id
            JOIN department ON role.department_id = department.id
            GROUP BY department.id;
        `;
        this.queryAndDisplay(sql, '\n\n\nDepartment Budgets');
    }
}

export { Query }