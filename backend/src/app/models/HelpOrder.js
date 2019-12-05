/* eslint-disable import/no-cycle */
import Sequelize, { Model } from 'sequelize';
import Student from './Student';

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.STRING,
        studentId: {
          type: Sequelize.INTEGER,
          references: {
            model: Student,
            key: 'id',
          },
        },
        answerAt: Sequelize.DATE,
        answer: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'help_orders',
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

export default HelpOrder;
