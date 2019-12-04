import Plan from '../models/Plan';
import checkPlanTitleService from '../validators/checkPlanTitleService';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const { title } = req.body;

    try {
      await checkPlanTitleService(title);
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }

    const plan = await Plan.create(req.body);

    return res.status(201).json(plan);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found!' });
    }

    if (plan.title !== title) {
      try {
        await checkPlanTitleService(title);
      } catch (e) {
        return res.status(400).json({ error: e.toString() });
      }
    }

    return res.json(await plan.update(req.body));
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found!' });
    }

    // TODO:: CHECK IF HAS ENROLLMENT AND DON'T ALLOW TO DELETE

    await plan.destroy();

    return res.json();
  }
}

export default new PlanController();
