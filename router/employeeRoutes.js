const express = require("express");
const {
  getAll,
  getByID,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employee.controller");
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getByID);
router.post("/create", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
module.exports = router;
