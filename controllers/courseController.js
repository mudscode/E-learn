// Courses controller

const Course = require("../models/Course");
const Instructor = require("../models/Instructor");
const Learner = require("../models/Learner");

async function createCourse(req, res) {
  const instructor = req.user;

  const { title, description, price, materials } = req.body;

  try {
    const instructorExists = await Instructor.findById(instructor._id);

    if (!instructorExists) {
      return res.status(404).json({ message: "Instructor doesn't exist." });
    }

    const newCourse = new Course({
      title,
      description,
      instructor: instructor._id,
      price,
      materials,
    });

    const savedCourse = await newCourse.save();

    instructorExists.coursesTaught.push(savedCourse._id);
    await instructorExists.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getInstructorCourses(req, res) {
  try {
    const instructor = await Instructor.findById(req.user._id);

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found." });
    }

    const courses = await Course.find({ instructor: instructor._id });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCourseById(req, res) {
  const courseId = req.params.courseId;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  res.status(200).json(course);
}

async function deleteInstructorCourse(req, res) {
  const { courseId } = req.params;
  try {
    const instructor = await Instructor.findById(req.user._id);

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found." });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateInstructorCourse(req, res) {
  const { courseId } = req.params;
  const courseContent = req.body;
  try {
    const instructor = await Instructor.findById(req.user._id);

    if (!instructor) {
      return res.status(404).json({ messae: "Instructor not found." });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: courseContent },
      { new: true }
    );

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function enrollCourse(req, res) {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    const learner = await Learner.findById(req.user._id);

    if (!course || !learner) {
      return res.status(404).json({ message: "Course or Learner not found." });
    }

    if (!course.enrolledLearners.includes(learner._id)) {
      course.enrolledLearners.push(learner._id);
      learner.enrolledCourses.push(course._id);

      await course.save();
      await learner.save();

      res
        .status(200)
        .json({ message: "You enrolled in the course successfully." });
    } else {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function unEnrollLearner(req, res) {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    const learner = await Learner.findById(req.user._id);

    if (!course || !learner) {
      return res.status(404).json({ message: "Course or learner not found." });
    }

    if (course.enrolledLearners.includes(learner._id)) {
      course.enrolledLearners.pull(learner._id);
      learner.enrolledCourses.pull(course._id);

      await course.save();
      await learner.save();

      res
        .status(200)
        .json({ message: "You unenrolled in the course successfully." });
    } else {
      return res
        .status(404)
        .json({ message: "You are not enrolled in this course." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCourse,
  getCourseById,
  getInstructorCourses,
  deleteInstructorCourse,
  enrollCourse,
  unEnrollLearner,
  updateInstructorCourse,
};
