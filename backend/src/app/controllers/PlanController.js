import Plan from '../models/Plan';
import checkPlanTitleValidator from '../validators/checkPlanTitleValidator';
import { calculateLimitAndOffset, paginate } from '../services/pagination';

class PlanController {
  async index(req, res) {
    const { page } = req.query;

    if (!page) {
      return res.json(await Plan.findAll());
    }

    const { limit, offset } = calculateLimitAndOffset(page);

    const { rows, count } = await Plan.findAndCountAll({
      limit,
      offset,
    });

    const plans = paginate(page, count, rows, limit);

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
      return res.status(404).json({ error: 'Plano não encontrado!' });
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
      return res.status(404).json({ error: 'Plano não encontrado!' });
    }

    const registration = await plan.getRegistration();
    if (registration.length > 0) {
      return res.status(400).json({
        error:
          'Plano possui matrícula! Retire o vínculo com o plano das matrículas primeiro',
      });
    }

    await plan.destroy();

    return res.json();
  }
}

export default new PlanController();
