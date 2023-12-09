// Learner controller

const Learner = require("../models/Learner");
const Course = require("../models/Course");
const userUtils = require("./utils/userUtils");

async function updateLearner(req, res) {
  return await userUtils.updateUser(Learner, req, res);
}

async function deleteLearner(req, res) {
  return await userUtils.deleteUser(Learner, req, res);
}

async function getLearner(req, res) {
  return await userUtils.getUser(Learner, req, res);
}

module.exports = {
  updateLearner,
  deleteLearner,
  getLearner,
};
