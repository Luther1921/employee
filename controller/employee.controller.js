const connection = require("../config/db");
const util = require("util");
const { findAll, findById, create, update, deleteOne } = require("./constants");

const query = util.promisify(connection.query).bind(connection);

// getting all employee

const getAll = async (req, res) => {
  try {
    const getData = await query(findAll);

    if (!getData) {
      res.status(400).json({ error: "cannot get all employee" });
    } else {
      return res.status(200).json({ getData, message: "gotten successfully" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// getting employee by id

const getByID = async (req, res) => {
  // check if employee exist in the database
  // return employee
  try {
    const { id } = req.params;

    const getOne = await query(findById, [id]);
    if (getOne.length === 0) {
      return res
        .status(400)
        .json({ error: `cannot find the employee with the id ${id}` });
    } else {
      return res
        .status(200)
        .json({ data: getOne, message: "gotten successfully" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// adding employee
const addEmployee = async (req, res) => {
  // check if employee already exists in the database
  // save employee to database

  try {
    const payload = req.body;

    if (!payload) {
      return res.status(400).json({ error: "all fields are mandatory" });
    }

    const existingEmployee = await query(findById, [payload.employee_id]);
    if (existingEmployee.length > 0) {
      return res
        .status(400)
        .json({ error: "employee with the id already exists" });
    }

    const addData = await query(create, [
      payload.employee_id,
      payload.first_name,
      payload.last_name,
      payload.hourly_pay,
      payload.hire_date,
    ]);
    res.status(200).json({
      data: addData,
      message: "Employee added successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// updating employee

const updateEmployee = async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.params;

    // Check if the employee exists
    const employeeData = await query(findById, [id]);

    if (employeeData.length === 0) {
      res
        .status(400)
        .json({ error: `cannot find the employee with the ID ${id}` });
    }
    // Update the employee
    const updateData = await query(update, [
      payload.employee_id,
      payload.first_name,
      payload.last_name,
      payload.hourly_pay,
      payload.hire_date,
      id, // Use the existing ID for the WHERE clause
    ]);

    res.status(200).json({
      data: updateData,
      message: "Employee updated successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// deleting employee

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if employee exist in the database
    const employeeData = await query(findById, [id]);

    if (employeeData.length === 0) {
      res
        .status(400)
        .json({ error: `cannot find the employee with the ID ${id}` });
    }
    // delete the employee
    const deleteData = await query(deleteOne, [id]);
    res.status(200).json({ message: "employee deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAll,
  getByID,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
