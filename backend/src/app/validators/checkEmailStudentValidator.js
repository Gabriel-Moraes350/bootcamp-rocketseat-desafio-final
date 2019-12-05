import Student from '../models/Student';

export default async ({ email }) => {
  const checkStudentEmail = await Student.findOne({ where: { email } });

  if (checkStudentEmail) {
    throw new Error('E-mail already in use!');
  }
};
