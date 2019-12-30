import Registration from '../models/Registration';
import { register, update } from '../services/saveRegistration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import { calculateLimitAndOffset, paginate } from '../services/pagination';

class RegistrationController {
  async index(req, res) {
    const { page } = req.query;

    const { limit, offset } = calculateLimitAndOffset(page);

    const { rows, count } = await Registration.findAndCountAll({
      include: [{ model: Student, as: 'student' }, { model: Plan, as: 'plan' }],
      limit,
      offset,
    });

    const registrations = paginate(page, count, rows, limit);

    return res.json(registrations);
  }

  async store(req, res) {
    try {
      return res.json(await register(req.body));
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      return res.json(await update(req.body, id));
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res.status(404).json({ error: 'Matrícula não encontrada' });
    }

    await registration.destroy();

    return res.json();
  }
}

export default new RegistrationController();
