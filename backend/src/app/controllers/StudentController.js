import { Op } from 'sequelize';
import Student from '../models/Student';
import checkEmailStudentValidator from '../validators/checkEmailStudentValidator';
import Checkin from '../models/Checkin';
import HelpOrder from '../models/HelpOrder';
import Registration from '../models/Registration';

class StudentController {
  async index(req, res) {
    const { q } = req.query;
    const where = {};
    if (q) {
      where.name = {
        [Op.like]: `%${q}%`,
      };
    }
    return res.json(await Student.findAll({ where }));
  }

  async store(req, res) {
    try {
      await checkEmailStudentValidator({ email: req.body.email });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }

    const student = await Student.create(req.body);

    return res.status(201).json(student);
  }

  async update(req, res) {
    const { id } = req.params;

    const findStudent = await Student.findByPk(id);

    if (!findStudent) {
      return res.status(404).json({ error: "Student doesn't exist!" });
    }

    // check if the user is changing its email, if it check for one in the database
    const { email } = req.body;
    if (findStudent.email !== email) {
      try {
        await checkEmailStudentValidator({ email });
      } catch (e) {
        return res.status(400).json({ error: e.toString() });
      }
    }

    return res.json(await findStudent.update(req.body));
  }

  async delete(req, res) {
    const { id } = req.params;

    const findStudent = await Student.findByPk(id);

    if (!findStudent) {
      return res.status(404).json({ error: "Student doesn't exist!" });
    }

    await Registration.destroy({
      where: { studentId: id },
    });

    await Checkin.destroy({ where: { studentId: id } });
    await HelpOrder.destroy({
      where: { studentId: id },
    });

    await findStudent.destroy();

    return res.json();
  }
}

export default new StudentController();
