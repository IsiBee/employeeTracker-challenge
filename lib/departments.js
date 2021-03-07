const connection = require('../db/database');

// Viewing all departments in the database
viewDepartments = () => {
    console.log('Showing all departments...\n');
    const query = connection.query(
        'SELECT * FROM departments;',
        [],
        function (err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
    console.log(query.rows);
};

// Adding a department to the Database
addDepartment = (departmentName) => {
    console.log(`Adding ${departmentName} to the tracker...\n`);
    const query = connection.query(
        'INSERT INTO departments (name) VALUES (?);',
        [departmentName],
        function (err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
    console.log(query);
};

module.exports = {
    viewDepartments,
    addDepartment
};

