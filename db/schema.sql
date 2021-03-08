DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;


CREATE TABLE departments(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL UNSIGNED,
    department_id INTEGER,
    PRIMARY KEY (id),
    CONSTRAINT fk_deptid FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id),
    CONSTRAINT fk_roleid FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_managerid FOREIGN KEY (manager_id) REFERENCES employees(id)
);