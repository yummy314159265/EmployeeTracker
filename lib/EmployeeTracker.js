import inquirer from 'inquirer';
import chalk from 'chalk';
import { Query } from './Query.js';

class EmployeeTracker {

     constructor (db) {
          this.db = db;
          this.query = new Query(this.db);
     }

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
     ];

     static mainMenu = [
          {
               type: `list`,
               message: `What would you like to do?`,
               name: `main`,
               choices: EmployeeTracker.mainMenuChoices
          }
     ];

     static departmentMenuChoices = [
          `by IDs`,
          `by Budget Totals`,
          `Go Back`
     ];

     static departmentMenu = [
          {
               type: `list`,
               message: `View:`,
               name: `view`,
               choices: EmployeeTracker.departmentMenuChoices
          }
     ];

     static employeeMenuChoices = [
          `Show all info`,
          `by Manager`,
          `by Department`,
          `Go Back`
     ];

     static employeeMenu = [
          {
               type: `list`,
               message: `View:`,
               name: `view`,
               choices: EmployeeTracker.employeeMenuChoices
          }
     ];

     static addDepartmentPrompt = [
          {
               type: 'input',
               message: 'What is the name of the department?',
               name: 'name',
               validate: val => val.length > 0
          }
     ];

     static addRolePrompt = [
          {
               type: 'input',
               message: 'What is the title?',
               name: 'name',
               validate: val => val.length > 0
          },
          {
               type: 'input',
               message: 'What is the salary?',
               name: 'salary',
               validate: val => val.length > 0
          },
          {
               type: 'input',
               message: 'What is the department?',
               name: 'department',
               validate: val => val.length > 0
          },
     ];

     static addEmployeePrompt = [
          {
               type: 'input',
               message: 'What is the employee\'s first name?',
               name: 'first',
               validate: val => val.length > 0
          },
          {
               type: 'input',
               message: 'What is employee\'s last name?',
               name: 'last',
               validate: val => val.length > 0
          },
          {
               type: 'input',
               message: 'What is the title?',
               name: 'role',
               validate: val => Number.isInteger(val)
          },
          {
               type: 'input',
               message: 'Who is the employee\'s supervisor?',
               name: 'manager'
          }
     ];

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
               this.displayDepartmentMenu();
          }

          if (choice.main === viewRole) {
               this.query.displayRoles();
               this.displayMainMenu();
          }

          if (choice.main === viewEmp) {
               this.displayEmployeeMenu();
          }

          if (choice.main === addDep) {
               this.addDepartment();
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
     }

     async displayDepartmentMenu () {
          const choice = await inquirer.prompt(EmployeeTracker.departmentMenu);

          const [
               byID,
               byBudget,
               back
          ] = EmployeeTracker.departmentMenuChoices;

          console.log(byID, byBudget, back, choice.view);

          if (choice.view === byID) {
               this.query.displayDepartments();
               this.displayMainMenu();
          }

          if (choice.view === byBudget) {
               this.query.displayDepartmentsByBudget();
               this.displayMainMenu();
          }

          if (choice.view === back) {
               this.displayMainMenu();
          }
     }

     async displayEmployeeMenu () {
          const choice = await inquirer.prompt(EmployeeTracker.employeeMenu);

          const [
               showAll,
               byManager,
               byDepartment,
               back
          ] = EmployeeTracker.employeeMenuChoices;

          if (choice.view === showAll) {
               this.query.displayEmployees();
               this.displayMainMenu();
          }

          if (choice.view === byManager) {
               this.query.displayEmployeesByManager();
               this.displayMainMenu();
          }

          if (choice.view === byDepartment) {
               this.query.displayEmployeesByDepartment();
               this.displayMainMenu();
          }

          if (choice.view === back) {
               this.displayMainMenu();
          }
     }

     async addDepartment () {
          const answer = await inquirer.prompt(EmployeeTracker.addDepartmentPrompt);
          this.query.addDepartment(answer.name.trim());
          this.displayMainMenu();
     }

     // TODO: 
     // addRole()
     // addEmployee()
     // deleteEtc..
     // updateEmployee()

     displayUpdateEmployeeMenu () {
          this.query.displayEmployees();
     }

     init () {
          this.displayWelcome();
          this.displayMainMenu();
     }
}

export { EmployeeTracker }