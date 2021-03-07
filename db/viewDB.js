// we will create our own orm wiht PROMISES
const connection = require('./database');

class viewsDB {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllDepartments() {
        return this.connection.promise().query(
            `SELECT id, name FROM departments;`, [], function (err, res) {
                if (err) throw err;
                return res;
            }
        )
    }

    viewAllRoles() {
        return this.connection.promise().query(
            `SELECT roles.*, departments.name 
            FROM roles 
            LEFT JOIN departments 
            ON department_id = departments.id;`,
            [],
            function (err, res) {
                if (err) throw err;
                return res;
            }
        )
    }

    viewAllEmployees() {
        const sql = `SELECT * 
                    FROM employees
                    LEFT JOIN roles 
                    ON role_id = roles.id
                    LEFT JOIN departments 
                    ON roles.department_id = departments.id;`;
        return this.connection.promise().query(
            sql, [], function (err, res) {
                if (err) throw err;
                return res;
            }
        )
    }
};
//exporting an INSTANCE of the DB
module.exports = new viewsDB(connection);