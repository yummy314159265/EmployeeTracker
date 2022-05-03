import mysql from 'mysql2';
import { EmployeeTracker } from './lib/EmployeeTracker.js'

const init = () => {
    const sqlConnect = {
        host: 'localhost',
        user: 'root',
        password: '1013',
        database: 'employeetracker_db'
    }

    const db = mysql.createConnection(sqlConnect, console.log(`\n...connected to employee tracker database\n`));
    const employeeTracker = new EmployeeTracker(db);
    employeeTracker.init();
}

init();