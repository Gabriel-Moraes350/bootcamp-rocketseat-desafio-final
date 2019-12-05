/* eslint-disable import/no-cycle */
import Sequelize, { Model } from 'sequelize';
import Student from './Student';

class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {
        studentId: {
          type: Sequelize.INTEGER,
          references: {
            model: Student,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'checkins',
      }
    );

    return this;
  }

  static associate() {
    this.belongsTo(Student, {
      as: 'student',
      foreignKey: 'studentId',
    });
  }
}

export default Checkin;
