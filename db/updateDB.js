const connection = require('./database');

class updateDB {
    constructor(connection) {
        this.connection = connection;
    }

    changeEmployee(emp, role) {
        const params = [emp, role];
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        return this.connection.promise().query(
            sql,
            params,
            function (err, res) {
                if (err) throw err;
            }
        )
            .then(([rows, fields]) => {
                return rows;
            });
    }
}

module.exports = new updateDB(connection);