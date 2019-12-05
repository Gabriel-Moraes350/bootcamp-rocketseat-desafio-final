import Enroll from '../models/Enroll';
import { newEnroll, updateEnroll } from '../services/saveEnrollment';

class EnrollController {
  async index(req, res) {
    const enrollment = await Enroll.findAll();

    return res.json(enrollment);
  }

  async store(req, res) {
    try {
      return res.json(await newEnroll(req.body));
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      return res.json(await updateEnroll(req.body, id));
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const enroll = await Enroll.findByPk(id);

    if (!enroll) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    await enroll.destroy();

    return res.json();
  }
}

export default new EnrollController();
