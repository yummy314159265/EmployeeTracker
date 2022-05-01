import mysql from 'mysql2';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { Query } from './query.js';

const welcomeMessage = `


                      /\\
___                  /  \\                  ___
/   \\     __        /    \\         __     /
/     \\   /  \\   _ / ${chalk.red(`<()>`)} \\   _   /  \\   /
     \\_/    \\_/ \\_/________\\_/ \\_/    \\_/
_________________/__I___I___\\________________
                /_I___I___I__\\
               /I___I___I___I_\\
              /___I___I___I___I\\
             /__I___I___I___I___\\
            /_I___I___I___I___I__\\
           /I___I___I___I___I___I_\\
          /___I___I___I___I___I___I\\
         /__I___I___I___I___I___I___\\
        /_I___I___I___I___I___I___I__\\ 
        
                  WELCOME TO
        
               EMPLOYEE TRACKER
`
const sqlConnect = {
    host: 'localhost',
    user: 'root',
    password: 'realpassword',
    database: 'employeetracker_db'
}

const init = () => {
    console.log(welcomeMessage);
    const db = mysql.createConnection(sqlConnect, console.log(`\n...connected to employee tracker database\n`));
    const dbQuery = new Query(db);
    dbQuery.displayEmployeesByDepartment();
    db.end();
}

init();