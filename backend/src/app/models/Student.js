import Sequelize, { Model } from 'sequelize';
// eslint-disable-next-line import/no-cycle
import Enroll from './Enroll';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        weight: Sequelize.DECIMAL,
        height: Sequelize.DECIMAL,
        birthDate: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate() {
    this.hasMany(Enroll, {
      as: 'enrollment',
      foreignKey: 'studentId',
    });
  }
}

export default Student;
