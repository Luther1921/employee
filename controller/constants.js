const findAll = "SELECT * FROM employees";
const findById = "SELECT * FROM employees WHERE employee_id = ?";
const create =
  "INSERT INTO employees (employee_id, first_name, last_name, hourly_pay, hire_date) VALUES (?,?,?,?,?)";
const update =
  "UPDATE employees SET employee_id= ?, first_name= ?, last_name= ?, hourly_pay= ?, hire_date= ? WHERE employee_id= ?";
const deleteOne = " DELETE FROM employees WHERE employee_id = ? ";

module.exports = { findAll, findById, create, update, deleteOne };
