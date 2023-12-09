// Instructor controller

const Instructor = require("../models/Instructor");
const userUtils = require("./utils/userUtils");
const Course = require("../models/Course");

async function updateInstructor(req, res) {
  return await userUtils.updateUser(Instructor, req, res);
}

async function deleteInstructor(req, res) {
  return await userUtils.deleteUser(Instructor, req, res);
}

async function getInstructor(req, res) {
  return await userUtils.getUser(Instructor, req, res);
}

module.exports = {
  updateInstructor,
  deleteInstructor,
  getInstructor,
};
