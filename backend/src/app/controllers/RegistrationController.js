import Registration from '../models/Registration';
import { register, update } from '../services/saveRegistration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistrationController {
  async index(req, res) {
    const registration = await Registration.findAll({
      include: [{ model: Student, as: 'student' }, { model: Plan, as: 'plan' }],
    });

    return res.json(registration);
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
      return res.status(404).json({ error: 'registration not found' });
    }

    await registration.destroy();

    return res.json();
  }
}

export default new RegistrationController();