import Sequelize, { Model } from 'sequelize';
import Plan from './Plan';
import Student from './Student';

class Enroll extends Model {
  static init(sequelize) {
    super.init(
      {
        startDate: Sequelize.DATE,
        studentId: Sequelize.INTEGER,
        planId: Sequelize.INTEGER,
        endDate: Sequelize.DATE,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate() {
    this.hasOne(Plan, { as: 'plans', foreignKey: 'plan_id' });
    this.hasOne(Student, { as: 'student', foreignKey: 'student_id' });
  }
}

export default Enroll;
