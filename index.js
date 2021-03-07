const connection = require('./db/database');
const inquirer = require('inquirer');
const cTable = require('console.table');

const { viewDepartments, addDepartment } = require('./lib/departments');
const { viewRoles, addRole } = require('./lib/roles');
const { viewEmployees, addEmployee, updateEmployee } = require('./lib/employees');

function employmentTracker() {
    connection.connect(err => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        mainMenu();
    })
};

mainMenu = function () {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menuSelect',
                message: 'What would you like to do?',
                choices: ['1: View all departments',
                    '2: View all roles',
                    '3: View all employees',
                    '4: Add a department',
                    '5: Add a role',
                    '6: Add an employee',
                    '7: Update an employee role']
            }
        ])
        .then(selectionType => {
            let nextAction = selectionType.menuSelect.split(':')[0];
            nextAction = parseInt(nextAction);
            if (nextAction === 1) {
                return viewDepartments().then(rows => {
                    console.log(rows);
                });
            }
            if (nextAction === 2) {
                return viewRoles().then(rows => {
                    console.table(rows[0]);
                });
            }
            if (nextAction === 3) {
                return viewEmployees().then(rows => {
                    console.table(rows[0]);
                });
            }
            if (nextAction === 4) {
                // new function for adding dept.
                addNewDept();
            }
            if (nextAction === 5) {
                // new function for adding role

            }
            if (nextAction === 6) {
                // new function for adding employee
            }
            if (nextAction === 7) {
                // new function for updating employee
            }
        });

};

addNewDept = function () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Enter a name for your new Department: '
        }
    ])
        .then(deptName => {
            addDepartment(deptName);
        })
};

employmentTracker();