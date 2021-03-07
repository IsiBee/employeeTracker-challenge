const connection = require('../db/database');

// Viewing all roles in the database
viewRoles = () => {
    console.log('Showing all roles...\n');
    const query = connection.query(
        'SELECT * FROM roles;',
        [],
        function (err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
    console.log(query);
};

// Adding a role to the Database
addRole = (roleTitle, roleSalary, roleDept) => {
    console.log(`Adding ${roleTitle} to the tracker...\n`);
    const params = [roleTitle, roleSalary, roleDept];
    const query = connection.query(
        'INSERT INTO roles (title, salary, department) VALUES (?,?,?);',
        params,
        function (err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
    console.log(query);
};

