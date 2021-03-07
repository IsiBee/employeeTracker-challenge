INSERT INTO departments(name) 
VALUES('Sales'),('Engineering'),('Legal');

INSERT INTO roles(title, salary, department_id)
VALUES('Sales Lead',100000,1),('Salesperson',50000,1),
('Lead Engineer',150000,2),('FE Engineer',100000,2),('BE Engineer',120000,2),
('Legal Team Lead',150000,3),('Lawyer',100000,3);