const connection = require('../db/database');

// Viewing all employees in the database
viewEmployees = () => {
    console.log('Showing all roles...\n');
    const sql = `SELECT * 
    FROM employees
    LEFT JOIN roles ON role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id;`
    const query = connection.query(
        sql,
        [],
        function (err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
    console.log(query);
};

// Adding an employee to the Database
addEmployee = (empFirstName, empLastName, empRole, empManager) => {
    console.log(`Adding ${empFirstName}${empLastName} to the tracker...\n`);
    const params = [empFirstName, empLastName, empRole, empManager];
    const query = connection.query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);',
        params,
        function (err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
    console.log(query);
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