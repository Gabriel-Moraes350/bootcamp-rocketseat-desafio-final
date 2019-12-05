import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class HelpOrderAnswer {
  get key() {
    return 'HelpOrderAnswer';
  }

  async handle({ data }) {
    const {
      student,
      helpOrder: { question, answer, answerAt },
    } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Pergunta respondida',
      template: 'help-order-answer',
      context: {
        name: student.name,
        question,
        answer,
        answerAt: format(parseISO(answerAt), 'dd/MM/yyyy'),
      },
    });
  }
}

export default new HelpOrderAnswer();
