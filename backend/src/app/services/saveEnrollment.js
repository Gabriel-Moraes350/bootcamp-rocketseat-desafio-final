import { addMonths, parseISO } from 'date-fns';
import Plan from '../models/Plan';
import Enroll from '../models/Enroll';
import Queue from '../../lib/Queue';
import NewEnroll from '../jobs/NewEnroll';
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

export const newEnroll = async ({ startDate, studentId, planId }) => {
  let enroll = await calculateEnroll({ startDate, studentId, planId });

  enroll = await Enroll.create(enroll);

  const student = await Student.findByPk(studentId);
  const plan = await enroll.getPlan();

  const data = {
    student,
    plan,
    enroll,
  };

  // send email to new student
  Queue.add(NewEnroll.key, data);

  return enroll;
};

export const updateEnroll = async ({ startDate, studentId, planId }, id) => {
  const enroll = await calculateEnroll({ startDate, studentId, planId });

  const existentEnroll = await Enroll.findByPk(id);

  if (!existentEnroll) {
    throw new Error('Enroll not found!');
  }

  return existentEnroll.update(enroll);
};
