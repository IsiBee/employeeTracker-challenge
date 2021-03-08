const connection = require('../db/database');
const cTable = require('console.table');
const viewDB = require('../db/viewDB');
const addDB = require('../db/addDB');

// Viewing all roles in the database
viewRoles = () => {
    console.log('Showing all roles...\n');
    return viewDB.viewAllRoles();
};

// Adding a role to the Database
addRole = (roleTitle, roleSalary, roleDept) => {
    console.log(`Adding ${roleTitle} to the tracker...\n`);
    return addDB.createRole(roleTitle, roleSalary, roleDept);
};

module.exports = {
    viewRoles,
    addRole
};

