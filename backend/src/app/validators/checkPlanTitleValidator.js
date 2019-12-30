import Plan from '../models/Plan';

export default async title => {
  const plan = await Plan.findOne({ where: { title } });

  if (plan) {
    throw new Error('Plano já em uso!');
  }
};
