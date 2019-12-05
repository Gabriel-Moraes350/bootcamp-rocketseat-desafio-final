import Plan from '../models/Plan';
import checkPlanTitleValidator from '../validators/checkPlanTitleValidator';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const { title } = req.body;

    try {
      await checkPlanTitleValidator(title);
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
        await checkPlanTitleValidator(title);
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

    const enrollment = await plan.getEnroll();
    if (enrollment.length > 0) {
      return res.status(400).json({
        error:
          'Plan has enrollment! Delete the enrollment before delete the plan',
      });
    }

    await plan.destroy();

    return res.json();
  }
}

export default new PlanController();
