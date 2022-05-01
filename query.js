import chalk from 'chalk';
import 'console.table';

class Query {
    constructor (db) {
        this.db = db;
    }

    query (sql, tableName, ...params) {
        this.db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
    
            console.table(tableName, result);
        })
    }

    getDepartments () {
        const sql = `SELECT * from department`;
        this.query(sql, 'Departments');
    }

    getRoles () {
        const sql = `SELECT * from role`;
        this.query(sql, 'Roles');
    }

    getEmployees () {
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
            department ON role.department_id = department.id;`
        
        this.query(sql, 'Employees');
    }
}

export { Query }