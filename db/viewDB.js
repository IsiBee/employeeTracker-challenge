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
            }
        ).then(([rows, fields]) => {
            return rows;
        });
    }

    viewAllRoles() {
        const sql = `SELECT roles.id, roles.title, roles.salary, roles.department_id, departments.name
            FROM roles LEFT JOIN departments ON roles.department_id = departments.id`;
        return this.connection.promise().query(
            sql, [],
            function (err, res) {
                if (err) throw err;
            }
        ).then(([rows, fields]) => {
            return rows;
        });
    }

    viewAllEmployees() {
        const sql = `SELECT employees.id,
        employees.first_name,
        employees.last_name,
        employees.role_id,
        employees.manager_id,
        roles.title,
        departments.name 
        FROM employees
        LEFT JOIN roles 
        ON employees.role_id = roles.id
        LEFT JOIN departments 
        ON roles.department_id = departments.id;`;
        return this.connection.promise().query(
            sql, [], function (err, res) {
                if (err) throw err;
            }
        ).then(([rows, fields]) => {
            return rows;
        })
    }
};
//exporting an INSTANCE of the DB
module.exports = new viewsDB(connection);