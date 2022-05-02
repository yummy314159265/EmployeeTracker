import inquirer from 'inquirer';
import chalk from 'chalk';
import { Query } from './Query.js';

class EmployeeTracker {

     constructor (db) {
          this.db = db;
          this.query = new Query(this.db);
     }

     static mainMenuChoices = [
          `View Departments`,
          `View Roles`,
          `View Employees`,
          `Add a Department`,
          `Add a Role`,
          `Add an Employee`,
          `Delete a Department`,
          `Delete a Role`,
          `Delete an Employee`,
          `Update an Employee`,
          `Quit`,
          new inquirer.Separator()
     ]

     static mainMenu = [
          {
               type: `list`,
               message: `What would you like to do?`,
               name: `main`,
               choices: EmployeeTracker.mainMenuChoices
          }
     ]

     static welcomeMessage = `


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
     `;

     quit () {
          this.db.end();
          process.exit(0);
     }

     displayWelcome () {
          console.log(EmployeeTracker.welcomeMessage);
     }

     async displayMainMenu () {
          const choice = await inquirer.prompt(EmployeeTracker.mainMenu);
          
          const [
               viewDep, 
               viewRole, 
               viewEmp, 
               addDep, 
               addRole, 
               addEmp, 
               delDep, 
               delRole, 
               delEmp, 
               updEmp,
               quit
          ] = EmployeeTracker.mainMenuChoices;

          if (choice.main === viewDep) {
               this.query.displayDepartments();
          }

          if (choice.main === viewRole) {
               this.query.displayRoles();
          }

          if (choice.main === viewEmp) {
               this.query.displayEmployees();
          }

          if (choice.main === addDep) {
               this.query.addDepartment('test');
          }

          if (choice.main === addRole) {
               this.query.addRole('test', 1000, 1);
          }

          if (choice.main === addEmp) {
               this.query.addEmployee('test', 'test', 1, 1);
          }

          if (choice.main === delDep) {
               this.query.deleteDepartment(10);
          }

          if (choice.main === delRole) {
               this.query.deleteRole(10);
          }

          if (choice.main === delEmp) {
               this.query.deleteEmployee(12);
          }

          if (choice.main === updEmp) {
               this.displayUpdateEmployeeMenu();
          }

          if (choice.main === quit) {
               this.quit();
          }

          this.displayMainMenu();
     }

     displayUpdateEmployeeMenu () {
          this.query.displayEmployees();
     }

     init () {
          this.displayWelcome();
          this.displayMainMenu();
     }
}

export { EmployeeTracker }