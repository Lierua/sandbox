import {
  getAllStudents,
  getStudentByID,
  createStudent,
  updateStudent,
  deleteStudentFromDB,
} from "../repositories/studentsRepository.js";

export const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();

    res.status(200).json(students);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await getStudentByID(req.params.id);

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const postStudent = async (req, res) => {
  const { student_name, house, starting_year } = req.body;

  try {
    const student = await createStudent(student_name, house, starting_year);

    res.status(201).json(student);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const putStudent = async (req, res) => {
  const id = req.params.id;
  const { student_name, house, starting_year } = req.body;

  try {
    const student = await updateStudent(id, student_name, house, starting_year);

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await deleteStudentFromDB(id);

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};
