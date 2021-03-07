const viewDB = require('../db/viewDB');
const addDB = require('../db/addDB');
const cTable = require('console.table');

// Viewing all departments in the database
viewDepartments = () => {
    console.log('Showing all departments...\n');
    return viewDB.viewAllDepartments();
};

// Adding a department to the Database
addDepartment = (departmentName) => {
    console.log(`Adding ${departmentName} to the tracker...\n`);
    return addDB.createDepartment(departmentName);
};

module.exports = {
    viewDepartments,
    addDepartment
};

