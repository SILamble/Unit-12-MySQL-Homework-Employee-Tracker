DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(100) NULL,
  PRIMARY KEY (department_id)
);

SELECT * FROM departments;

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(100) NULL,
  salary INT NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (role_id)
);

SELECT * FROM roles;

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (employee_id)
);

SELECT * FROM employees;