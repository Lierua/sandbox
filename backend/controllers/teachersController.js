import {
  getAllTeachers,
  getTeacherByID,
  createTeacher,
  updateTeacher,
  deleteTeacherFromDB,
} from "../repositories/teachersRepository.js";

export const getTeachers = async (req, res) => {
  try {
    const teachers = await getAllTeachers();

    res.status(200).json(teachers);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const teacher = await getTeacherByID(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        error: "Teacher not found",
      });
    }

    res.status(200).json(teacher);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const postTeacher = async (req, res) => {
  const { teacher_name, house, starting_year } = req.body;

  try {
    const teacher = await createTeacher(teacher_name, house, starting_year);

    res.status(201).json(teacher);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const putTeacher = async (req, res) => {
  const id = req.params.id;
  const { teacher_name, house, starting_year } = req.body;

  try {
    const teacher = await updateTeacher(id, teacher_name, house, starting_year);

    if (!teacher) {
      return res.status(404).json({
        error: "Teacher not found",
      });
    }

    res.status(200).json(teacher);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const deleteTeacher = async (req, res) => {
  const id = req.params.id;

  try {
    const teacher = await deleteTeacherFromDB(id);

    if (!teacher) {
      return res.status(404).json({
        error: "Teacher not found",
      });
    }

    res.status(200).json(teacher);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};
