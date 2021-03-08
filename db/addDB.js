const connection = require('./database');

class addDB {
    constructor(connection) {
        this.connection = connection;
    }

    createDepartment(depName) {
        const sql = `INSERT INTO departments (name) VALUES (?);`;
        return this.connection.promise().query(
            sql,
            [depName],
            function (err, res) {
                if (err) throw err;
                return res;
            }
        )
    }

    createRole(rtitle, rsalary, rDept) {
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);';
        return this.connection.promise().query(
            sql,
            [rtitle, rsalary, rDept],
            function (err, res) {
                if (err) throw err;
                return res;
            }
        )
    }

    createEmployee(fName, lName, r_id, m_id) {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
        VALUES (?,?,?,?);`;
        const params = [fName, lName, r_id, m_id];
        return this.connection.promise().query(
            sql, params, function (err, res) {
                if (err) throw err;
                return res;
            }
        )
    }
}

module.exports = new addDB(connection);