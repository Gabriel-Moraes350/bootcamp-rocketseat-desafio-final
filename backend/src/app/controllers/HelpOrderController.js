import HelpOrder from '../models/HelpOrder';
import Queue from '../../lib/Queue';
import HelpOrderAnswer from '../jobs/HelpOrderAnswer';

class HelpOrderController {
  async index(req, res) {
    const itensWithNoAnswer = await HelpOrder.findAll({
      where: {
        answerAt: null,
      },
    });

    return res.json(itensWithNoAnswer);
  }

  async store(req, res) {
    const { id } = req.params;
    const { answer } = req.body;

    let helpOrder = await HelpOrder.findByPk(id);
    if (!helpOrder) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // update with answer
    helpOrder = await helpOrder.update({
      answer,
      answerAt: new Date(),
    });

    const student = await helpOrder.getStudent();
    const data = { student, helpOrder };
    // put another item on queue
    Queue.add(HelpOrderAnswer.key, data);

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();