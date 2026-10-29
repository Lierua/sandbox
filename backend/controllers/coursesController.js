import {
  getAllCourses,
  getCourseByID,
  createCourse,
  updateCourse,
  deleteCourseFromDB,
} from "../repositories/coursesRepository.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await getAllCourses();

    res.status(200).json(courses);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await getCourseByID(req.params.id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const postCourse = async (req, res) => {
  const { course, teacher } = req.body;

  try {
    const courses = await createCourse(course, teacher);

    res.status(201).json(courses);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const putCourse = async (req, res) => {
  const id = req.params.id;
  const { course, teacher } = req.body;

  try {
    const courses = await updateCourse(id, course, teacher);

    if (!courses) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.status(200).json(courses);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const deleteCourse = async (req, res) => {
  const id = req.params.id;

  try {
    const courses = await deleteCourseFromDB(id);

    if (!courses) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};
