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
        console.log(depts);
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
    let roleArray = [];
    let managerArr = [];
    viewRoles().then(roles => {
        for (var i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
        }
        console.log(roles);
        return (roles);
    }).then(roles => {
        viewEmployees().then(employees => {
            for (var i = 0; i < employees.length; i++) {
                managerArr.push(`${employees[i].first_name} ${employees[i].last_name}`);
            }
            console.log(employees);
            return [roles, employees];
        })
            .then(([roles, employees]) => {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'empFName',
                        message: "Enter employee's first name: "
                    },
                    {
                        type: 'input',
                        name: 'empLName',
                        message: "Enter employee's last name: "
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: "Select the employee's role: ",
                        choices: roleArray
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Select the employee's manager: ",
                        choices: managerArr
                    }

                ]).then(responseType => {
                    let roleId;
                    for (var i = 0; i < roles.length; i++) {
                        if (responseType.role == roles[i].title) {
                            roleId = roles[i].id;
                            console.log(roleId);
                        }
                    }

                    let managerId;

                    for (var i = 0; i < employees.length; i++) {
                        if (responseType.manager == `${employees[i].firstName} ${employees[i].lastName}`) {
                            managerId = employees[i].manager_id;
                            console.log(managerId);
                        }
                    }

                    addEmployee(responseType.empFName, responseType.empLName, roleId, managerId);
                })
            })
    });
};

employmentTracker();