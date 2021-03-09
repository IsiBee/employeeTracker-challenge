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
        mainMenu();
    })
};

mainMenu = async function () {
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
                viewDepartments().then(rows => {
                    console.table(rows);
                }).then(console.log('\n'))
                    .then(mainMenu);

            }
            if (nextAction === 2) {
                viewRoles().then(rows => {
                    console.table(rows);
                }).then(console.log('\n'))
                    .then(mainMenu);
            }
            if (nextAction === 3) {
                return viewEmployees().then(rows => {
                    console.table(rows);
                }).then(console.log('\n'))
                    .then(mainMenu);
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
            return addDepartment(newDept);
        })
        .then(mainMenu)

};

addNewRole = function () {
    let deptArray = [];
    viewDepartments().then(depts => {
        for (var i = 0; i < depts.length; i++) {
            deptArray.push(depts[i].name);
        }

        return depts;
    }).then(departments => {
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

            for (var i = 0; i < departments.length; i++) {
                if (responseType.roleDepartment == departments[i].name) {
                    deptId = departments[i].id;
                }
            }
            return addRole(responseType.roleName, responseType.roleSalary, deptId);
        })
            .then(mainMenu)
    });
};

addNewEmployee = function () {
    let roleArray = [];
    let managerArr = [];
    viewRoles().then(roles => {
        for (var i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
        }
        return (roles);
    }).then(roles => {
        viewEmployees().then(employees => {
            for (var i = 0; i < employees.length; i++) {
                managerArr.push(`${employees[i].first_name} ${employees[i].last_name}`);
            }
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
                        }
                    }

                    let managerId;
                    for (var i = 0; i < employees.length; i++) {
                        if (responseType.manager === `${employees[i].first_name} ${employees[i].last_name}`) {
                            managerId = employees[i].id;
                        }
                    }

                    return addEmployee(responseType.empFName, responseType.empLName, roleId, managerId);
                })
                    .then(mainMenu)
            })
    });
};

updateEmployeeRole = function () {
    let roleArray = [];
    let empArr = [];
    viewRoles().then(roles => {
        for (var i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
        }
        return (roles);
    }).then(roles => {
        viewEmployees().then(employees => {
            for (var i = 0; i < employees.length; i++) {
                empArr.push(`${employees[i].first_name} ${employees[i].last_name}`);
            }
            return [roles, employees];
        })
            .then(([roles, employees]) => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Select the employee you wish to update: ',
                        choices: empArr
                    },
                    {
                        type: 'list',
                        name: 'newRole',
                        message: "Select your employee's new role: ",
                        choices: roleArray
                    }
                ])
                    .then(responseType => {
                        let roleId;
                        for (var i = 0; i < roles.length; i++) {
                            if (responseType.newRole === roles[i].title) {

                                roleId = roles[i].id;
                            }
                        }

                        let empId;

                        for (var i = 0; i < employees.length; i++) {
                            if (responseType.employee == `${employees[i].first_name} ${employees[i].last_name}`) {
                                empId = employees[i].id;
                            }
                        }
                        return updateEmployee(empId, roleId);
                    })
                    .then(mainMenu)
            });
    });
};

employmentTracker();
