import { Op } from 'sequelize';
import Student from '../models/Student';
import checkEmailStudentValidator from '../validators/checkEmailStudentValidator';
import Checkin from '../models/Checkin';
import HelpOrder from '../models/HelpOrder';
import Registration from '../models/Registration';
import { calculateLimitAndOffset, paginate } from '../services/pagination';

class StudentController {
  async index(req, res) {
    const { q, page } = req.query;

    const where = {};
    if (q) {
      where.name = {
        [Op.iLike]: `%${q}%`,
      };
    }

    // in case of doesn't have a pagination page in request
    if (!page) {
      const students = await Student.findAll(where);
      return res.json(students);
    }

    const { limit, offset } = calculateLimitAndOffset(page);

    const { rows, count } = await Student.findAndCountAll({
      where,
      limit,
      offset,
    });

    const students = paginate(page, count, rows, limit);

    return res.json(students);
  }

  async view(req, res) {
    const { id } = req.params;

    const findStudent = await Student.findByPk(id);

    if (!findStudent) {
      return res.status(404).json({ error: 'Estudante não encontrado!' });
    }

    return res.json(id);
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
      return res.status(404).json({ error: 'Estudante não encontrado!' });
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
      return res.status(404).json({ error: 'Estudante não encontrado!' });
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
