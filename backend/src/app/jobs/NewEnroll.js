import Mail from '../../lib/Mail';

class NewEnroll {
  get key() {
    return 'NewEnroll';
  }

  async handle({ data }) {
    const {
      student,
      plan: { title: planTitle, duration: planDuration },
      enroll: { price, endDate },
    } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Seja bem-vindo a Gympoint',
      template: 'new-enroll',
      context: {
        name: student.name,
        planTitle,
        planDuration,
        endDate,
        price,
      },
    });
  }
}

export default new NewEnroll();
