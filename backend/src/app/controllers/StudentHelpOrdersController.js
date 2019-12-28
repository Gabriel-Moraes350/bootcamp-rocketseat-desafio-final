import HelpOrder from '../models/HelpOrder';

class StudentHelpOrdersController {
  async index(req, res) {
    const { studentId } = req.params;
    const { page = 1, limit = 5 } = req.query;
    const helpOrders = await HelpOrder.findAndCountAll({
      where: {
        studentId,
      },
      limit,
      offset: (page - 1) * limit,
      order: [['id', 'desc']],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { studentId } = req.params;
    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      question,
      studentId,
    });

    return res.json(helpOrder);
  }
}

export default new StudentHelpOrdersController();
