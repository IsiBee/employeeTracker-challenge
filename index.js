const connection = require('./db/database');
const inquirer = require('inquirer');
const cTable = require('console.table');

const { viewDepartments, addDepartment } = require('./lib/departments');
const { viewRoles, addRole } = require('./lib/roles');
const { viewEmployees, addEmployee, updateEmployee } = require('./lib/employees');

const viewDB = require('./db/viewDB');


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
                    console.table(rows);
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
                addNewDept();
            }
            if (nextAction === 5) {
                addNewRole();
            }
            if (nextAction === 6) {
                addNewEmployee();
            }
            if (nextAction === 7) {
                updateEmployeeRole();
            }
        });

};

addNewDept = function () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Enter a name for your new department: '
        }
    ])
        .then(newName => {
            const newDept = newName.deptName;
            addDepartment(newDept);
        })
};

addNewRole = function () {
    let deptArray = [];
    viewDepartments().then((depts) => {
        for (var i = 0; i < depts.length; i++) {
            deptArray.push(depts[i].name);
        }
        return depts;
    }).then(rows => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Enter a name for your new role: '
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the salary for this new role: $'
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'Select the department for this role: ',
                choices: deptArray
            }
        ]).then(responseType => {
            let deptId;

            for (var i = 0; i < rows.length; i++) {
                if (responseType.roleDepartment == rows[i].name) {
                    deptId = rows[i].id;
                    console.log(deptId);
                }
            }
            addRole(responseType.roleName, responseType.roleSalary, deptId);
        });
    });
};

addNewEmployee = function () {

}




employmentTracker();