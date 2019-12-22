import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class NewEnroll {
  get key() {
    return 'NewEnroll';
  }

  async handle({ data }) {
    const {
      student,
      plan: { title: planTitle, duration: planDuration },
      registration: { price, endDate },
    } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Seja bem-vindo a Gympoint',
      template: 'new-registration',
      context: {
        name: student.name,
        planTitle,
        planDuration,
        endDate: format(parseISO(endDate), 'dd/MM/yyyy'),
        price: parseFloat(price).toFixed(2),
      },
    });
  }
}

export default new NewEnroll();
