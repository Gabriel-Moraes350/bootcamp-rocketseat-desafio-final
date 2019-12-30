import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { studentId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const listCheckins = await Checkin.findAndCountAll({
      where: {
        studentId,
      },
      page,
      limit,
      offset: (page - 1) * limit,
      order: [['id', 'desc']],
    });

    return res.json(listCheckins);
  }

  async store(req, res) {
    const { studentId } = req.params;
    const weekAgoDate = subDays(new Date(), 7);

    const userCheckins = await Checkin.findAll({
      where: {
        studentId,
        createdAt: {
          [Op.gte]: weekAgoDate,
        },
      },
    });

    if (userCheckins.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Você excedeu o limite de 5 matrículas semanais!' });
    }

    return res.json(await Checkin.create({ studentId }));
  }
}

export default new CheckinController();
