const connection = require('../db/database');
const cTable = require('console.table');
const viewDB = require('../db/viewDB');
const addDB = require('../db/addDB');
const updateDB = require('../db/updateDB');

// Viewing all employees in the database
viewEmployees = () => {
    console.log('Showing all employees...\n');
    return viewDB.viewAllEmployees();
};

// Adding an employee to the Database
addEmployee = (empFirstName, empLastName, empRole, empManager) => {
    console.log(`Adding ${empFirstName}${empLastName} to the tracker...\n`);
    return addDB.createEmployee(empFirstName, empLastName, empRole, empManager);
};

// Update an employee's role in the database
updateEmployee = (empID, empRole) => {
    console.log(`Updating employee role... \n`);
    return updateDB.changeEmployee(empID, empRole);
};

module.exports = {
    viewEmployees,
    addEmployee,
    updateEmployee
};