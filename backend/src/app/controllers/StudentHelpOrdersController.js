import HelpOrder from '../models/HelpOrder';

class StudentHelpOrdersController {
  async index(req, res) {
    const { studentId } = req.params;
    const helpOrders = await HelpOrder.findAll({
      where: {
        studentId,
      },
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
