DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;


CREATE TABLE departments(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL UNSIGNED,
    department_id INTEGER UNSIGNED,
    CONSTRAINT fk_dept_id FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);