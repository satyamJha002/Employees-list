const EmployeeModal = require("../models/employeesModel");

const createEmployee = async (req, res) => {
  try {
    const {
      f_Id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
      f_Createdate,
    } = req.body;

    if (
      !f_Id ||
      !f_Name ||
      !f_Email ||
      !f_Mobile ||
      !f_Designation ||
      !f_Gender ||
      !f_Course ||
      !f_Createdate
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill details!" });
    }
    // Create a new employee instance
    const newEmployee = new EmployeeModal({
      f_Id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
      f_Createdate,
    });

    // Save the employee to the database
    await newEmployee.save();

    // Send a success response
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModal.find();
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    await EmployeeModal.findOneAndUpdate(
      { _id: req.body.employeeId },
      req.body.payload
    );
    res.status(200).send("Edit SUccessfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await EmployeeModal.findOneAndDelete({ _id: req.body.employeeId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const searchEmployee = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    const employees = await EmployeeModal.find({
      $or: [
        { f_Name: { $regex: searchTerm, $options: "i" } },
        { f_Id: { $regex: searchTerm, $options: "i" } },
        { f_Email: { $regex: searchTerm, $options: "i" } },
        { f_Designation: { $regex: searchTerm, $options: "i" } },
      ],
    });

    if (!employees) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Error searching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
};
