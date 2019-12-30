import Student from '../models/Student';

export default async (req, res, next) => {
  const { studentId } = req.params;

  const findStudent = await Student.findByPk(studentId);
  if (!findStudent) {
    return res.status(404).json({ error: 'Estudante não encontrado!' });
  }

  return next();
};
