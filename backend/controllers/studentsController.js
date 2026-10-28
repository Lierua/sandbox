import {
  getAllStudents,
  getStudentByID,
  createStudent,
} from "../repositories/studentsRepository.js";

// GET /students
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

// GET /students/:id
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

// POST /students
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
