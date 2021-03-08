const connection = require('../db/database');
const cTable = require('console.table');
const viewDB = require('../db/viewDB');
const addDB = require('../db/addDB');

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
    const params = [empRole, empID];
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const query = connection.query(sql, params, function (err, res) {
        if (err) throw err;
        console.log(res);
    });
    console.log(query);
};

module.exports = {
    viewEmployees,
    addEmployee,
    updateEmployee
};