const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../config/middlewares');
const Employee = require('../models/Employee');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new employee
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      name,
      designation,
      location,
      salary,
      dateOfJoining,
      email,
      phoneNumber,
      address,
    } = req.body;

    const newEmployee = new Employee({
      name,
      designation,
      location,
      salary,
      dateOfJoining,
      email,
      phoneNumber,
      address,
    });

    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an employee
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const {
      name,
      designation,
      location,
      salary,
      dateOfJoining,
      email,
      phoneNumber,
      address,
    } = req.body;
    const { id } = req.params;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        designation,
        location,
        salary,
        dateOfJoining,
        email,
        phoneNumber,
        address,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an employee
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
