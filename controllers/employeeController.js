const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  const task = await Employee.create(req.body);

  res.status(201).json(task);
};

exports.getEmployees = async (req, res) => {
  const emps = await Employee.find();

  res.json(emps);
};

exports.updateEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(
    req.params.id,

    req.body,

    { new: true }, //return updated document
  );

  res.json(emp);
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);

  res.json({
    message: "Employee Deleted Successfully",
  });
};
