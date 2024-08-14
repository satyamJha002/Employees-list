const express = require("express");
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
} = require("../controllers/employeeControllers");

const router = express.Router();

router.route("/createEmployee").post(createEmployee);
router.route("/getEmployees").post(getEmployees);
router.route("/editEmployee").post(updateEmployee);
router.route("/deleteEmployee").post(deleteEmployee);
router.route("/search").get(searchEmployee);

module.exports = router;
