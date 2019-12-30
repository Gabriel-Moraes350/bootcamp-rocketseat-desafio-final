import { addMonths, parseISO } from 'date-fns';
import Plan from '../models/Plan';
import Registration from '../models/Registration';
import Queue from '../../lib/Queue';
import NewEnroll from '../jobs/NewRegistration';
import Student from '../models/Student';

async function calculateEnroll({ startDate, studentId, planId }) {
  const plan = await Plan.findByPk(planId);
  if (!plan) {
    throw new Error('Plan not found!');
  }

  // calculate the end date
  const endDate = addMonths(parseISO(startDate), plan.duration);
  const price = Number(plan.price) * plan.duration;

  return {
    studentId,
    planId,
    startDate,
    endDate,
    price,
  };
}

export const register = async ({ startDate, studentId, planId }) => {
  let registration = await calculateEnroll({ startDate, studentId, planId });

  registration = await Registration.create(registration);

  const student = await Student.findByPk(studentId);
  const plan = await registration.getPlan();

  const data = {
    student,
    plan,
    registration,
  };

  // send email to new student
  Queue.add(NewEnroll.key, data);

  return registration;
};

export const update = async ({ startDate, studentId, planId }, id) => {
  const registration = await calculateEnroll({ startDate, studentId, planId });

  const existentRegister = await Registration.findByPk(id);

  if (!existentRegister) {
    throw new Error('Matrícula não encontrada!');
  }

  return existentRegister.update(registration);
};
